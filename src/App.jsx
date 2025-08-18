import { use, useEffect, useState } from "react";
import "./App.css";
import HomeNavbar from "./user/home/HomeNavbar";
import LoadingPacmandDesign from "./loader/LoadingPacmandDesign";
import { useDispatch, useSelector } from "react-redux";
import { extractToken } from "./uitls/ExtractRoleFromJwt";
import { setJwt, setSuccess } from "./redux/authSlice/AuthSlice";
import { getUserDetail } from "./redux/accountManagement/AccountManagementThunks";

function App() {
  const [role, setRole] = useState([]);
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);
  const { resetLoading } = useSelector((state) => state.account);
  console.log("status of reset loading:", resetLoading);
  console.log("statu of login :", loading);

  const jwtFromLocal = localStorage.getItem("JWT_TOKEN");

  useEffect(() => {
    if (jwtFromLocal) {
      const extractedData = extractToken(jwtFromLocal);
      setRole(extractedData?.roles || []);
      dispatch(setSuccess());
      dispatch(setJwt());
      dispatch(getUserDetail());
    } else {
      setRole([]);
    }
  }, [jwt]);

  return (
    <div className="relative">
      {!role || (role.length === 0 && <HomeNavbar />)}
      {Array.isArray(role) && role.includes("ROLE_USER") && <HomeNavbar />}
      {Array.isArray(role) && role.includes("ROLE_owner") && <HomeNavbar />}
      <LoadingPacmandDesign onLoader={loading} resetLoading={resetLoading} />
    </div>
  );
}

export default App;
