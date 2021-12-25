import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actOpenDrawerCommonFull } from "../../components/DrawerCommon/modules/actions";
import FormCreateUser from "./Forms/FormCreateUser/FormCreateUser";
import { actGetUserList } from "./modules/actions";
import TableUser from "./Table/Table";
import User from "./User/User";
import "./index.scss";
function UserManage() {
  const dispatch = useDispatch();

  const [valueSearch, setValueSearch] = useState("");

  return (
    <div className="user-manage">
      <div className="user-manage-form">
        <Button
          type="primary"
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
          Create User
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
