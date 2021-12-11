import React from "react";
import { Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actDeleteUser, actGetUserList } from "../modules/actions";

function User(props) {
  const { user } = props;
  const dispatch = useDispatch();
  const deleteUserResult = useSelector(
    (state) => state.usermanageReducer.deleteResult
  );
  const deleteUserErr = useSelector(
    (state) => state.usermanageReducer.deleteErr
  );

  function confirm() {
    dispatch(actDeleteUser(user.userId));
    if (deleteUserResult) {
      dispatch(actGetUserList());
      message.success(`${deleteUserResult}`);
    } else if (deleteUserErr) {
      message.error(`${deleteUserErr?.response?.data?.content}`);
    }
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
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
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
