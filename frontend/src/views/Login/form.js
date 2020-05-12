import React from 'react'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const itemsForm = [
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
    prefix: (<MailOutlined className="site-form-item-icon" />),
    rules: [{ required: true, message: 'Please input your Email!' }]
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Password",
    prefix: (<LockOutlined className="site-form-item-icon" />),
    rules: [{ required: true, message: 'Please input your Password!' }]
  },
  {
    id:"btn-login",
    text: "Login",
    type: "button",
    htmlType: "submit",
    className: "btn-primary",
    block: "block",
    rules: []
  },
];

export default itemsForm;
