import React, { useEffect, useRef } from "react";
import "./ModalCreateTask.scss";
import { message, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Tag } from "antd";
import { Slider } from "antd";
import { useDispatch, connect } from "react-redux";

import { withFormik } from "formik";

import {
  actCreateTask,
  actGetALlProject,
  actGetPriority,
  actGetStatusTask,
  actGetTaskType,
  actGetUserByProjectId,
} from "./modules/actions";
import { useSelector } from "react-redux";
const { Option } = Select;

function ModalCreateTask(props) {
  const { isOpen, setIsOpen } = props;
  const { data: detail } = useSelector((state) => state.projectDetailReducer);
  const modalBodyRef = useRef();

  const {
    values,
    touched,
    errors,
    setFieldError,
    handleChange,
    setFieldTouched,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = props;

  const checkHome = () => {
    return props.location.pathname === "/";
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      dispatch(actGetPriority());
      dispatch(actGetTaskType());
      dispatch(actGetALlProject());
      dispatch(actGetStatusTask());
      if (!checkHome() && detail) {
        dispatch(actGetUserByProjectId(detail.id));
        setFieldValue("projectId", detail.id);
      }
    } else {
      resetForm();
      modalBodyRef.current.scrollTo(0, 0);
    }
  }, [isOpen]);

  const {
    dataPriority,
    dataTaskType,
    dataAllProject,
    dataStatusTask,
    dataUserByProjectId,
  } = useSelector((state) => state.modalCreateIssueReducer);

  const { data: userLogin } = useSelector((state) => state.loginReducer);

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

  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  }

  const onChangeByName = (name) => (value) => {
    if (value.target) setFieldValue(name, +value.target.value);
    else setFieldValue(name, value);
  };

  const changeSelectProject = (name) => (value) => {
    if (value) {
      setFieldTouched("projectId", false);
      setFieldError("projectId", "");
    }
    dispatch(actGetUserByProjectId(value));
    setFieldValue(name, value);
    setFieldValue("listUserAsign", []);
  };

  const handleRenderErrorFooter = () => {
    if (Object.keys(errors).length === 1) {
      if (touched.taskName && errors.taskName) {
        return "Error: Task Name";
      }
      if (touched.projectId && errors.projectId) {
        return "Error: Project";
      }
    } else if (Object.keys(errors).length === 2) {
      if (
        touched.taskName &&
        errors.taskName &&
        touched.projectId &&
        errors.projectId
      ) {
        return "Error: Task Name, Project";
      }
      if (touched.taskName && errors.taskName) {
        return "Error: Task Name";
      }
      if (touched.projectId && errors.projectId) {
        return "Error: Project";
      }
    }
    return <></>;
  };

  const handleAssignToMe = () => {
    if (dataUserByProjectId?.length) {
      if (!values.listUserAsign.includes(userLogin.id)) {
        setFieldValue("listUserAsign", [...values.listUserAsign, userLogin.id]);
      }
    }
  };

  const handleRenderAssignToMe = () => {
    if (dataUserByProjectId) {
      const index = dataUserByProjectId?.findIndex(
        (item) => item.userId === userLogin.id
      );
      if (index !== -1) {
        return (
          <span className="assign-me" onClick={handleAssignToMe}>
            Assign to me
          </span>
        );
      }
    }
    return <></>;
  };
  return (
    <div
      className="modal-create-issue"
      style={{
        visibility: isOpen ? "visible" : "hidden",
        opacity: isOpen ? 1 : 0,
      }}
    >
      <div className="modal-wrapper">
        <div className="modal-header">
          <h3>Create Task</h3>
        </div>
        <div ref={modalBodyRef} className="modal-body">
          <div className="modal-body-container">
            <div className="modal-body-top">
              <div className="project-select">
                <span className="label">
                  Project <span className="text-danger">*</span>
                </span>
                <Select
                  disabled={!checkHome()}
                  value={checkHome() ? values?.projectId : detail?.id}
                  onBlur={() => {
                    if (!values?.projectId) {
                      setFieldTouched("projectId");
                      setFieldError(
                        "projectId",
                        "* Project is a required field!"
                      );
                    }
                  }}
                  onChange={changeSelectProject("projectId")}
                >
                  {dataAllProject
                    ?.filter((item, index) => userLogin?.id === item.creator.id)
                    .map((item, index) => (
                      <Option value={item.id} key={index}>
                        {item.projectName}{" "}
                      </Option>
                    ))}
                </Select>
                {touched.projectId && errors.projectId ? (
                  <div className="message-error">{errors.projectId}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="type">
                <div className="issue-type-select">
                  <span className="label">
                    Task Type <span className="text-danger">*</span>
                  </span>
                  <Select
                    value={values?.typeId}
                    onChange={onChangeByName("typeId")}
                  >
                    {dataTaskType?.map((item, index) => {
                      return (
                        <Option value={item.id} key={index}>
                          {capitalizeFirstLetter(item.taskType)}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="issue-type-select">
                  <span className="label">
                    Priority <span className="text-danger">*</span>
                  </span>
                  <Select
                    value={values?.priorityId}
                    onChange={onChangeByName("priorityId")}
                  >
                    {dataPriority?.map((item, index) => {
                      return (
                        <Option value={item.priorityId} key={index}>
                          {item.priority}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>

              <div className="issue-type-select">
                <label className="label">
                  Status Task <span className="text-danger">*</span>
                </label>
                <Select
                  value={values?.statusId}
                  onChange={onChangeByName("statusId")}
                >
                  {dataStatusTask?.map((item, index) => {
                    return (
                      <Option value={item.statusId} key={index}>
                        {capitalizeFirstLetter(item.statusName)}
                      </Option>
                    );
                  })}
                </Select>
              </div>

              <div className="time">
                <span className="label">Time Tracking</span>

                <Slider
                  className="time-tracking"
                  defaultValue="0"
                  value={values?.timeTrackingSpent}
                  max={
                    Number(values?.timeTrackingSpent) +
                    Number(values?.timeTrackingRemaining)
                  }
                />
                <div className="time-tracking-desc">
                  <span>{values?.timeTrackingSpent}h logged</span>
                  <span>{values?.timeTrackingRemaining}h remaining</span>
                </div>
                <div className="box-input-time">
                  <div className="left">
                    <label htmlFor="">Time spent</label>
                    <input
                      name="timeTrackingSpent"
                      type="number"
                      className="input-custom"
                      value={values?.timeTrackingSpent}
                      min={0}
                      onChange={onChangeByName("timeTrackingSpent")}
                    />
                  </div>
                  <div className="right">
                    <label htmlFor="">Time remaining</label>
                    <input
                      type="number"
                      name="timeTrackingRemaining"
                      className="input-custom"
                      value={values?.timeTrackingRemaining}
                      min={0}
                      onChange={onChangeByName("timeTrackingRemaining")}
                    />
                  </div>
                </div>
                <div className="original-estimate">
                  <label className="label">Original Estimate</label>
                  <input
                    name="originalEstimate"
                    onChange={onChangeByName("originalEstimate")}
                    className="input-custom"
                    value={values?.originalEstimate}
                    type="number"
                    min={0}
                  />
                </div>
              </div>
              <div className="assign">
                <span className="label">Assignee</span>
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  onChange={onChangeByName("listUserAsign")}
                  value={values?.listUserAsign}
                  optionFilterProp="label"
                  style={{ width: "100%" }}
                  options={
                    dataUserByProjectId?.map((item) => ({
                      value: item.userId,
                      label: item.name,
                    })) || []
                  }
                />
                {handleRenderAssignToMe()}
              </div>
            </div>
            <div className="modal-body-mid">
              <div className="task-name">
                <span className="label">
                  Task name <span className="text-danger">*</span>
                </span>
                <input
                  name="taskName"
                  onChange={handleChange}
                  value={values?.taskName}
                  onBlur={handleBlur}
                  type="text"
                  className="input-custom"
                />
                {touched.taskName && errors.taskName ? (
                  <div className="message-error">{errors.taskName}</div>
                ) : (
                  ""
                )}
              </div>
              <div className="description-hi">
                <span className="label">Description</span>
                <Editor
                  id="description-hi"
                  init={{
                    height: 250,
                    menubar: false,
                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic backcolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                  onEditorChange={onChangeByName("description")}
                  value={values?.description}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="text-red">{handleRenderErrorFooter()}</div>
          <div className="box-create">
            <button type="submit" onClick={handleSubmit} className="btn-create">
              <span>Create</span>
            </button>
            <span
              onClick={() => {
                setIsOpen(false);
                resetForm();
              }}
              className="btn-cancel"
            >
              Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const MyEnhancedForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => ({
    listUserAsign: [],
    taskName: "",
    description: "",
    statusId: "1",
    originalEstimate: 0,
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
    projectId: "",
    typeId: 2,
    priorityId: 2,
  }),

  // Custom sync validation
  validate: (values) => {
    const errors = {};
    if (!values.taskName) {
      errors.taskName = "* Task name is a required field!";
    }
    if (!values.projectId) {
      errors.projectId = "* Project is a required field!";
    }
    return errors;
  },

  handleSubmit: (values, method) => {
    const isHome = method.props.location.pathname === "/";
    method.props.createTask(
      values,
      method.props.setIsOpen,
      message,
      isHome,
      method.props.history
    );
  },

  displayName: "FormCreateTask",
})(ModalCreateTask);

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createTask: (info, setIsOpen, message, isHome, history) => {
      dispatch(actCreateTask(info, setIsOpen, message, isHome, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(MyEnhancedForm);
