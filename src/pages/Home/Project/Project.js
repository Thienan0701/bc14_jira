import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  actDeleteProject,
  actFetchListProject,
  actSearchUser,
  actAsignUserProject,
} from "../modules/actions";
import { Popconfirm, message, Popover, AutoComplete } from "antd";

function Project(props) {
  const { project } = props;
  const dispatch = useDispatch();
  const [state, setstate] = useState({
    visible: false,
  });

  const searchData = useSelector((state) => state.homeReducer.searchdata);

  const [value, setValue] = useState("");
  //confirm delete project
  function confirm() {
    dispatch(actDeleteProject(project.id));
    //reload lai danh sach;
    dispatch(actFetchListProject());
    message.success("Deleted");
  }

  function cancel() {
    message.error("Clicked on No");
  }
  // Content cac member cua project
  const content = (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>avatar</th>
            <th>username</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {project?.members.map((member) => {
            return (
              <tr key={member.userId}>
                <td>{member.userId}</td>
                <td>
                  <img
                    src={member.avatar}
                    alt="sdsds"
                    style={{ borderRadius: "50%", width: 30, height: 30 }}
                  />
                </td>
                <td>{member.name}</td>
                <td>
                  <button
                    className="btn-sm btn-danger"
                    style={{ borderRadius: "50%" }}
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  //Nut them user vao project

  const handleVisibleChange = (visible) => {
    setstate({ visible });
  };

  return (
    <tr>
      <th scope="row">{project.id}</th>
      <td>
        <span className="text-primary">{project.projectName}</span>
      </td>
      <td>{project.categoryName}</td>
      <td>
        <span className="text-success border border-success rounded px-1 py-1">
          {project.creator?.name}
        </span>
      </td>
      <td>
        {project.members.slice(0, 2).map((member) => {
          return (
            <Popover content={content} title="Members">
              <img
                key={member.userId}
                src={member.avatar}
                title={member.name}
                alt="frf"
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
            </Popover>
          );
        })}
        <Popover
          content={() => {
            return (
              <AutoComplete
                options={searchData?.slice(0, 10).map((option) => {
                  return {
                    label: option.name,
                    value: option.userId.toString(),
                  };
                })}
                value={value}
                className="w-100"
                onSelect={(option) => {
                  //set lai gia tri hop thoai
                  setValue(option.label);
                  setstate({ visible: !state.visible });
                  console.log(option);
                  dispatch(
                    actAsignUserProject({
                      projectId: project.id,
                      userId: option.value,
                    })
                  );
                }}
                onSearch={(value) => {
                  dispatch(actSearchUser(value));
                }}
              />
            );
          }}
          title="Add member"
          trigger="click"
          visible={state.visible}
          onVisibleChange={handleVisibleChange}
        >
          <button
            className="btn-sm btn-secondary ml-1"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </Popover>
      </td>
      <td>
        <div className="row">
          <div className="col-md-6">
            <Link
              type="button"
              className="btn-sm btn-primary"
              title="Edit Project"
              to={`edit/${project.id}`}
            >
              <i className="fas fa-pen"></i>
            </Link>
          </div>
          <div className="col-md-6">
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <button
                type="button"
                className="btn-sm btn-danger"
                title="Delete Project"
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </Popconfirm>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Project;
