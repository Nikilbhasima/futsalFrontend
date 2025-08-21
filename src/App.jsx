import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { extractToken } from "./uitls/ExtractRoleFromJwt";
import { setJwt, setSuccess } from "./redux/authSlice/AuthSlice";
import { getUserDetail } from "./redux/accountManagement/AccountManagementThunks";
import AdminPage from "./admin/AdminPage";
import HomeNavbar from "./user/home/HomeNavbar";
import LoadingPacmandDesign from "./loader/LoadingPacmandDesign";
function App() {
  const [role, setRole] = useState([]);
  const dispatch = useDispatch();
  const { jwt } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.auth);

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
      {Array.isArray(role) && role.includes("ROLE_OWNER") && <AdminPage />}
      {Array.isArray(role) && role.includes("ROLE_USER") && <HomeNavbar />}
      <LoadingPacmandDesign onLoader={loading} />
    </div>
  );
}

export default App;
