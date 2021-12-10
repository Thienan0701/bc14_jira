import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetUserList } from "./modules/actions";
import User from "./User/User";

function UserManage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetUserList());
  }, [dispatch]);

  const userList = useSelector((state) => state.usermanageReducer.data);

  const renderUserList = () => {
    return userList?.map((user) => {
      return <User key={user.userId} user={user} />;
    });
  };
  return (
    <div>
      <h3>User management</h3>
      <div className="table-responsive mt-3 mb-5" style={{ height: 500 }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
              <th scope="col">phone number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{renderUserList()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManage;
