import React from "react";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";

function LoadingPacmandDesign() {
  const { loadingUserData } = useSelector((state) => state.account);
  const { loadingBooking } = useSelector((state) => state.book);
  const { futsalLoading } = useSelector((state) => state.futsal);
  const { groundLoading } = useSelector((state) => state.ground);
  const { loading } = useSelector((state) => state.auth);
  const showLoader =
    loading ||
    groundLoading ||
    futsalLoading ||
    loadingBooking ||
    loadingUserData;
  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[black] opacity-50">
          <PacmanLoader color="#27D483" />
        </div>
      )}
    </>
  );
}

export default LoadingPacmandDesign;
