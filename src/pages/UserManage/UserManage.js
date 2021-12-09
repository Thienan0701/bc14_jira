import React from "react";

function UserManage() {
  return (
    <div>
      <h3>User management</h3>
      <div className="table-responsive mt-3 mb-5" style={{ height: 500 }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">user name</th>
              <th scope="col">avatar</th>
              <th scope="col">creator</th>
              <th scope="col">members</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManage;
