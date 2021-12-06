import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { actDeleteProject, actFetchListProject } from "../modules/actions";

function Project(props) {
  const { project } = props;
  const dispatch = useDispatch();

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
        <button
          className="btn-sm btn-success ml-1"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
          data-toggle="modal"
          data-target="#usersModal"
        >
          <i class="fas fa-plus"></i>
        </button>
        {/* <!-- Modal load danh sach user cua project--> */}
        <div
          className="modal fade"
          id="usersModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary" id="exampleModalLabel">
                  Members
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">...</div>
            </div>
          </div>
        </div>
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
              <i class="fas fa-pen"></i>
            </Link>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn-sm btn-danger"
              title="Delete Project"
              onClick={() => {
                dispatch(actDeleteProject(project.id));
                //reload lai danh sach;
                dispatch(actFetchListProject());
              }}
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Project;
