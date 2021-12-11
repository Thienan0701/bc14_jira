import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetUserList, actFilterList } from "./modules/actions";
import User from "./User/User";

function UserManage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetUserList());
  }, [dispatch]);

  const userList = useSelector((state) => state.usermanageReducer.data);

  const [keyword, setkeyword] = useState("");

  const renderUserList = () => {
    return userList?.map((user) => {
      return <User key={user.userId} user={user} />;
    });
  };
  const handleFilter = (e) => {
    setkeyword(e.target.value);
    dispatch(actFilterList(keyword));
  };
  return (
    <div>
      <h3>User management</h3>
      <div
        className="row d-flex justify-content-end"
        style={{ display: "flex" }}
      >
        <div className="col-md-6 d-flex justify-content-end">
          <input
            type="search"
            className="form-control"
            placeholder="username"
            onChange={handleFilter}
          />
        </div>
        <div className="col-md-5 d-flex justify-content-center">
          <button className="btn btn-primary">Add User</button>
        </div>
      </div>
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
