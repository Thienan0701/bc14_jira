import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import "./ModalUpdateTask.scss";
import { message } from "antd";

import bug from "../../../assets/images/bug.svg";
import taskImg from "../../../assets/images/task.svg";
import { Popover } from "antd";
import { CloseOutlined, ShareAltOutlined } from "@ant-design/icons";
import {
  actGetPriority,
  actGetStatusTask,
  actUpdateTask,
  actTaskType,
} from "../modules/actions";
import { useDispatch, useSelector } from "react-redux";
import loadingTaskDetail from "../../../assets/images/loading-task-detail.svg";
import ModalBodyLeft from "./ModalBodyLeft/ModalBodyLeft";
import ModalBodyRight from "./ModalBodyRight/ModalBodyRight";

let taskUpdate = {
  listUserAsign: [],
  taskId: 2235,
  taskName: "hihi hoho",
  description: "string",
  statusId: "1",
  originalEstimate: 0,
  timeTrackingSpent: 0,
  timeTrackingRemaining: 0,
  projectId: 2611,
  typeId: 2,
  priorityId: 2,
};

function capitalizeFirstLetter(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
}

function ModalUpdateTask(props) {
  const { isOpen, setIsOpen } = props;
  const [contentComment, setContentComment] = useState(true);

  // lan dau bam vao input comment
  const [isFirst, setIsFirst] = useState(true);
  const [commenting, setCommenting] = useState(true);

  // setup ref Comment
  const inputCommentRefFake = useRef();
  const inputCommentRefReal = useRef();

  // setup ref description
  const inputDescriptionRefFake = useRef();

  // status
  const [status, setStatus] = useState({
    visible: false,
    statusCurrent: "1",
  });
  const [taskType, setTaskType] = useState(false);

  // taskDetail moi nhat
  const [taskDetailReal, setTaskDetailReal] = useState({
    priorityTask: { priorityId: 4, priority: "Lowest" },
    taskTypeDetail: { id: 2, taskType: "new task" },
    assigness: [],
    lstComment: [],
    taskId: 2245,
    taskName: "",
    alias: "",
    description: "",
    statusId: "2",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    typeId: 2,
    priorityId: 4,
    projectId: 2615,
  });

  // get data tu store
  const { taskDetail, isLoadingTaskDetail, dataStatus, data, dataTaskType } =
    useSelector((state) => state.projectDetailReducer);

  // gán task detail vào task real khi task detail thay doi(data moi nhat tu server)
  useEffect(() => {
    if (taskDetail) {
      setTaskDetailReal(taskDetail);
    }
  }, [taskDetail]);

  const dispatch = useDispatch();
  // lấy các giá trị mặc định của server 1 lần duy nhất
  useEffect(() => {
    dispatch(actGetStatusTask());
    dispatch(actGetPriority());
    dispatch(actTaskType());
  }, []);

  // updateLai cac gia tri update
  useEffect(() => {
    if (taskDetailReal) {
      taskUpdate = {
        listUserAsign: taskDetailReal.assigness,
        taskId: taskDetailReal.taskId,
        taskName: taskDetailReal.taskName,
        description: taskDetailReal.description,
        statusId: taskDetailReal.statusId,
        originalEstimate: taskDetailReal.originalEstimate,
        timeTrackingSpent: taskDetailReal.timeTrackingSpent,
        timeTrackingRemaining: taskDetailReal.timeTrackingRemaining,
        projectId: taskDetailReal.projectId,
        typeId: taskDetailReal.typeId,
        priorityId: taskDetailReal.priorityId,
      };
    }
  }, [taskDetailReal]);

  // lấy status của task detailReal để render ra status của task detail hiện tại
  useEffect(() => {
    if (dataStatus && taskDetailReal) {
      setStatus({ ...status, statusCurrent: taskDetailReal.statusId });
    }
  }, [taskDetailReal]);

  // if (modal mở && commenting === true ) thì adđ event get phím m ngược lại thì không clearEvent
  useEffect(() => {
    if (isOpen && commenting) {
      addEventListenerKeyPress();
    } else {
      document.removeEventListener("keypress", memoizedListener);
    }
  }, [isOpen, commenting]);
  // hàm clear event
  const handleClear = () => {
    document.removeEventListener("keypress", memoizedListener);
    setCommenting(false);
  };

  // hàm xử lý khi focus vào input comment
  const handleFocusRealComment = (isFirst = true) => {
    if (inputCommentRefFake && inputCommentRefReal) {
      inputCommentRefFake.current.style.display = "none";
      inputCommentRefReal.current.style.display = "block";
      inputCommentRefReal.current?.querySelector("textarea").focus();
      setContentComment("");
      handleClear();
      setIsFirst(isFirst);
    }
  };

  // hàm bắt phím M
  const handleEvenWindow = (e) => {
    if (String.fromCharCode(e.charCode) === "m") {
      handleFocusRealComment();
    }
  };
  const memoizedListener = useMemo(() => handleEvenWindow, []);

  const addEventListenerKeyPress = () => {
    document.addEventListener("keypress", memoizedListener);
  };

  const handleChangeTaskType = (item) => {
    const prevTaskDetailReal = taskDetailReal;
    const id = data.id;
    const info = {
      ...taskUpdate,
      listUserAsign: taskDetailReal?.assigness?.reduce((total, item) => {
        return [...total, item.id];
      }, []),
      typeId: item.id,
    };
    setTaskType(false);
    setTaskDetailReal({
      ...taskDetailReal,

      taskTypeDetail: {
        id: item.id,
        taskType: item.taskType,
      },
      typeId: item.id,
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className="modal-update-task"
      style={{
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="modal-wrapper">
        <div className="modal-container">
          {isLoadingTaskDetail ? (
            <div
              style={{
                padding: 40,
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={loadingTaskDetail}
                alt=""
              />
            </div>
          ) : (
            <div className="modal-container-content">
              <div className="modal-header-update">
                <div className="tooltip-update">
                  <Popover
                    placement="bottomLeft"
                    content={
                      <div className="task-type-list">
                        <p className="task-type-title">Change task type</p>
                        <div>
                          {dataTaskType?.map((item, index) => {
                            return (
                              <div
                                onClick={() => {
                                  handleChangeTaskType(item);
                                }}
                                key={index}
                                className="type-task-item"
                              >
                                <img
                                  src={item.id === 1 ? bug : taskImg}
                                  alt={item.taskType}
                                />{" "}
                                <span className="desc">
                                  {capitalizeFirstLetter(item.taskType)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    }
                    trigger="click"
                    visible={taskType}
                    onVisibleChange={(value) => {
                      setTaskType(value);
                    }}
                  >
                    <img
                      src={
                        taskDetailReal?.taskTypeDetail.id === 1 ? bug : taskImg
                      }
                      alt="bug"
                    />
                    <span className="desc">
                      {capitalizeFirstLetter(
                        taskDetailReal?.taskTypeDetail.taskType
                      )}
                    </span>
                  </Popover>
                  <span className="tooltip-text">Bug - Change task type</span>
                </div>
                <div className="header-right">
                  <ShareAltOutlined className="btn-share" />
                  <CloseOutlined
                    className="btn-close"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  />
                </div>
              </div>
              <div className="modal-body-update">
                <ModalBodyLeft
                  taskDetailReal={taskDetailReal}
                  inputDescriptionRefFake={inputDescriptionRefFake}
                  handleClear={handleClear}
                  commenting={commenting}
                  taskUpdate={taskUpdate}
                  addEventListenerKeyPress={addEventListenerKeyPress}
                  inputCommentRefReal={inputCommentRefReal}
                  setTaskDetailReal={setTaskDetailReal}
                  inputCommentRefFake={inputCommentRefFake}
                  handleFocusRealComment={handleFocusRealComment}
                  contentComment={contentComment}
                  isFirst={isFirst}
                  setIsFirst={setIsFirst}
                  setContentComment={setContentComment}
                  setCommenting={setCommenting}
                  setTaskType={setTaskType}
                  history={props.history}
                />
                <ModalBodyRight
                  status={status}
                  setStatus={setStatus}
                  taskDetailReal={taskDetailReal}
                  commenting={commenting}
                  handleClear={handleClear}
                  addEventListenerKeyPress={addEventListenerKeyPress}
                  inputCommentRefReal={inputCommentRefReal}
                  setTaskDetailReal={setTaskDetailReal}
                  taskUpdate={taskUpdate}
                  setTaskType={setTaskType}
                  history={props.history}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <img
        src={loadingTaskDetail}
        style={{ display: "none", visibility: "hidden" }}
        alt=""
      />
    </div>
  );
}

export default ModalUpdateTask;
