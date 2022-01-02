import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { actOpenDrawerCommonFull } from "../../../components/DrawerCommon/modules/actions";
import Loader from "../../../components/Loader/Loader";
import FormEditUser from "../Forms/FormEditUser/FormEditUser";
import {
  actDeleteUser,
  actGetUserList,
  setUserUpdate,
} from "../modules/actions";
const TableUser = (props) => {
  const dispatch = useDispatch();
  const { valueSearch } = props;

  useEffect(() => {
    dispatch(actGetUserList());
  }, []);

  const { data: userList, loading } = useSelector(
    (state) => state.usermanageReducer
  );

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      sorter: (a, b) => a.userId - b.userId,
      defaultSortOrder: "descend",
    },
    {
      title: "Name",
      dataIndex: "name",
      // render: (text, record) => {
      //   return <Link to={`/project-detail/${record.id}`}>{text}</Link>;
      // },
    },
    {
      title: "Email",
      dataIndex: "email",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (text, record) => {
        return (
          <img
            src={text}
            alt="avatar"
            width="35"
            style={{
              borderRadius: "50%",
              width: "35px",
              display: "block",
              height: "35px",
            }}
            onError={(e) => {
              e.target.src = `https://i.pravatar.cc/150?u=https://ui-avatars.com/api/?name=${record.name}`;
            }}
          />
        );
      },
    },

    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="table-action">
            <Button
              type="primary"
              onClick={() => {
                dispatch(setUserUpdate(record));
                dispatch(
                  actOpenDrawerCommonFull({
                    title: "Edit User",
                    component: <FormEditUser />,
                  })
                );
              }}
              icon={<EditOutlined />}
            />

            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                confirm(record);
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  // confirm
  function confirm(record) {
    dispatch(actDeleteUser(record.userId, Swal));
  }

  let dataSearch = userList ? [...userList] : [];
  if (valueSearch && userList) {
    dataSearch = userList.filter((item) => {
      return (
        item.name.toLowerCase().indexOf(valueSearch.trim().toLowerCase()) !== -1
      );
    });
  }
  if (loading) {
    return <Loader />;
  }

  return userList ? (
    <Table
      columns={columns}
      dataSource={dataSearch}
      rowKey={(record) => record.userId}
      bordered
      pagination={{
        position: ["none", "bottomCenter"],
        pageSize: 10,
        showSizeChanger: false,
      }}
      key={"id"}
    />
  ) : (
    <></>
  );
};

export default TableUser;
