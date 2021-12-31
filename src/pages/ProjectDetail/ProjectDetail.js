import React, { useState } from "react";

import "./style.scss";
import Header from "./Header/Header";
import Content from "./Content/Content";
import ModalUpdateTask from "./ModalUpdateTask/ModalUpdateTask";
function ProjectDetail(props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="project-detail">
        <Header {...props} />
        <Content {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <ModalUpdateTask {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default ProjectDetail;
