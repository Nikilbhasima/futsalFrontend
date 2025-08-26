import React, { useState } from "react";
import { removeSeconds } from "../../uitls/TimeSlotGenerator";
import { useDispatch } from "react-redux";
import { initiatePayment } from "../../redux/onlinePayment/OnlinePaymentThunks";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Label } from "@mui/icons-material";
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
function MyBookingCard({
  data,
  handleOpen,
  setBookingId,
  index,
  numberOfSlot,
}) {
  console.log("booking data:", data);
  const dispatch = useDispatch();
  const [paymentModal, setPaymentModal] = useState(false);
  const showPaymentModal = () => setPaymentModal(true);
  const hidePaymentModal = () => setPaymentModal(false);
  const [formDatas, setFormData] = useState({
    productCode: "EPAYTEST",
    productName: "Futsal Booking",
    totalAmount:
      data?.futsalGroundDTO?.pricePerHour *
      numberOfSlot(
        removeSeconds(data?.starting_time),
        removeSeconds(data?.ending_time)
      ),
    taxAmount: "0",
    serviceCharge: "0",
    deliveryCharge: "0",
    customerEmail: data?.challengerDto?.email,
    customerPhone: data?.challengerDto?.phoneNumber,
  });

  const handlePaymentInitiation = async () => {
    try {
      const response = await dispatch(
        initiatePayment({ formData: formDatas, bookingId: data.id })
      );
      console.log("response for success", response.payload);
      if (response.payload.status && response.payload.formData) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = response.payload.paymentUrl;

        // Add all form fields
        Object.entries(response.payload.formData).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        alert("Payment initiation failed: " + response.payload.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        key={index}
        className="rounded-[10px] bg-[#333333] p-[24px] md:p-[32px] mt-[40px]"
      >
        <h1 className="text-[20px] text-[#27D483] font-semibold"></h1>
        <div className="grid md:grid-cols-[3.6fr_1.4fr]">
          <div className="grid  grid-cols-2 gap-[20px] py-[1rem]">
            <p className="text-[16px] font-semibold leading-4">
              Futsal Venue:
              <span className=" font-light ml-[5px]">
                {data?.futsalGroundDTO?.futsalDto?.futsalName}
              </span>
            </p>
            <p className="text-[16px] font-semibold leading-4">
              Location:
              <span className="font-light ml-[5px]">
                {data?.futsalGroundDTO?.futsalDto?.futsalAddress}
              </span>
            </p>
            <p className="text-[16px] font-semibold leading-4">
              Playing Date:
              <span className="font-light ml-[5px]">{data?.playing_date}</span>
            </p>

            <p className="text-[16px] font-semibold leading-4">
              Match Time:
              <span className="font-light ml-[5px]">
                {data?.starting_time}-{data?.ending_time}
              </span>
            </p>
            <p className="text-[16px] font-semibold leading-4">
              Ground Type:
              <span className="font-light ml-[5px]">
                {data?.futsalGroundDTO?.groundType}
              </span>
            </p>
            <p className="text-[16px] font-semibold leading-4">
              Total Price:
              <span className="font-light ml-[5px]">
                Rs
                {data?.futsalGroundDTO?.pricePerHour *
                  numberOfSlot(
                    removeSeconds(data?.starting_time),
                    removeSeconds(data?.ending_time)
                  )}
              </span>
            </p>
          </div>
          {data.status === "pending" && (
            <div className="flex items-center md:flex-col lg:flex-row gap-[32px] mt-[5px] md:justify-center">
              {data?.paymentStatus === "PAID" ? (
                <label>Paid</label>
              ) : (
                <button
                  onClick={showPaymentModal}
                  className="py-[12px] px-[32px] rounded-[10px] bg-[#27D483] text-[#333333] font-medium hover:bg-[#1c945c] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit text-nowrap"
                >
                  Pay Now
                </button>
              )}

              <button
                className="py-[12px] px-[32px] rounded-[10px] bg-[#E63946] text-[white] font-medium  hover:bg-[#CC0000] hover:-translate-y-[4px] ease-out duration-1000 w-fit h-fit"
                onClick={() => {
                  handleOpen(true);
                  setBookingId(data.id);
                }}
              >
                Cancel
              </button>
            </div>
          )}
          {data.status === "completed" && (
            <div className="bg-yellow flex justify-center items-center">
              <h3>Completed</h3>
            </div>
          )}
          {data.status === "cancelled" && (
            <div className="bg-yellow flex justify-center items-center">
              <h3 className="text-[#E63946]">Cancelled</h3>
            </div>
          )}
        </div>
      </div>
      <Modal open={paymentModal} onClose={hidePaymentModal}>
        <Box sx={{ ...style, display: "grid", gap: "1rem" }}>
          <h2>Make your payment Online</h2>
          <div className=" flex gap-[1rem]">
            <button
              className="bg-primary rounded-[10px] p-[8px] hover:-translate-y-1 duration-300 transition-all ease-in"
              onClick={handlePaymentInitiation}
            >
              Pay Vis Esewa
            </button>
            <button
              className="bg-quatary rounded-[10px] p-[8px] hover:-translate-y-1 duration-300 transition-all ease-in"
              onClick={hidePaymentModal}
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default MyBookingCard;
