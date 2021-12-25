import React, { useState } from "react";
import {
  Drawer,
  Form,
  Col,
  Row,
  Select,
  DatePicker,
  Space,
  Button,
  Input,
} from "antd";
import { useSelector } from "react-redux";
import { actCloseDrawerCommon } from "./modules/actions";
import { useDispatch } from "react-redux";
const DrawerCommon = () => {
  const { open, callbackClose, callBackSubmit, ComponentContentDrawer, title } =
    useSelector((state) => state.drawerCommonReducer);
  const dispatch = useDispatch();
  return (
    <div>
      <Drawer
        title={<h4 style={{ margin: 0 }}>{title}</h4>}
        width={720}
        onClose={() => dispatch(callbackClose)}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
        // footer={
        //   <div style={{ textAlign: "right" }}>
        //     <Space>
        //       <Button onClick={() => dispatch(actCloseDrawerCommon())}>
        //         Cancel
        //       </Button>
        //       <Button onClick={callBackSubmit} type="primary">
        //         Submit
        //       </Button>
        //     </Space>
        //   </div>
        // }
      >
        {ComponentContentDrawer}
      </Drawer>
    </div>
  );
};

export default DrawerCommon;
