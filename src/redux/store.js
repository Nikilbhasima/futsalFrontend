import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import futsalReducer from "./futsalSlice/futsalSlice";
import bookReducer from "./bookingSlice/bookingSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    futsal: futsalReducer,
    book: bookReducer,
  },
});
