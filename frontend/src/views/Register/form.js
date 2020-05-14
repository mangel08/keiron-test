import React from "react";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const itemsForm = [
  {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Nombre",
    prefix: <UserOutlined className="site-form-item-icon" />,
    rules: [{ required: true, message: "Ingresa tu nombre" }],
  },
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
    rules: [{ required: true, message: "Ingresa tu contraseña" }],
  },
  {
    id: "password2",
    name: "password2",
    type: "password",
    placeholder: "Confirmar contraseña",
    dependencies: ["password"],
    hasFeedback: true,
    prefix: <LockOutlined className="site-form-item-icon" />,
    rules: [
      {
        required: true,
        message: "Ingresa de nuevo tu contraseña!",
      },
      ({ getFieldValue }) => ({
        validator(rule, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }

          return Promise.reject("Las contraseñas no coinciden!");
        },
      }),
    ],
  },
  {
    id: "btn-register",
    text: "Registrate",
    type: "button",
    htmlType: "submit",
    className: "btn-primary",
    block: "block",
    rules: [],
  },
];

export default itemsForm;
