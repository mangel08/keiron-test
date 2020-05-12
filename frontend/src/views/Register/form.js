import React from 'react'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const itemsForm = [
  {
    id: "name",
    name: "name",
    type: "text",
    placeholder: "Nombre",
    prefix: (<UserOutlined className="site-form-item-icon" />),
    rules: [{ required: true, message: 'Ingresa tu nombre' }]
  },
  {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
    prefix: (<MailOutlined className="site-form-item-icon" />),
    rules: [{ required: true, message: 'Ingresa tu Email' }]
  },
  {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "Contraseña",
    prefix: (<LockOutlined className="site-form-item-icon" />),
    rules: [{ required: true, message: 'Ingresa tu contraseña' }]
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
