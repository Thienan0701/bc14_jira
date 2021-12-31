import { DownOutlined } from "@ant-design/icons";
import { message, Popover, Select, Slider, Tag } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actUpdateStatusDetail, actUpdateTask } from "../../modules/actions";

import highest from "../../../../assets/images/highest.svg";
import low from "../../../../assets/images/low.svg";
import lowest from "../../../../assets/images/lowest.svg";
import medium from "../../../../assets/images/medium.svg";

const { Option } = Select;

function to_slug(str) {
  if (str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();

    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");

    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");

    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");

    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");

    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");

    // return
    return str;
  }
}

function tagRender(props) {
  const { label, value, closable, onClose } = props;

  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const options = [
    { value: "gold" },
    { value: "lime" },
    { value: "green" },
    { value: "cyan" },
    { value: "red" },
    { value: "blue" },
    { value: "pink" },
  ];

  return (
    <Tag
      color={options[Math.floor(Math.random() * options.length)].value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
}

// render img của các priority
const renderImgPriority = (id) => {
  if (id === 1) {
    return <img src={highest} alt="highest" />;
  } else if (id === 2) {
    return <img src={medium} alt="medium" />;
  } else if (id === 3) {
    return <img src={low} alt="low" />;
  } else if (id === 4) {
    return <img src={lowest} alt="lowest" />;
  }
};

export default function ModalBodyRight(props) {
  const {
    status,
    setStatus,
    taskDetailReal,
    commenting,
    handleClear,
    addEventListenerKeyPress,
    inputCommentRefReal,
    setTaskDetailReal,
    taskUpdate,
    setTaskType,
  } = props;

  const {
    taskDetail,
    loading,
    error,
    dataStatus,
    data,
    dataPriority,
    dataTaskType,
  } = useSelector((state) => state.projectDetailReducer);

  const dispatch = useDispatch();

  // hàm render status
  const renderStatus = () => {
    const item = dataStatus?.find((item) => {
      return item.statusId === status?.statusCurrent;
    });
    return item?.statusName;
  };

  // hàm xử lý update status
  const handleChangeStatus = (item) => {
    const prevStatusId = status.statusCurrent;
    const id = data.id;
    setTaskDetailReal({
      ...taskDetailReal,
      statusId: item.statusId,
    });
    setStatus({
      visible: false,
      statusCurrent: item.statusId,
    });
    const info = {
      taskId: taskDetailReal.taskId,
      statusId: item.statusId,
    };
    dispatch(
      actUpdateStatusDetail(
        info,
        id,
        prevStatusId,
        setStatus,
        props.history,
        message
      )
    );
  };

  const handleChangeAssign = (value) => {
    const prevTaskDetailReal = taskDetailReal;
    const id = data.id;
    setTaskType(false);

    const info = {
      ...taskUpdate,
      listUserAsign: value,
    };
    const userCurrent = [];

    for (let i = 0; i < data?.members.length; i++) {
      if (value.includes(data?.members[i].userId)) {
        userCurrent.push({
          id: data?.members[i].userId,
          avatar: data?.members[i].avatar,
          name: data?.members[i].name,
          alias: to_slug(data?.members[i].name),
        });
      }
    }

    setTaskDetailReal({
      ...taskDetailReal,
      assigness: userCurrent,
    });

    dispatch(
      actUpdateTask(
        info,
        id,
        prevTaskDetailReal,
        setTaskDetailReal,
        props.history,
        message
      )
    );
  };

  // hàm xử lý update priority
  function handleChangePriority(value) {
    const prevTaskDetailReal = taskDetailReal;
    const id = data.id;
    const info = {
      ...taskUpdate,
      listUserAsign: taskDetailReal?.assigness?.reduce((total, item) => {
        return [...total, item.id];
      }, []),
      priorityId: value,
    };

    const index = dataPriority.findIndex((item) => {
      return item.priorityId === value;
    });

    setTaskDetailReal({
      ...taskDetailReal,
      priorityId: value,
      priorityTask: {
        priority: dataPriority[index + 1],
        priorityId: value,
      },
    });

    dispatch(
      actUpdateTask(
        info,
        id,
        prevTaskDetailReal,
        setTaskDetailReal,
        props.history,
        message
      )
    );
  }

  const handleUpdateTimeByName = (name) => (e) => {
    const prevTaskDetailReal = taskDetailReal;
    const id = data.id;

    setTaskDetailReal({
      ...taskDetailReal,
      [name]: +e.target.value,
    });
    const info = {
      ...taskDetailReal,

      listUserAsign: taskDetailReal?.assigness?.reduce((total, item) => {
        return [...total, item.id];
      }, []),
      [name]: +e.target.value,
    };

    dispatch(
      actUpdateTask(
        info,
        id,
        prevTaskDetailReal,
        setTaskDetailReal,
        props.history,
        message
      )
    );
  };

  return (
    <div className="modal-body-update-right">
      <div className="modal-body-update-right-container">
        <Popover
          content={
            <div className="popover-select">
              {dataStatus?.map((item, index) => {
                const classNotDone =
                  index !== 0 && index !== dataStatus.length - 1
                    ? "not-done"
                    : "";
                const classDone = index === dataStatus.length - 1 ? "done" : "";
                return (
                  <div
                    onClick={() => {
                      handleChangeStatus(item);
                    }}
                    className="select-item"
                    key={index}
                  >
                    <span
                      className={`content todo ${classNotDone} ${classDone}`}
                    >
                      {item.statusName}
                    </span>
                  </div>
                );
              })}
            </div>
          }
          trigger="click"
          placement="bottomLeft"
          visible={status.visible}
          onVisibleChange={(value) => {
            setStatus({ ...status, visible: value });
          }}
        >
          <div
            className={`btn-select blue ${
              status.statusCurrent === "4" ? "done" : ""
            }`}
          >
            {renderStatus()}
            <DownOutlined className="icon-down" />
          </div>
        </Popover>
        <div className="assign">
          <span className="label">Assignee</span>
          <Select
            mode="multiple"
            showArrow
            tagRender={tagRender}
            onChange={(value) => {
              handleChangeAssign(value);
            }}
            value={taskDetailReal?.assigness?.map((item) => {
              return item.id;
            })}
            placeholder="Unassigned"
            optionFilterProp="label"
            style={{ width: "100%" }}
            onFocus={() => {
              handleClear();
            }}
            onBlur={() => {
              if (!commenting) {
                addEventListenerKeyPress();
              }
              if (inputCommentRefReal?.current?.style.display === "block") {
                handleClear();
              }
            }}
            options={data?.members.map((item) => ({
              value: item.userId,
              label: item.name,
            }))}
          />
        </div>
        <div className="priority">
          <span className="label">Priority</span>
          <Select
            value={taskDetailReal?.priorityId}
            style={{ width: "100%" }}
            onChange={handleChangePriority}
          >
            {dataPriority?.map((item, index) => {
              return (
                <Option
                  key={index}
                  className="priority-option"
                  value={item.priorityId}
                >
                  {renderImgPriority(item.priorityId)}
                  <span>{item.priority}</span>
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="time">
          <span className="label">Time Tracking</span>
          <Slider
            min={0}
            max={
              taskDetailReal?.timeTrackingSpent +
              taskDetailReal?.timeTrackingRemaining
            }
            value={taskDetailReal?.timeTrackingSpent}
            onChange={() => {}}
          />
          <div className="desc">
            <span>{taskDetailReal?.timeTrackingSpent}h logged</span>
            <span>{taskDetailReal?.timeTrackingRemaining}h remaining</span>
          </div>
          <div className="time-two">
            <div className="spent">
              <span className="label">Time spent</span>
              <input
                onFocus={() => {
                  handleClear();
                }}
                onBlur={() => {
                  if (!commenting) {
                    addEventListenerKeyPress();
                  }
                  if (inputCommentRefReal?.current?.style.display === "block") {
                    handleClear();
                  }
                }}
                min={0}
                onChange={handleUpdateTimeByName("timeTrackingSpent")}
                className="input-time"
                value={taskDetailReal?.timeTrackingSpent}
                type="number"
              />
            </div>
            <div className="remaining">
              <span className="label">Time remaining</span>
              <input
                onFocus={() => {
                  handleClear();
                }}
                onBlur={() => {
                  if (!commenting) {
                    addEventListenerKeyPress();
                  }
                  if (inputCommentRefReal?.current?.style.display === "block") {
                    handleClear();
                  }
                }}
                min={0}
                onChange={handleUpdateTimeByName("timeTrackingRemaining")}
                className="input-time"
                value={taskDetailReal?.timeTrackingRemaining}
                type="number"
              />
            </div>
          </div>
        </div>
        <div
          className="original-estimate
"
        >
          <span className="label">Original Estimate</span>
          <input
            onFocus={() => {
              handleClear();
            }}
            onBlur={() => {
              if (!commenting) {
                addEventListenerKeyPress();
              }
              if (inputCommentRefReal?.current?.style.display === "block") {
                handleClear();
              }
            }}
            className="input-time"
            type="number"
            min={0}
            onChange={handleUpdateTimeByName("originalEstimate")}
            value={taskDetailReal?.originalEstimate}
          />
        </div>
      </div>
    </div>
  );
}
