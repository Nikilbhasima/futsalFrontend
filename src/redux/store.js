import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/authSlice";
import futsalReducer from "./futsalSlice/futsalSlice";
import bookReducer from "./bookingSlice/bookingSlice";
import accountReducer from "./accountManagement/AccountManagementSlice";
import passwordReducer from "./passwordReset/PasswordResetSlice";
import createFutsalReducer from "./createFutsal/CreateFutsalSlice";
import groundReducer from "./ground/GroundSlice";
import graphReducer from "./graphData/GraphDataSlice";
export default configureStore({
  reducer: {
    auth: authReducer,
    futsal: futsalReducer,
    book: bookReducer,
    account: accountReducer,
    reset: passwordReducer,
    createFutsal: createFutsalReducer,
    ground: groundReducer,
    graph: graphReducer,
  },
});
