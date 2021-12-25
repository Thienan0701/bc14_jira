import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Breadcrumb, Input } from "antd";
import CheckboxMenu from "../CheckboxMenu/CheckboxMenu";

const Header = () => {
  const [valueSearch, setValueSearch] = useState("");
  const { data: detail } = useSelector((state) => state.projectDetailReducer);
  const onCheckboxChange = (selection) => {};
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
            className="input-search"
            onChange={(e) => {
              setValueSearch(e.target.value);
            }}
            suffix={<SearchOutlined />}
          />
          <div className="list-avatar-user">
            <div className="list-avatar-user-item">
              <img src="https://picsum.photos/40/40" alt="" />
            </div>
            <div className="list-avatar-user-item">
              <img src="https://picsum.photos/40/40" alt="" />
            </div>
            <div className="list-avatar-user-item">
              <img src="https://picsum.photos/40/40" alt="" />
            </div>
            <div className="list-avatar-user-item">
              <img src="https://picsum.photos/40/40" alt="" />
            </div>
            <div className="list-avatar-user-item">
              <div className="more-user">
                <span>+8</span>
              </div>
              <CheckboxMenu
                options={["Apple", "Pear", "Orange", "Apple1"]}
                onChange={onCheckboxChange}
                // name="Type"
              />
            </div>
          </div>
          <div>
            {" "}
            <Input.Group compact>
              <CheckboxMenu
                options={["Apple", "Pear", "Orange", "Apple1"]}
                onChange={onCheckboxChange}
                name="Type"
              />
            </Input.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
