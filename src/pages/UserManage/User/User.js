import React from "react";
import { Popconfirm, message } from "antd";
import { useDispatch } from "react-redux";
import { actDeleteUser } from "../modules/actions";

function User(props) {
  const { user } = props;
  const dispatch = useDispatch();

  function confirm() {
    dispatch(actDeleteUser(user.userId, message));
  }
  function cancel() {
    message.error("Canceled");
  }
  return (
    <tr>
      <th scope="row">{user.userId}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phoneNumber}</td>

      <td>
        <div className="row">
          <div className="col-md-4">
            <button
              type="button"
              className="btn-sm btn-primary"
              title="Edit User"
            >
              <i className="fas fa-pen"></i>
            </button>
          </div>
          <div className="col-md-4">
            <Popconfirm
              title="Delete this user?"
              onConfirm={confirm}
              onCancel={cancel}
              placement="bottom"
              okText="Yes"
              cancelText="No"
            >
              <button
                type="button"
                className="btn-sm btn-danger"
                title="Delete User"
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

export default User;
