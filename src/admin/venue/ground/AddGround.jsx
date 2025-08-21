import { useFormik } from "formik";
import * as Yup from "yup";
import TextFieldComponent from "../../../ReusedComponent/TextFieldComponent";
import { useState } from "react";
import { uploadToCloudnary } from "../../../uitls/uploadToCoudinary";
import { useDispatch } from "react-redux";
import { addGround } from "../../../redux/ground/GroundThunks";
const validationSchema = Yup.object().shape({
  groundType: Yup.string().required("Futsal type required"),
  pricePerHour: Yup.string().required("Price per hour required"),
});
function AddGround() {
  const [image, setImage] = useState();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      groundType: "",
      pricePerHour: "",
      image: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await dispatch(addGround(values));
      if (response.meta.requestStatus === "fulfilled") {
        resetForm();
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

          <button
            type="submit"
            className="bg-primary py-[12px] px-[32px] rounded-[10px] w-fit hover:-translate-y-[5px] transition-all duration-300 ease-in"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGround;
