import React from "react";
import loadingImg from "../../assets/images/Spin.gif";
import "./style.scss";
const Loading = () => {
  return (
    <div className="loadingImg">
      <img src={loadingImg} alt="" />
    </div>
  );
};
export default Loading;
