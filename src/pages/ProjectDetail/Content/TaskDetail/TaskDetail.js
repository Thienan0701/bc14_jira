import React from "react";

import bug from "../../../../assets/images/bug.svg";
import highest from "../../../../assets/images/highest.svg";
import low from "../../../../assets/images/low.svg";
import lowest from "../../../../assets/images/lowest.svg";
import medium from "../../../../assets/images/medium.svg";
import taskImg from "../../../../assets/images/task.svg";

import { CheckOutlined } from "@ant-design/icons";

export default function TaskDetail({ task }) {
  const renderPriority = (priorityTask) => {
    if (priorityTask?.priorityId === 1) {
      return <img className="priority" src={highest} alt="highest" />;
    } else if (priorityTask?.priorityId === 2) {
      return <img className="priority" src={medium} alt="medium" />;
    } else if (priorityTask?.priorityId === 3) {
      return <img className="priority" src={low} alt="low" />;
    } else if (priorityTask?.priorityId === 4) {
      return <img className="priority" src={lowest} alt="lowest" />;
    }
  };

  const renderTaskType = () => {
    if (task?.taskTypeDetail.id === 1) {
      return <img className="task-type" src={bug} alt="bug" />;
    } else if (task?.taskTypeDetail.id === 2) {
      return <img className="task-type" src={taskImg} alt="task" />;
    }
  };

  const renderStatus = () => {
    if (+task?.statusId === 4) {
      return <CheckOutlined className="icon-done" />;
    }
  };

  return (
    <div className="project-content-item">
      <p className="task-name">{task.taskName}</p>
      <div className="task-detail-footer">
        {renderTaskType()}
        <div className="right">
          {renderStatus()}
          {renderPriority(task.priorityTask)}
          <div className="avatar-group">
            <img className="avatar" src="https://picsum.photos/30/30" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
