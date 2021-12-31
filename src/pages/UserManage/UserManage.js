import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { actOpenDrawerCommonFull } from "../../components/DrawerCommon/modules/actions";
import FormCreateUser from "./Forms/FormCreateUser/FormCreateUser";
import TableUser from "./Table/Table";
import "./index.scss";
function UserManage() {
  const dispatch = useDispatch();

  const [valueSearch, setValueSearch] = useState("");

  return (
    <div className="user-manage">
      <div className="user-manage-form">
        <Button
          type="primary"
          className="btn-create-user"
          onClick={() =>
            dispatch(
              actOpenDrawerCommonFull({
                component: <FormCreateUser />,
                callback: () => {
                  alert("ok");
                },
                title: "Create User",
              })
            )
          }
        >
          <p>Create User</p> <UserAddOutlined className="btn-icon" />
        </Button>
        <Input
          className="input-search"
          placeholder="Enter name"
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          suffix={<SearchOutlined />}
        />
      </div>
      <div className="table-user">
        <TableUser valueSearch={valueSearch} />
      </div>
    </div>
  );
}

export default UserManage;
