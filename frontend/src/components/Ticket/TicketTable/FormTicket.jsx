import React, { useState, useEffect } from "react";
import { Modal, Form, Select, message } from "antd";
import { userServices, ticketServices } from "../../../services";

const FormTicket = ({ visible, setVisible, getTickets, ticket, action, setTicketSelected, setAction }) => {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    getUsers();
    return () => {
      setUsers([]);
    };
  }, []);

  useEffect(() => {
    form.setFieldsValue({
      userId: ticket ? ticket.user.id : null,
    });
  }, [ticket]);

  const getUsers = async () => {
    try {
      const response = await userServices.getUsersWithType();
      setUsers(response.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        if (action === "edit") {
          const objTicket = {
            ...ticket,
            userId: values.userId,
          };
          await ticketServices.updateTicket(objTicket);
        } else {
          await ticketServices.saveTicket(values);
        }
        form.resetFields();
        setVisible(false);
        message.success(`Ticket ${action === "edit" ? "editado" : "creado"} exitosamente`);
        await getTickets();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setVisible(false);
    setTicketSelected(null);
    setAction(null);
  };

  return (
    <div>
      <Modal
        title={`${action === "edit" ? "Crear" : "Editar"} Ticket`}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            userId: ticket ? ticket.user.id : null,
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

export default FormTicket;
