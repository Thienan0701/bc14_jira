import React from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function Project(props) {
  const { project } = props;
  return (
    <tr>
      <th scope="row">{project.id}</th>
      <td>{project.projectName}</td>
      <td>{project.categoryName}</td>
      <td>{project.creator.name}</td>
      <td>
        {project.members.slice(0, 2).map((member) => {
          return (
            <button key={member.userId} className="btn-sm btn-primary">
              <img
                src={member.avatar}
                alt="frf"
                style={{ width: 30, height: 30 }}
              />
            </button>
          );
        })}
        {/* <button className="btn-sm btn-primary">
          <i class="fas fa-plus-circle"></i>
        </button> */}
      </td>
      <td>
        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="btn-sm btn-primary"
              title="Edit Project"
            >
              <i class="fas fa-pen-fancy"></i>
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn-sm btn-danger"
              title="Delete Project"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Project;
