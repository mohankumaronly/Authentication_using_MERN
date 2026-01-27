const QRCode = require("qrcode");

exports.createPaymentIntent = async (req, res) => {
  try {
    const UPI_ID = process.env.UPI_ID;
    const PAYEE_NAME = process.env.UPI_PAYEE_NAME;
    const CURRENCY = process.env.UPI_CURRENCY || "INR";

    const { paymentType, plan } = req.body;

    if (!["ONE_TIME", "TIME_BASED"].includes(paymentType)) {
      return res.status(400).json({ message: "Invalid payment type" });
    }

    let amount;
    let note;

    if (paymentType === "ONE_TIME") {
      amount = 5;
      note = "ONE_TIME_ACCESS";
    }

    if (paymentType === "TIME_BASED") {
      if (!["MONTHLY", "SIX_MONTH", "YEARLY"].includes(plan)) {
        return res.status(400).json({ message: "Invalid plan" });
      }

      const planAmountMap = {
        MONTHLY: 1,
        SIX_MONTH: 2,
        YEARLY: 30,
      };

      amount = planAmountMap[plan];
      note = `PLAN_${plan}`;
    }

    const upiString =
      `upi://pay?pa=${encodeURIComponent(UPI_ID)}` +
      `&pn=${encodeURIComponent(PAYEE_NAME)}` +
      `&am=${amount}` +
      `&cu=${CURRENCY}` +
      `&tn=${encodeURIComponent(note)}`;

    const qrCode = await QRCode.toDataURL(upiString);

    return res.status(200).json({
      paymentType,
      plan,
      amount,
      upiString, 
      qrCode,    
      message: "Scan QR to pay",
    });

  } catch (error) {
    console.error("Payment intent error:", error);
    return res.status(500).json({
      message: "Failed to create payment intent",
    });
  }
};
