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
      <td>{project.projectName}</td>
      <td>{project.categoryName}</td>
      <td>{project.creator.name}</td>
      <td>
        {project.members.slice(0, 2).map((member) => {
          return (
            <img
              key={member.userId}
              src={member.avatar}
              alt="frf"
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
          );
        })}
        <button
          className="btn-sm btn-primary ml-1"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        >
          <i class="fas fa-plus"></i>
        </button>
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
