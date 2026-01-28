import { useEffect, useState } from "react";
import {
  getAllPayments,
  approvePayment,
  rejectPayment,
} from "../../services/auth.service";
import HomePageLayout from "../../layouts/HomepageLayout";
import Button from "../../common/Button";

const formatDateTime = (date) => {
  if (!date) return "—";
  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const AdminPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchPayments = async (status = "") => {
    try {
      setLoading(true);
      const res = await getAllPayments(status);
      setPayments(res.data.payments || []);
    } catch (error) {
      console.error("Failed to fetch payments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleApprove = async (paymentId) => {
    try {
      setActionLoading(paymentId);
      await approvePayment(paymentId);
      fetchPayments(statusFilter);
    } catch {
      alert("Failed to approve payment");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (paymentId) => {
    if (!window.confirm("Reject this payment?")) return;

    try {
      setActionLoading(paymentId);
      await rejectPayment(paymentId);
      fetchPayments(statusFilter);
    } catch {
      alert("Failed to reject payment");
    } finally {
      setActionLoading(null);
    }
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatusFilter(value);
    fetchPayments(value);
  };

  return (
    <HomePageLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Payment Dashboard</h1>

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border px-3 py-2 rounded"
        >
          <option value="">All</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Plan</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Requested At</th>
              <th className="p-2 text-left">Verified At</th>
              <th className="p-2 text-left">UTR</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">
                  {p.userId?.email || "User deleted"}
                </td>

                <td className="p-2">₹{p.amount}</td>

                <td className="p-2">{p.paymentType}</td>

                <td className="p-2">{p.plan || "—"}</td>

                <td className="p-2 font-semibold">
                  {p.status}
                </td>

                {/* Requested time */}
                <td className="p-2">
                  {formatDateTime(p.createdAt)}
                </td>

                {/* Admin action time */}
                <td className="p-2">
                  {formatDateTime(p.verifiedAt)}
                </td>

                <td className="p-2">{p.utr}</td>

                <td className="p-2 space-x-2">
                  {p.status === "PENDING" ? (
                    <>
                      <Button
                        text={
                          actionLoading === p._id
                            ? "Approving..."
                            : "Approve"
                        }
                        onClick={() => handleApprove(p._id)}
                        disabled={actionLoading === p._id}
                      />

                      <Button
                        text={
                          actionLoading === p._id
                            ? "Rejecting..."
                            : "Reject"
                        }
                        onClick={() => handleReject(p._id)}
                        disabled={actionLoading === p._id}
                      />
                    </>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </HomePageLayout>
  );
};

export default AdminPaymentsPage;