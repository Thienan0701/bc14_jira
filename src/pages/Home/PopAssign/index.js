import React, { useState } from "react";
import { AutoComplete, Button, Popover } from "antd";
import { useSelector } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { actAsignUserProject, actSearchUser } from "../modules/actions";
import Swal from "sweetalert2";

const PopAssign = (props) => {
  const { record } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    visible: false,
  });

  const searchData = useSelector((state) => state.homeReducer.searchdata);

  const [value, setValue] = useState("");

  //The hien cac loi, ket qua cua action add,remove user project
  // const asignResult = useSelector((state) => state.homeReducer.asignResult);

  const handleVisibleChange = (visible) => {
    setValue("");
    setState({ visible });
  };
  return (
    <Popover
      content={() => (
        <AutoComplete
          options={searchData?.map((opts) => {
            return {
              label: opts.name,
              value: opts.userId.toString(),
            };
          })}
          value={value}
          className="w-100"
          onChange={(txt) => {
            setValue(txt);
            dispatch(actSearchUser(txt));
          }}
          onSelect={(option, values) => {
            //set lai gia tri hop thoai
            setValue(values.label);
            setState({ visible: !state.visible });

            dispatch(
              actAsignUserProject(
                {
                  projectId: record.id,
                  userId: option,
                },
                Swal
              )
            );
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
      visible={state.visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button shape="circle" icon={<UserAddOutlined />} />
    </Popover>
  );
};

export default PopAssign;
