import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actDeleteProject, actFetchListProject } from "../modules/actions";
import { Popconfirm, message, Popover } from "antd";

function Project(props) {
  const { project } = props;
  const dispatch = useDispatch();
  function confirm(e) {
    dispatch(actDeleteProject(project.id));
    //reload lai danh sach;
    dispatch(actFetchListProject());
    message.success("deleted");
  }

  function cancel(e) {
    message.error("Click on No");
  }

  const content = (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>username</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>tran duy hung</td>
            <td>
              <button
                className="btn-sm btn-danger"
                style={{ borderRadius: "50%" }}
              >
                X
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

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
            <img
              key={member.userId}
              src={member.avatar}
              title={member.name}
              alt="frf"
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
          );
        })}

        {/* Nut xem cac user trong project */}
        <Popover content={content} title="Members">
          <button
            className="btn-sm btn-secondary ml-1"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              outline: "none",
            }}
            data-toggle="modal"
            data-target="#usersModal"
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
