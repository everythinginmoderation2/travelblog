import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ text }) => {
  return (
    <div className="text-center mt-5">
      <ClipLoader color="#0069D9" size={50} loading={true} />
      <div>{`Loading${text ? " " + text : ""}`}</div>
    </div>
  );
};

export default LoadingSpinner;
