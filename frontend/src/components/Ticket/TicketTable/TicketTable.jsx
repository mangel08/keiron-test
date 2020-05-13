import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Table, Tag, Space, Button, Modal, Form, Select } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { userServices } from "../../../services";

import "./style.css";

const TicketTable = ({ getTickets, setTickets, tickets, ...props }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState([]);
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);

  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    getUsers();
    return () => {
      setUsers([]);
    };
  }, []);

  const columns = [
    {
      title: "Nº Ticket",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Estatus Ticket",
      key: "requested_ticket",
      dataIndex: "requested_ticket",
      render: (item) => (
        <Fragment>
          <Tag color={item ? "green" : "volcano"}>{item ? "Ticket Solicitado" : "Ticket sin solicitar"}</Tag>
        </Fragment>
      ),
    },
    {
      title: "Usuario asignado",
      dataIndex: "user",
      key: "user",
      render: (user) => <span>{user.name}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Ver Ticket </a>
          <a>Editar Ticket</a>
          <a>Eliminar Ticket </a>
        </Space>
      ),
    },
  ];

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const getUsers = async () => {
    try {
      const response = await userServices.getUsersWithType();
      console.log(response);
      setUsers(response.users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Button
        type="primary"
        shape="round"
        onClick={() => setVisible(true)}
        icon={<PlusOutlined style={{ color: "#FFF" }} />}
      >
        Agregar Ticket
      </Button>
      <Table columns={columns} dataSource={tickets} />

      <Modal title="Agregar Ticket" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="userId"
            label="Usuario"
            rules={[
              {
                required: true,
                message: "Por favor elija un usuario",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Selecciona un usuario"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {users.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default withRouter(TicketTable);
