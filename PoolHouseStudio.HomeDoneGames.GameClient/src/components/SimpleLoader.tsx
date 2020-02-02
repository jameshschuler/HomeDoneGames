import React from "react";

interface ISimpleLoaderProps {
  text?: string;
}

const SimpleLoader: React.FC<ISimpleLoaderProps> = ({ text }) => {
  return <h1 id="simple-loader">{text || "Loading..."}</h1>;
};

export default SimpleLoader;
