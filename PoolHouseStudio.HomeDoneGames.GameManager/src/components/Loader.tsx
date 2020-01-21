import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const Loader: React.FC = () => {
  return (
    <div style={{ textAlign: "center", margin: "0 auto" }}>
      <CircularProgress size="5rem" />
    </div>
  );
};

export default Loader;
