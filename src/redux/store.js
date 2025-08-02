import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import futsalReducer from "./futsalSlice/futsalSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    futsal: futsalReducer,
  },
});
