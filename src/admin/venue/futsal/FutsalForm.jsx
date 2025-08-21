import { useFormik } from "formik";
import * as Yup from "yup";
import TextFieldComponent from "../../../ReusedComponent/TextFieldComponent";
import { useState } from "react";
import { uploadToCloudnary } from "../../../uitls/uploadToCoudinary";
import { useDispatch } from "react-redux";
import { createFutsal } from "../../../redux/createFutsal/CreateFutsalThunks";

const validationSchema = Yup.object().shape({
  futsalName: Yup.string()
    .max(25, "Maximum 25 characters allowed")
    .required("Futsal name is required"),
  futsalAddress: Yup.string().required("Address is required"),
  futsalOpeningHours: Yup.string().required("Futsal Starting time required"),
  futsalClosingHours: Yup.string().required("Futsal closing time required"),
});

function FutsalForm({ setFutsalDetail, futsalData }) {
  const [selectImage, setSelectImage] = useState(null);
  const dispatch = useDispatch();
  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadedFile = await uploadToCloudnary(file);
      setSelectImage(file);
      formik.setFieldValue("futsalLogo", uploadedFile);
    }
  };

  const formik = useFormik({
    initialValues: {
      futsalName: futsalData?.futsalName,
      futsalAddress: futsalData?.futsalAddress,
      description: futsalData?.description,
      futsalOpeningHours: futsalData?.futsalOpeningHours,
      futsalClosingHours: futsalData?.futsalClosingHours,
      futsalLogo: futsalData?.futsalLogo,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("form data:", values);
      const response = await dispatch(createFutsal(values));
      console.log("is futsal created:", response);
      if (response?.meta?.requestStatus === "fulfilled") {
        setFutsalDetail(response.payload);
        resetForm();
      }

      setSelectImage(null);
    },
  });

  return (
    <div className="grid grid-cols-[55%_45%] gap-[32px] mt-[28px]">
      <div className="bg-tertary rounded-[10px] p-[24px] flex flex-col gap-[10px]">
        <label>Enter your futsal details</label>
        <form onSubmit={formik.handleSubmit} className="grid gap-[24px]">
          <div className="flex gap-[32px]">
            <TextFieldComponent
              id="futsalName"
              label="Futsal Name"
              name="futsalName"
              error={
                formik.touched.futsalName && Boolean(formik.errors.futsalName)
              }
              helperText={formik.touched.futsalName && formik.errors.futsalName}
              value={formik.values.futsalName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <TextFieldComponent
              id="Address"
              label="Address"
              name="futsalAddress"
              error={
                formik.touched.futsalAddress &&
                Boolean(formik.errors.futsalAddress)
              }
              helperText={
                formik.touched.futsalAddress && formik.errors.futsalAddress
              }
              value={formik.values.futsalAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="flex gap-[32px]">
            <TextFieldComponent
              id="starting"
              label="Starting Time"
              name="futsalOpeningHours"
              error={
                formik.touched.futsalOpeningHours &&
                Boolean(formik.errors.futsalOpeningHours)
              }
              helperText={
                formik.touched.futsalOpeningHours &&
                formik.errors.futsalOpeningHours
              }
              value={formik.values.futsalOpeningHours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="time"
            />

            <TextFieldComponent
              id="closing"
              label="Closing Time"
              name="futsalClosingHours"
              error={
                formik.touched.futsalClosingHours &&
                Boolean(formik.errors.futsalClosingHours)
              }
              helperText={
                formik.touched.futsalClosingHours &&
                formik.errors.futsalClosingHours
              }
              value={formik.values.futsalClosingHours}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="time"
            />
          </div>

          <div className="flex gap-[32px]">
            <TextFieldComponent
              id="description"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <button
            type="submit"
            className="bg-primary py-[12px] px-[32px] rounded-[10px] w-fit hover:-translate-y-[10px] transition-all duration-300 ease-in"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="flex flex-col justify-center items-center bg-tertary rounded-[10px]">
        <div className="relative">
          <img
            src={
              selectImage
                ? URL.createObjectURL(selectImage)
                : futsalData?.futsalLogo
                ? futsalData?.futsalLogo
                : "/images/uploadImage.png"
            }
            alt="logo image"
            className="rounded-[10px] w-[25rem] h-[15rem] object-cover object-center"
          />
          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            name="image"
            onChange={handleChangeImage}
          />
        </div>
        <label className="mt-[24px]">
          Click on Above Image to upload or change logo
        </label>
      </div>
    </div>
  );
}

export default FutsalForm;
