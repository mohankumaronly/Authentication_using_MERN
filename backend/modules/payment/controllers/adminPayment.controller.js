const User = require("../../auth/models/auth.model");
const Payment = require("../models/payment.model");

exports.approvePayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const adminId = req.user.userId;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status !== "PENDING") {
      return res.status(400).json({ message: "Payment already processed" });
    }

    const user = await User.findById(payment.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();

    if (payment.paymentType === "ONE_TIME") {
      user.access = {
        type: "LIFETIME",
        startDate: now,
        endDate: null,
        isActive: true,
      };
    } else if (payment.paymentType === "TIME_BASED") {
      const planDaysMap = {
        MONTHLY: 30,
        SIX_MONTH: 180,
        YEARLY: 365,
      };

      const days = planDaysMap[payment.plan];
      if (!days) {
        return res.status(400).json({ message: "Invalid plan" });
      }

      const endDate = new Date(now);
      endDate.setDate(endDate.getDate() + days);

      user.access = {
        type: "TIME_BASED",
        startDate: now,
        endDate,
        isActive: true,
      };
    } else {
      return res.status(400).json({ message: "Invalid payment type" });
    }

    user.lastPaymentAt = now;
    await user.save();

    payment.status = "VERIFIED";
    payment.verifiedAt = now;
    payment.verifiedBy = adminId;
    await payment.save();

    return res.status(200).json({
      message: "Payment approved and access granted",
    });
  } catch (error) {
    console.error("approvePayment error:", error);
    return res.status(500).json({ message: "Failed to approve payment" });
  }
};

exports.rejectPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const adminId = req.user.userId;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.status !== "PENDING") {
      return res.status(400).json({ message: "Payment already processed" });
    }

    payment.status = "REJECTED";
    payment.verifiedAt = new Date();
    payment.verifiedBy = adminId;
    await payment.save();

    return res.status(200).json({
      message: "Payment rejected",
    });
  } catch (error) {
    console.error("rejectPayment error:", error);
    return res.status(500).json({ message: "Failed to reject payment" });
  }
};

exports.listPayments = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const payments = await Payment.find(filter)
      .populate("userId", "email firstName lastName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: payments.length,
      payments,
    });
  } catch (error) {
    console.error("listPayments error:", error);
    return res.status(500).json({
      message: "Failed to fetch payments",
    });
  }
};
