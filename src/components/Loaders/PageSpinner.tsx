import React from "react";
import Box from "@mui/material/Box";
import { FadeLoader } from "react-spinners";

interface SpinnerComponentProps {
  isLoading: boolean;
}

const PageSpinner: React.FC<SpinnerComponentProps> = ({ isLoading }) => {
  return (
    <div className="spinner-container">
      <FadeLoader color="#65a9da" height={30} loading={isLoading} width={5} />
    </div>
  );
};

export default PageSpinner;
