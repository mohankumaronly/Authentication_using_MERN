import { useEffect, useState } from "react";
import { getAllPayments } from "../../services/auth.service";
import HomePageLayout from "../../layouts/HomepageLayout";

const AdminPaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await getAllPayments();
        setPayments(res.data.payments);
      } catch (error) {
        console.error("Failed to fetch payments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments...</p>;

  return (
    <HomePageLayout>
      <h1 className="text-2xl font-bold mb-4">Admin Payment Dashboard</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Email</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>UTR</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td>{p.userId.email}</td>
              <td>₹{p.amount}</td>
              <td>{p.paymentType}</td>
              <td>{p.status}</td>
              <td>{p.utr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </HomePageLayout>
  );
};

export default AdminPaymentsPage;
