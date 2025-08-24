import { MdDateRange } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { MdOutlineSports } from "react-icons/md";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updatePhysicalPayment } from "../../redux/bookingSlice/BookingThunks";
const label = { inputProps: { "aria-label": "Switch demo" } };
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

function BookingDetail({ data }) {
  console.log(data);
  const dispatach = useDispatch();
  const [messageModal, setMessageModal] = useState(false);
  const viewMessageModal = () => setMessageModal(true);
  const hideMessageModal = () => setMessageModal(false);
  const [toggleButton, setToggleButton] = useState(false);
  const moveToggleButton = () => setToggleButton(true);
  const backToggleButton = () => setToggleButton(false);
  const handlePayment = () => {
    viewMessageModal();
  };

  const handlePhysicalPayment = async () => {
    try {
      const response = await dispatach(updatePhysicalPayment(data.id));
      console.log("check response:", response);
      if (response.meta.requestStatus === "fulfilled") {
        moveToggleButton();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.paymentStatus === "PAID") {
      moveToggleButton();
    } else {
      backToggleButton();
    }
  }, [data?.paymentStatus]);
  return (
    <>
      <div className="grid grid-row-3 gap-[1rem] md:grid md:grid-cols-[1fr_11fr] lg:grid lg:grid-cols-[1fr_10fr_1fr]   bg-tertary p-[8px] lg:py-[24px] lg:px-[32px] rounded-[10px] mt-[32px] ">
        <img
          src={data?.challengerDto?.image || "/images/profile.png"}
          alt="user photo"
          className="w-[40px] sm:w-[50px] md:w-[77px] md:h-[77px]  rounded-[50%] sm:p-[4px] object-cover"
        />
        <div className="grid w-full">
          <div className="flex justify-between">
            <div>
              <h2 className="text-[18px]">{data?.challengerDto?.username}</h2>
            </div>
            <div className="flex items-center">
              <div className="flex gap-[10px]">
                <label>Payment:</label>
                <span className="opacity-50">{data?.matchPaymentType}</span>
              </div>

              <span>
                <Switch
                  {...label}
                  onClick={handlePayment}
                  checked={toggleButton}
                />
              </span>
            </div>
          </div>
          <ul className="flex items-center justify-between text-[12px] sm:text-[12px] md:text-[16px] lg:text-[18px] w-full ">
            <li className="flex gap-[8px] items-center">
              <MdDateRange />
              <span>{data?.playing_date}</span>
            </li>
            <li className="flex gap-[8px] items-center">
              <MdAccessTime />
              <span>
                {data?.starting_time}-{data?.ending_time}
              </span>
            </li>
            <li className="flex gap-[8px] items-center">
              <MdOutlinePhone />
              <span>{data?.challengerDto?.phoneNumber}</span>
            </li>

            <li>
              <span>{data?.paymentStatus}</span>
            </li>
          </ul>
        </div>

        <div>
          <div className="flex gap-[8px] items-center bg-primary p-[12px] rounded-full w-fit">
            <IoCheckmarkDoneOutline />
            <span>{data?.status}</span>
          </div>
        </div>
      </div>
      <Modal open={messageModal} onClose={hideMessageModal}>
        <Box sx={{ ...style, display: "grid", gap: "1rem" }}>
          <h2 className="text-[24px] font-medium">Update Payment Status</h2>
          <p className="text-[14px] font-normal opacity-50">
            Are you sure you want to mark this booking as unpaid?
          </p>
          <div className="flex gap-[1rem]">
            <button
              onClick={handlePhysicalPayment}
              className=" p-[12px] rounded-[10px] bg-primary hover:-translate-y-1 transition-all duration-300 ease-in"
            >
              Confirm
            </button>
            <button
              onClick={hideMessageModal}
              className=" p-[12px] rounded-[10px] bg-quatary hover:-translate-y-1 transition-all duration-300 ease-in"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default BookingDetail;
