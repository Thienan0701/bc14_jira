import React, { useEffect, useState } from "react";

import "./style.scss";
import Header from "./Header/Header";
import Content from "./Content/Content";
import ModalUpdateTask from "./ModalUpdateTask/ModalUpdateTask";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { actGetDetailProject } from "./modules/actions";
import { message } from "antd";
import Loading from "../../components/Loading";
function ProjectDetail(props) {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, data } = useSelector((state) => state.projectDetailReducer);
  const [listTask, setListTask] = useState();

  // setup filter
  const [arrUserFilter, setArrUserFilter] = useState([]);
  const [arrUserFilterCheckbox, setArrUserFilterCheckbox] = useState([]);
  const [arrUserFilterFirst, setArrUserFilterFirst] = useState([]);
  const [arrPriorityFilter, setArrPriorityFilter] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [isLoadFirst, setIsLoadFirst] = useState(true);

  const dispatch = useDispatch();

  const { id } = props.match.params;
  useEffect(() => {
    dispatch(actGetDetailProject(id, props.history, message, true));
  }, [id]);

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
    <>
      <div className="project-detail">
        <Header
          arrUserFilter={arrUserFilter}
          setArrUserFilter={setArrUserFilter}
          arrUserFilterCheckbox={arrUserFilterCheckbox}
          setArrUserFilterCheckbox={setArrUserFilterCheckbox}
          arrUserFilterFirst={arrUserFilterFirst}
          setArrUserFilterFirst={setArrUserFilterFirst}
          arrPriorityFilter={arrPriorityFilter}
          setArrPriorityFilter={setArrPriorityFilter}
          valueSearch={valueSearch}
          setValueSearch={setValueSearch}
          {...props}
        />
        <Content
          arrUserFilter={arrUserFilter}
          arrPriorityFilter={arrPriorityFilter}
          valueSearch={valueSearch}
          setListTask={setListTask}
          listTask={listTask}
          {...props}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <ModalUpdateTask {...props} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default ProjectDetail;
