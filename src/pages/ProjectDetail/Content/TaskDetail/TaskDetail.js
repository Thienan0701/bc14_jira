import React from "react";
import { Tooltip } from "antd";

import bug from "../../../../assets/images/bug.svg";
import highest from "../../../../assets/images/highest.svg";
import low from "../../../../assets/images/low.svg";
import lowest from "../../../../assets/images/lowest.svg";
import medium from "../../../../assets/images/medium.svg";
import taskImg from "../../../../assets/images/task.svg";

import { CheckOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getTaskDetail } from "../../modules/actions";

export default function TaskDetail(props) {
  const { isOpen, setIsOpen, task } = props;

  const dispatch = useDispatch();

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
  console.log(task);

  const renderAvatar = () => {
    return task?.assigness?.slice(0, 1).map((item, index) => {
      return (
        <Tooltip placement="top" title={item.name}>
          <img
            key={index}
            className="avatar"
            src={item.avatar}
            alt=""
            onError={(e) => {
              e.target.src = `https://i.pravatar.cc/150?u=https://ui-avatars.com/api/?name=${item.name}`;
            }}
          />
        </Tooltip>
      );
    });
  };

  const renderAvatarResidual = () => {
    if (task?.assigness.length - 1 > 0) {
      return (
        <div className="img-residual">
          <span>+{task?.assigness.length - 1}</span>
        </div>
      );
    }
  };

  return (
    <div
      className="project-content-item"
      onClick={() => {
        setIsOpen(true);
        dispatch(getTaskDetail(task.taskId));
      }}
    >
      <p className="task-name">{task.taskName}</p>
      <div className="task-detail-footer">
        {renderTaskType()}
        <div className="right">
          {renderStatus()}
          {renderPriority(task.priorityTask)}
          <div className="avatar-group">
            {renderAvatar()}
            {renderAvatarResidual()}
          </div>
        </div>
      </div>
    </div>
  );
}
