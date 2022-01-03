import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actOpenDrawerCommonFull } from "../../components/DrawerCommon/modules/actions";
import FormCreateUser from "./Forms/FormCreateUser/FormCreateUser";
import TableUser from "./Table/Table";
import "./index.scss";
import { useEffect } from "react";
import { actGetUserList } from "./modules/actions";
import Loading from "../../components/Loading";
function UserManage() {
  const dispatch = useDispatch();

  const [valueSearch, setValueSearch] = useState("");
  const [isLoadFirst, setIsLoadFirst] = useState(true);

  useEffect(() => {
    dispatch(actGetUserList());
  }, []);

  const { data, loading } = useSelector((state) => state.usermanageReducer);

  useEffect(() => {
    if (data) {
      setIsLoadFirst(false);
    }
  }, [data]);

  useEffect(() => {
    setIsLoadFirst(true);
  }, []);

  if (loading && isLoadFirst) {
    return (
      <>
        <Loading />
      </>
    );
  }

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
