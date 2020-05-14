import React, { Fragment } from "react";
import { Form, Input, InputNumber, Button, Select } from "antd";

const CustomForm = ({ formName, onFinish, onFinishFailed, items, loading, ...props }) => {
  const renderElementForm = (type, item) => {
    const obj = {
      text: <Input {...item} />,
      email: <Input {...item} />,
      password: <Input.Password {...item} />,
      number: <InputNumber {...item} />,
      textarea: <Input.TextArea {...item} />,
      button: (
        <Button loading={loading} {...item} type="primary">
          {item.text}
        </Button>
      ),
    };

    return obj[type];
  };

  return (
    <Fragment>
      <Form name={formName} onFinish={onFinish} onFinishFailed={onFinishFailed} className="login-form">
        {items.map((item, index) => (
          <Form.Item key={index} name={item["name"]} id={item.name} rules={item.rules}>
            {renderElementForm(item.type, item)}
          </Form.Item>
        ))}
        {props.children}
      </Form>
    </Fragment>
  );
};

export default CustomForm;
