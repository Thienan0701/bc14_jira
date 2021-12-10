import React from "react";

function User(props) {
  const { user } = props;
  return (
    <tr>
      <th scope="row">{user.userId}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>

      <td>
        <div className="row">
          <div className="col-md-6">
            <button
              type="button"
              className="btn-sm btn-primary"
              title="Edit User"
            >
              <i className="fas fa-pen"></i>
            </button>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn-sm btn-danger"
              title="Delete User"
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default User;
