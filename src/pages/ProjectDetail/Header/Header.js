import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  AutoComplete,
  Breadcrumb,
  Button,
  Input,
  message,
  Popover,
} from "antd";
import CheckboxMenu from "../CheckboxMenu/CheckboxMenu";
import { useDispatch } from "react-redux";
import {
  actAssignUser,
  actGetPriority,
  actSearchUser,
} from "../modules/actions";
import { Tooltip } from "antd";

const Header = (props) => {
  const {
    data: details,
    dataPriority,
    listUserSearch,
  } = useSelector((state) => state.projectDetailReducer);

  const [isDelete, setIsDelete] = useState(false);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState("");

  const [detail, setDetail] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setDetail(details);
  }, [details]);

  useEffect(() => {
    dispatch(actGetPriority());
  }, []);

  const {
    arrUserFilter,
    arrPriorityFilter,
    arrUserFilterCheckbox,
    arrUserFilterFirst,
    setArrUserFilter,
    setArrUserFilterCheckbox,
    setArrUserFilterFirst,
    setArrPriorityFilter,
    valueSearch,
    setValueSearch,
  } = props;

  const onCheckboxChange = (selection) => {
    const listUserId = selection.reduce(
      (total, item) => [...total, item.userId],
      []
    );
    setArrUserFilterCheckbox(listUserId);
    setArrUserFilter([...arrUserFilterFirst, ...listUserId]);
  };

  const handleClickAvatarFirst = (itemUser) => {
    if (arrUserFilterFirst.length) {
      const index = arrUserFilterFirst.findIndex((item) => {
        return item === itemUser.userId;
      });

      if (index === -1) {
        const listUserIdFirst = [...arrUserFilterFirst, itemUser.userId];
        setArrUserFilterFirst(listUserIdFirst);
        setArrUserFilter([...listUserIdFirst, ...arrUserFilterCheckbox]);
      } else {
        const arrUserFilterFirstTemp = [...arrUserFilterFirst];
        arrUserFilterFirstTemp.splice(index, 1);
        setArrUserFilterFirst([...arrUserFilterFirstTemp]);
        setArrUserFilter([...arrUserFilterFirstTemp, ...arrUserFilterCheckbox]);
      }
    } else {
      setArrUserFilterFirst([itemUser.userId]);
      setArrUserFilter([itemUser.userId, ...arrUserFilterCheckbox]);
    }
  };

  const onChangeCheckboxPriority = (selection) => {
    const priorityId = selection.reduce(
      (total, item) => [...total, item.priorityId],
      []
    );
    setArrPriorityFilter(priorityId);
  };

  const handleAssignProject = (values) => {
    const prevDetail = { ...detail };
    const userAssign = listUserSearch.find(
      (item) => item.userId === +values.value
    );
    const listMember = [...detail?.members, userAssign];
    const info = {
      projectId: +props.match.params.id,
      userId: +values.value,
    };
    setDetail({
      ...detail,
      members: listMember,
    });
    dispatch(
      actAssignUser(
        info,
        +props.match.params.id,
        prevDetail,
        setDetail,
        props.history,
        message
      )
    );
  };

  const handleGetListOptions = () => {
    const listIdMember = detail?.members.map((item) => item.userId);
    const listFilter = listUserSearch?.filter(
      (opts) => !listIdMember?.includes(opts.userId)
    );
    return listFilter?.map((item) => ({
      label: item.name,
      value: item.userId.toString(),
    }));
  };

  const handleVisibleChange = (visible) => {
    setValue("");
    setVisible(visible);
  };

  return (
    <div className="project-header">
      <div className="project-header-content">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Project</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{detail?.projectName}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="box-input">
          <Input
            onFocus={() => {
              document.querySelector(".input-search").style.width = "200px";
            }}
            className="input-search"
            onChange={(e) => {
              setValueSearch(e.target.value);
            }}
            onBlur={() => {
              if (!valueSearch) {
                document.querySelector(".input-search").style.width = "120px";
              }
            }}
            suffix={<SearchOutlined />}
          />
          <div className="list-avatar-user">
            {detail?.members?.slice(0, 4).map((item, index) => {
              const active = arrUserFilter.includes(item.userId)
                ? "active"
                : "";
              return (
                <div key={index} className="list-avatar-user-item">
                  <Tooltip placement="top" title={item.name}>
                    <img
                      onClick={() => {
                        handleClickAvatarFirst(item);
                      }}
                      src={item.avatar}
                      alt={item.name}
                      className={`img-avatar ${active}`}
                    />
                  </Tooltip>
                </div>
              );
            })}

            <div className="list-avatar-user-item">
              {detail?.members.length - 4 > 0 ? (
                <CheckboxMenu
                  setSelectedItems={setArrUserFilterCheckbox}
                  selectedItems={arrUserFilterCheckbox}
                  isDelete={isDelete}
                  setIsDelete={setIsDelete}
                  options={detail?.members?.slice(4).map((item, index) => {
                    const active = arrUserFilter.includes(item.userId)
                      ? "active"
                      : "";

                    return {
                      view: (
                        <div className="member-options" key={index}>
                          <img
                            src={item.avatar}
                            alt=""
                            className={`${active}`}
                          />
                          {item.name}
                        </div>
                      ),
                      item,
                    };
                  })}
                  onChange={onCheckboxChange}
                  name={
                    <div
                      className={`more-user ${
                        arrUserFilterCheckbox.length ? "active" : ""
                      }`}
                    >
                      <span>+{detail?.members.length - 4}</span>
                    </div>
                  }
                />
              ) : (
                ""
              )}{" "}
              <div className={`more-user`}>
                <Popover
                  content={() => (
                    <AutoComplete
                      options={handleGetListOptions()}
                      value={value}
                      className="w-100"
                      onChange={(txt) => {
                        setValue(txt);
                        dispatch(actSearchUser(txt));
                      }}
                      onSelect={(option, values) => {
                        setValue(values.label);
                        setVisible(!visible);

                        // dispatch(handleAssignProject);
                        handleAssignProject(values);

                        setValue("");
                      }}
                      onFocus={() => {
                        dispatch(actSearchUser(value));
                      }}
                      onSearch={(value) => {
                        dispatch(actSearchUser(value));
                      }}
                    />
                  )}
                  title="Add member"
                  trigger="click"
                  visible={visible}
                  onVisibleChange={handleVisibleChange}
                >
                  <Button shape="circle" icon={<UserAddOutlined />} />
                </Popover>
              </div>
            </div>
          </div>
          <div className="btn-wrapper-header">
            <div className="create-task">
              <Input.Group compact>
                <CheckboxMenu
                  setSelectedItems={setArrPriorityFilter}
                  selectedItems={arrPriorityFilter}
                  isDelete={isDelete}
                  setIsDelete={setIsDelete}
                  options={dataPriority?.map((item) => {
                    return {
                      item,
                      view: item.priority,
                    };
                  })}
                  onChange={onChangeCheckboxPriority}
                  name={
                    <button
                      className={`btn-create-task priority ${
                        arrPriorityFilter.length ? "active" : ""
                      }`}
                    >
                      <span>
                        Priority
                        {arrPriorityFilter.length ? (
                          <span className="total-item">
                            {arrPriorityFilter.length}
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </button>
                  }
                />
              </Input.Group>
            </div>
            <div className="create-task">
              <button
                className="btn-create-task"
                onClick={() => {
                  props.setIsOpen(true);
                }}
              >
                <span>Create</span>
              </button>
            </div>
            {arrPriorityFilter?.length || arrUserFilter?.length ? (
              <div className="create-task">
                <button
                  onClick={() => {
                    setIsDelete(true);
                    setArrUserFilter([]);
                    setArrUserFilterCheckbox([]);
                    setArrUserFilterFirst([]);
                    setArrPriorityFilter([]);
                  }}
                  className="btn-create-task priority"
                >
                  <span>Clear filters</span>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
