import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const itemsForm = [
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
    prefix: <MailOutlined className="site-form-item-icon" />,
    rules: [{ required: true, message: "Ingresa tu Email" }],
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Contraseña",
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [{ required: true, message: "Ingresa tu Contraseña!" }],
  },
  {
    id: "btn-login",
    text: "Iniciar Sesión",
    type: "button",
    htmlType: "submit",
    className: "btn-primary",
    block: "block",
    rules: [],
  },
];

export default itemsForm;
