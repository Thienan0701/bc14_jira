import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { actFetchListProject } from "./modules/actions";
import { Button } from "antd";
import HomeTable from "./Table";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";

import { Drawer, Form, Col, Row, Select, DatePicker, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  actOpenDrawerCommon,
  actOpenDrawerCommonFull,
} from "../../components/DrawerCommon/modules/actions";
import FormCreateProject from "./Forms/FormCreateProject/FormCreateProject";

const { Option } = Select;

function Home() {
  const dispatch = useDispatch();

  const [valueSearch, setValueSearch] = useState("");

  return (
    <div className="home">
      <div className="home-form">
        <Button
          type="primary"
          onClick={() =>
            dispatch(
              actOpenDrawerCommonFull({
                component: <FormCreateProject />,
                callback: () => {
                  alert("ok");
                },
                title: "Create Project",
              })
            )
          }
        >
          Create Project
        </Button>
        <Input
          className="input-search"
          placeholder="Enter your username"
          onChange={(e) => {
            setValueSearch(e.target.value);
          }}
          suffix={<SearchOutlined />}
        />
      </div>
      <div className="table-project">
        <HomeTable valueSearch={valueSearch} />
      </div>
    </div>
  );
}

export default Home;
