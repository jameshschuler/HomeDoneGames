import React from "react";

interface SimpleLoaderProps {
  text?: string;
}

const SimpleLoader: React.FC<SimpleLoaderProps> = ({ text }) => {
  return <h1 className="simple-loader">{text || "Loading..."}</h1>;
};

export default SimpleLoader;
