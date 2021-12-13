import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actGetUserList } from "./modules/actions";
import User from "./User/User";

function UserManage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetUserList());
  }, [dispatch]);

  const userList = useSelector((state) => state.usermanageReducer.data);

  const [keyword, setKeyword] = useState("");

  const renderUserList = () => {
    if (userList) {
      let userRender = [...userList];
      if (keyword) {
        userRender = userList.filter((user) => {
          return user.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        });
      }
      return userRender?.map((user) => {
        return <User key={user.userId} user={user} />;
      });
    }
  };

  return (
    <div className="container row m-0">
      <h3>User management</h3>
      <div
        className="form-group d-flex justify-content-start mt-3"
        style={{ display: "flex", width: 800 }}
      >
        <div className=" col-md-6 d-flex justify-content-end">
          <input
            type="search"
            className="form-control"
            placeholder="username"
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
          />
        </div>
        <div className="col-md-5 d-flex justify-content-center">
          <button className="btn btn-primary">Add User</button>
        </div>
      </div>
      <div className="table-responsive mt-3 mb-5" style={{ height: 800 }}>
        <table className="table table-bordered">
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
