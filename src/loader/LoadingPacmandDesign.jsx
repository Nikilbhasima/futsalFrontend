import React from "react";
import { PacmanLoader } from "react-spinners";

function LoadingPacmandDesign({ onLoader }) {
  return (
    <>
      {onLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[black] opacity-50">
          <PacmanLoader color="#27D483" />
        </div>
      )}
    </>
  );
}

export default LoadingPacmandDesign;
