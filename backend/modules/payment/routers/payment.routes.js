const express = require('express');
const protect = require('../../../middlewares/token.verification');
const { createPaymentIntent } = require('../controllers/paymentIntent.controller');
const { submitPaymentUTR } = require('../controllers/paymentVerification.controller');
const { approvePayment, rejectPayment, listPayments } = require('../controllers/adminPayment.controller');
const isAdmin = require('../middleware/admin.middleware');

const paymentRouter = express.Router();

paymentRouter.post(
  "/intent",
  protect,
  createPaymentIntent
);

paymentRouter.post(
  "/verify",
  protect,
  submitPaymentUTR
);

paymentRouter.post(
  "/admin/payments/:paymentId/approve",
  protect,
  isAdmin,
  approvePayment
);

paymentRouter.post(
  "/admin/payments/:paymentId/reject",
  protect,
  isAdmin,
  rejectPayment
);
paymentRouter.get(
  "/admin/payments",
  protect,
  isAdmin,
  listPayments
);

module.exports = paymentRouter;
