import { useFormik } from "formik";
import * as Yup from "yup";
import TextFieldComponent from "../../../ReusedComponent/TextFieldComponent";
import { useEffect, useState } from "react";
import { uploadToCloudnary } from "../../../uitls/uploadToCoudinary";
import { useDispatch, useSelector } from "react-redux";
import {
  addGround,
  editGroundDetail,
} from "../../../redux/ground/GroundThunks";
import { Box, Modal } from "@mui/material";
import { clearGroundDetail } from "../../../redux/ground/GroundSlice";
const validationSchema = Yup.object().shape({
  groundType: Yup.string().required("Futsal type required"),
  pricePerHour: Yup.string().required("Price per hour required"),
});
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
  color: "#27D483",
};
function AddGround({ setGroundList }) {
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [backendCallMessage, setBackendCallMessage] = useState("");
  const { groundDetail } = useSelector((state) => state.ground);
  const formik = useFormik({
    initialValues: {
      id: groundDetail?.id || null,
      groundType: groundDetail?.groundType || "",
      pricePerHour: groundDetail?.pricePerHour || "",
      image: groundDetail?.image || "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("ground values:", values);
      let response;
      if (!groundDetail) {
        console.log("add");
        response = await dispatch(addGround(values));
      } else {
        console.log("edit");
        response = await dispatch(editGroundDetail(values));
      }
      console.log("response Second:", response);
      if (response.meta.requestStatus === "fulfilled") {
        setGroundList((pre) =>
          pre.filter((data) => data?.id != groundDetail?.id)
        );
        setGroundList((pre) => [...pre, response.payload]);
        setImage(null);
        resetForm();
        setBackendCallMessage("Ground Successfully added!");
        handleOpenModal();
        dispatch(clearGroundDetail());
      } else {
        setBackendCallMessage("Fail to add ground");
        handleOpenModal();
      }
    },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedFile = await uploadToCloudnary(file);
      setImage(file);
      formik.setFieldValue("image", uploadedFile);
    }
  };
  // dispatch(clearGroundDetail());
  return (
    <div className="mt-[28px]  max-w-[60%]">
      <div className="bg-tertary p-[24px] rounded-[10px]">
        <h2>Enter your futsal details and image</h2>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-[2rem] mt-[1rem]"
        >
          <div className="flex gap-[32px]">
            <TextFieldComponent
              id="groundType"
              label="Ground Type"
              name="groundType"
              error={
                formik.touched.groundType && Boolean(formik.errors.groundType)
              }
              helperText={formik.touched.groundType && formik.errors.groundType}
              value={formik.values.groundType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextFieldComponent
              id="pricePerHour"
              label="Price Per hour"
              name="pricePerHour"
              error={
                formik.touched.pricePerHour &&
                Boolean(formik.errors.pricePerHour)
              }
              helperText={
                formik.touched.pricePerHour && formik.errors.pricePerHour
              }
              value={formik.values.pricePerHour}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="relative">
            <img
              src={
                image ? URL.createObjectURL(image) : "/images/uploadImage.png"
              }
              alt="upload image"
              className="w-[100%] max-h-[300px] object-cover"
            />
            <input
              type="file"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              name="image"
              onChange={handleImageUpload}
            />
          </div>
          {!groundDetail ? (
            <button
              type="submit"
              className="bg-primary py-[12px] px-[32px] rounded-[10px] w-fit hover:-translate-y-[5px] transition-all duration-300 ease-in"
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primary py-[12px] px-[32px] rounded-[10px] w-fit hover:-translate-y-[5px] transition-all duration-300 ease-in"
            >
              Update
            </button>
          )}
        </form>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>{backendCallMessage}</Box>
      </Modal>
    </div>
  );
}

export default AddGround;
