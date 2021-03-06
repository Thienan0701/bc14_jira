import React from "react";

import { Checkbox, Popover, Row, Col } from "antd";
// import { DownOutlined } from "@ant-design/icons";

class CheckboxMenu extends React.Component {
  state = {
    icon: {},
    selectedItems: [],
  };

  componentDidMount = () => {
    if (this.props.value && this.props.value.length) {
      this.setState(
        {
          selectedItems: [...this.props.value],
        },
        () => this.checkIconFilled()
      );
    }
  };

  static getDerivedStateFromProps = (props) => {
    if (props.isDelete) {
      props.setIsDelete(false);
      return { ...this.state, selectedItems: [] };
    }
    return null;
  };

  onChange = (selection) => {
    this.setState({ selectedItems: [...selection] }, () => {
      this.checkIconFilled();
    });

    return this.props.onChange(selection);
  };

  checkIconFilled = () => {
    if (this.state.selectedItems.length) {
      this.setState({ icon: { theme: "filled" } });
    } else {
      this.setState({ icon: {} });
    }
  };

  checkboxRender = () => {
    const _this = this;

    const groups = this.props.options
      .map(function (e, i) {
        return i % 10 === 0 ? _this.props.options.slice(i, i + 10) : null;
      })
      .filter(function (e) {
        return e;
      });

    return (
      <Checkbox.Group onChange={this.onChange} value={this.state.selectedItems}>
        <Row>
          {groups.map((group, i) => {
            return (
              <Col
                key={"checkbox-group-" + i}
                span={Math.floor(24 / groups.length)}
              >
                {group.map((label, i) => {
                  return (
                    <Checkbox
                      key={i}
                      value={label.item}
                      className="check-box-item"
                    >
                      {label.view}
                    </Checkbox>
                  );
                })}
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    );
  };

  render() {
    const CheckboxRender = this.checkboxRender;
    return (
      <Popover
        content={<CheckboxRender />}
        trigger="click"
        placement="bottomLeft"
      >
        {this.props.name}
      </Popover>
    );
  }
}

export default CheckboxMenu;
