import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { verifyPayment } from "../../redux/onlinePayment/OnlinePaymentThunks";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "#333333",
  border: "2px solid #000",
  p: "24px",
  borderRadius: "10px",
};

const PaymentSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [verificationStatus, setVerificationStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    verifyPayments();
  }, [location]);

  const verifyPayments = async () => {
    try {
      const params = new URLSearchParams(location.search);

      let transactionUuid = params.get("transaction_uuid");

      // Handle Base64 encoded data
      if (params.get("data")) {
        try {
          const decodedData = JSON.parse(atob(params.get("data")));
          console.log("Decoded eSewa response:", decodedData);
          transactionUuid = decodedData.transaction_uuid;
        } catch (e) {
          console.error("Failed to decode Base64 data:", e);
        }
      }

      if (!transactionUuid) {
        setVerificationStatus("failed");
        setMessage("Invalid payment parameters");
        return;
      }

      const response = await dispatch(verifyPayment(transactionUuid));

      // Fix: Check the correct response structure
      if (
        response.meta?.requestStatus === "fulfilled" &&
        response.payload?.status === "SUCCESS"
      ) {
        setVerificationStatus("success");
        setMessage("Payment verified successfully!");
      } else {
        setVerificationStatus("failed");
        setMessage(response.payload?.message || "Payment verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("failed");
      setMessage("Payment verification failed due to error");
    }
  };
  return (
    <div className="payment-result">
      {verificationStatus === "verifying" && (
        <Modal open={true}>
          <Box sx={style}>
            <h2>Verifying Payment...</h2>
            <p>Please wait while we verify your payment.</p>
          </Box>
        </Modal>
      )}

      {verificationStatus === "success" && (
        <Modal open={true}>
          <Box sx={{ ...style, display: "grid", gap: "1rem" }}>
            <div>
              <h2 className="text-[1.8rem] font-[600] text-[#4ade80] mb-[12px]">
                Payment Successful!
              </h2>
              <p className="text-[1rem] mb-[20px] text-white/85]">{message}</p>
            </div>

            <button
              className="p-[8px] rounded-[10px] bg-primary w-fit hover:-translate-y-1 duration-300 transition-all ease-in"
              onClick={() => navigate("/bookings")}
            >
              Return to Home
            </button>
          </Box>
        </Modal>
      )}

      {verificationStatus === "failed" && (
        <Modal open={true}>
          <Box sx={{ ...style, display: "grid", gap: "1rem" }}>
            <h2 className="text-[1.8rem] font-[600] text-[#4ade80] mb-[12px]">
              Payment Failed
            </h2>
            <p>{message}</p>
            <button
              className="p-[8px] rounded-[10px] bg-primary w-fit hover:-translate-y-1 duration-300 transition-all ease-in"
              onClick={() => navigate("/bookings")}
            >
              Try Again
            </button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default PaymentSuccess;
