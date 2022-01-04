import React from "react";
import { Drawer } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
const DrawerCommon = () => {
  const { open, callbackClose, ComponentContentDrawer, title } = useSelector(
    (state) => state.drawerCommonReducer
  );
  const dispatch = useDispatch();
  return (
    <div>
      <Drawer
        title={<h4 style={{ margin: 0 }}>{title}</h4>}
        width={720}
        onClose={() => dispatch(callbackClose)}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {ComponentContentDrawer}
      </Drawer>
    </div>
  );
};

export default DrawerCommon;
