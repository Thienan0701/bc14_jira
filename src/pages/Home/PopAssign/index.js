import React, { useState } from "react";
import { AutoComplete, Button, message, Popover } from "antd";
import { useSelector } from "react-redux";
import { UserAddOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { actAsignUserProject, actSearchUser } from "../modules/actions";

const PopAssign = (props) => {
  const { record } = props;

  const dispatch = useDispatch();
  const [state, setState] = useState({
    visible: false,
  });

  const searchData = useSelector((state) => state.homeReducer.searchdata);

  const [value, setValue] = useState("");

  const handleVisibleChange = (visible) => {
    setValue("");
    setState({ visible });
  };

  let recordMembers = record.members.map((member) => member.userId);

  let searDataTemp = searchData ? [...searchData] : [];
  if (recordMembers.length) {
    searDataTemp = searDataTemp.filter(
      (item) => !recordMembers.includes(item.userId)
    );
  }

  return (
    <Popover
      content={() => (
        <AutoComplete
          options={searDataTemp?.map((opts) => {
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
                message
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
