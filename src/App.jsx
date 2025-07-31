import { use } from "react";
import "./App.css";
import HomeNavbar from "./user/home/HomeNavbar";
import LoadingPacmandDesign from "./loader/LoadingPacmandDesign";
import { useSelector } from "react-redux";

function App() {
  const { success } = useSelector((state) => state.auth);
  return (
    <div className="relative">
      <HomeNavbar />
      <LoadingPacmandDesign onLoader={false} />
    </div>
  );
}

export default App;
