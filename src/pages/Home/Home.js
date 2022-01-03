import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import HomeTable from "./Table";
import { Input } from "antd";
import {
  FileAddOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { actOpenDrawerCommonFull } from "../../components/DrawerCommon/modules/actions";
import FormCreateProject from "./Forms/FormCreateProject/FormCreateProject";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import { actFetchListProject } from "./modules/actions";

function Home(props) {
  const dispatch = useDispatch();
  const { isOpen, setIsOpen } = props;
  const [valueSearch, setValueSearch] = useState("");
  const [isLoadFirst, setIsLoadFirst] = useState(true);
  useEffect(() => {
    dispatch(actFetchListProject());
  }, [dispatch]);

  const { loading, data } = useSelector((state) => state.homeReducer);
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
    <div className="home">
      <div className="box-button">
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
          <p>Create Project</p>
          <FileAddOutlined className="btn-icon" />
        </Button>
        <Button type="primary" onClick={() => setIsOpen(true)}>
          <p>Create Task</p> <PlusOutlined className="btn-icon" />
        </Button>
      </div>
      <div className="home-form">
        <Input
          className="input-search"
          placeholder="Enter your project"
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
