import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import futsalReducer from "./futsalSlice/futsalSlice";
import bookReducer from "./bookingSlice/bookingSlice";
import accountReducer from "./accountManagement/AccountManagementSlice";
import passwordReducer from "./passwordReset/PasswordResetSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    futsal: futsalReducer,
    book: bookReducer,
    account: accountReducer,
    reset: passwordReducer,
  },
});
