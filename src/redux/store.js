import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import futsalReducer from "./futsalSlice/futsalSlice";
import bookReducer from "./bookingSlice/bookingSlice";
import accountReducer from "./accountManagement/accountManagementSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    futsal: futsalReducer,
    book: bookReducer,
    account: accountReducer,
  },
});
