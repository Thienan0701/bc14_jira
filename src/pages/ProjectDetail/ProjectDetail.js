import React from "react";

import "./style.scss";
import Header from "./Header/Header";
import Content from "./Content/Content";
function ProjectDetail(props) {
  return (
    <div className="project-detail">
      <Header />
      <Content {...props} />
    </div>
  );
}

export default ProjectDetail;
