import React from "react";
import { Button, message, Popconfirm, Popover, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useDispatch } from "react-redux";
import {
  actDeleteProject,
  actDeleteUserProject,
  actGetProjectEdit,
} from "../modules/actions";
import PopAssign from "../PopAssign";
import { Link } from "react-router-dom";
// import { actOpenDrawerCommonFull } from "../../../components/DrawerCommon/modules/actions";
import FormEditProject from "../Forms/FormEditProject/FormEditProject";
import Loader from "../../../components/Loader/Loader";
const HomeTable = (props) => {
  const dispatch = useDispatch();
  const { valueSearch } = props;

  const { loading, data } = useSelector((state) => state.homeReducer);
  const { data: userLogin } = useSelector((state) => state.loginReducer);

  const content = (members, record) => {
    return (
      <table className="table-content" style={{ width: 300 }}>
        <colgroup>
          <col style={{ width: "calc(15%)" }} />
          <col style={{ width: "calc(25%)" }} />
          <col style={{ width: "calc(40%)" }} />
          <col style={{ width: "calc(20%)" }} />
        </colgroup>
        <thead>
          <tr className="class m-0">
            <th>ID</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members?.map((member, index) => {
            return (
              <tr key={index} className="class m-0 pop-tr">
                <td>{member.userId}</td>
                <td>
                  <img
                    className="residual-item"
                    src={member.avatar}
                    alt={member.name}
                    style={{ borderRadius: "50%", width: 30, height: 30 }}
                  />
                </td>
                <td>{member.name}</td>
                <td>
                  <DeleteOutlined
                    style={{ fontSize: "20px" }}
                    onClick={() => {
                      dispatch(
                        actDeleteUserProject(
                          {
                            projectId: record.id,
                            userId: member.userId,
                          },
                          message
                        )
                      );
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const handleRenderMembers = (text, record) => {
    if (text.length > 0) {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar.Group
            maxCount={2}
            maxStyle={{ color: "#096dd9", backgroundColor: " #e6f7ff" }}
          >
            {text.map((member, index) => {
              return (
                <Popover key={index} content={() => content(text, record)}>
                  <Avatar className="avatar-member " key={member.userId}>
                    <img src={member.avatar} alt="" />
                  </Avatar>
                </Popover>
              );
            })}
          </Avatar.Group>
          <PopAssign record={record} />
        </div>
      );
    } else {
      return (
        <>
          <PopAssign record={record} />
        </>
      );
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "descend",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      render: (text, record) => {
        return <Link to={`/project-detail/${record.id}`}>{text}</Link>;
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      render: (text, record, index) => {
        return (
          <Tag
            color={userLogin?.id === record.creator.id ? "red" : "blue"}
            key={index}
          >
            {text.name.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: "Members",
      dataIndex: "members",
      render: handleRenderMembers,
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div className="table-action">
            <Button
              type="primary"
              onClick={() => {
                dispatch(
                  actGetProjectEdit(
                    record.id,
                    FormEditProject,
                    "Edit Project",
                    message
                  )
                );
              }}
              icon={<EditOutlined />}
            />

            <Popconfirm
              title="Are you sure to delete this project?"
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
  function confirm(record) {
    dispatch(actDeleteProject(record.id, message));
  }

  const onChange = (pagination, filters, sorter, extra) => {};

  let dataSearch = data ? [...data] : [];
  if (valueSearch && data) {
    dataSearch = data.filter((item) => {
      return (
        item.projectName.toLowerCase().indexOf(valueSearch.toLowerCase()) !== -1
      );
    });
  }
  if (loading) {
    return <Loader />;
  }
  return data ? (
    <Table
      columns={columns}
      dataSource={dataSearch}
      rowKey={(record) => record.id}
      onChange={onChange}
      key={"id"}
      bordered
      pagination={{
        position: ["none", "bottomCenter"],
        pageSize: 10,
        showSizeChanger: false,
      }}
    />
  ) : (
    <></>
  );
};

export default HomeTable;
