import React, { useState, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Table, Tag, Space, Button, message, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketsAction, deleteTicketAction } from "../../../actions/ticketActions";

import FormTicket from "./FormTicket";
import ViewTicket from "./ViewTicket";
import "./style.css";

const TicketTable = ({ ...props }) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const getTickets = () => dispatch(fetchTicketsAction());
  const deleteTicket = (ticketId) => dispatch(deleteTicketAction(ticketId));
  const [visibleFormTicket, setVisibleFormTicket] = useState(false);
  const [visibleViewTicket, setVisibleViewTicket] = useState(false);
  const [ticketSelected, setTicketSelected] = useState(null);
  const [action, setAction] = useState(null);

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
      render: (item, record) => (
        <Fragment>
          <Tag key={record.id} color={item ? "green" : "volcano"}>
            {item ? "Ticket Solicitado" : "Ticket sin solicitar"}
          </Tag>
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
      dataIndex: "id",
      render: (id, record) => (
        <Space size="middle">
          <EyeOutlined onClick={() => viewTicket(record)} title="Ver" style={{ color: "green", cursor: "pointer" }} />
          <EditOutlined
            onClick={() => handleTicketForm("edit", record)}
            title="Editar"
            style={{ color: "orange", cursor: "pointer" }}
          />
          <Popconfirm
            placement="topLeft"
            title={"¿Estás seguro que deseas eliminar este ticket?"}
            onConfirm={() => handleDeleteTicket(id)}
            okText="OK"
            cancelText="Cancelar"
          >
            <DeleteOutlined title="Eliminar" style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const viewTicket = async (ticket) => {
    console.log(ticket);
    setTicketSelected(ticket);
    setVisibleViewTicket(true);
  };

  const handleCancelViewTicket = () => {
    setTicketSelected(null);
    setVisibleViewTicket(false);
  };

  const handleTicketForm = (action, ticket) => {
    console.log(action);
    console.log(ticket);
    if (ticket) setTicketSelected(ticket);
    setAction(action);
    setVisibleFormTicket(true);
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      await deleteTicket(ticketId);
      message.success("Ticket eliminado exitosamente");
      // await getTickets();
    } catch (error) {
      message.error("Ha ocurrido un error, intente nuevamente");
      console.error(error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Button
        type="primary"
        shape="round"
        onClick={() => handleTicketForm("create", null)}
        icon={<PlusOutlined style={{ color: "#FFF" }} />}
      >
        Agregar Ticket
      </Button>
      <Table rowKey="id" columns={columns} dataSource={tickets} />

      <FormTicket
        visible={visibleFormTicket}
        setVisible={setVisibleFormTicket}
        getTickets={getTickets}
        ticket={ticketSelected}
        action={action}
        setTicketSelected={setTicketSelected}
        setAction={setAction}
      />
      <ViewTicket ticket={ticketSelected} visible={visibleViewTicket} handleCancel={handleCancelViewTicket} />
    </div>
  );
};

export default withRouter(TicketTable);
