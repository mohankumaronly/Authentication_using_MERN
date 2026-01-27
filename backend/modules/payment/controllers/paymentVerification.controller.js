const Payment = require("../models/payment.model");

exports.submitPaymentUTR = async (req, res) => {
    try {
        const { utr, paymentType, plan, amount } = req.body;

        if (!utr) {
            return res.status(400).json({ message: "UTR is required" });
        }

        if (!["ONE_TIME", "TIME_BASED"].includes(paymentType)) {
            return res.status(400).json({ message: "Invalid payment type" });
        }
        
        const existing = await Payment.findOne({ utr });
        if (existing) {
            return res.status(409).json({ message: "UTR already used" });
        }

        const payment = await Payment.create({
            userId: req.user.userId,   
            paymentType,
            plan: plan || null,
            amount,
            utr,
            status: "PENDING",
        });

        return res.status(201).json({
            message: "Payment submitted. Awaiting admin verification.",
            paymentId: payment._id,
        });

    } catch (error) {
        console.error("submitPaymentUTR error:", error);
        return res.status(500).json({
            message: "Failed to submit payment",
        });
    }
};
