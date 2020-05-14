import React, { Fragment } from "react";
import { Modal, Tag } from "antd";

const ViewTicket = ({ ticket, visible, handleCancel }) => {
  return (
    <div>
      <Modal
        title={`Ticket N° ${ticket ? ticket.id : null}`}
        footer={null}
        onOk={null}
        visible={visible}
        onCancel={handleCancel}
      >
        {ticket ? (
          <Fragment>
            <p>
              <b>Estatus:</b>{" "}
              <Tag color={ticket.requested_ticket ? "green" : "red"}>
                {ticket.requested_ticket ? "Solicitado" : "Sin solicitar"}
              </Tag>
            </p>
            <p>
              <b>Email: </b>
              {ticket.user.name}
            </p>
            <p>
              <b>Correo: </b>
              {ticket.user.email}
            </p>
          </Fragment>
        ) : null}
      </Modal>
    </div>
  );
};

export default ViewTicket;
