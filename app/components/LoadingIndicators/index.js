import React from "react";
import { Spin } from "antd";
function LoadingSpin() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh"
      }}
    >
      <Spin size="large" />
    </div>
  );
}

export default LoadingSpin;
