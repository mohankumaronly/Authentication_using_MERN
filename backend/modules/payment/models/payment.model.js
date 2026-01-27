const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        paymentType: {
            type: String,
            enum: ["ONE_TIME", "TIME_BASED"],
            required: true,
        },

        plan: {
            type: String,
            enum: ["MONTHLY", "SIX_MONTH", "YEARLY", null],
            default: null,
        },

        amount: {
            type: Number,
            required: true,
        },

        utr: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["PENDING", "VERIFIED", "REJECTED"],
            default: "PENDING",
        },

        verifiedAt: {
            type: Date,
        },

        verifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
