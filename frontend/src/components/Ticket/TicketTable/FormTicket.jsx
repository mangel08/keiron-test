import React, { useState, useEffect } from "react";
import { Modal, Form, Select, message } from "antd";
import { useDispatch } from "react-redux";
import { saveTicketAction, updateTicketAction } from "../../../actions/ticketActions";
import { userServices } from "../../../services";

const FormTicket = ({ visible, setVisible, getTickets, ticket, action, setTicketSelected, setAction }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const saveTicket = (ticket) => dispatch(saveTicketAction(ticket));
  const updateTicket = (ticket) => dispatch(updateTicketAction(ticket));
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
      setUsers(response.data);
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
          await updateTicket(objTicket);
        } else {
          await saveTicket(values);
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
