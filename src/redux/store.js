import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
