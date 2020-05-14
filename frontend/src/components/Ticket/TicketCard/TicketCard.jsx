import React, { Fragment, useState } from "react";
import { Card, Col, Row, Tag, message } from "antd";
import { useDispatch } from "react-redux";
import { updateTicketAction } from "../../../actions/ticketActions";

import "./style.css";
const TicketCard = ({ tickets, getTicketsByUser, ...props }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const updateTicket = (ticket) => dispatch(updateTicketAction(ticket));

  const changeTicketStatus = async (ticket) => {
    try {
      await updateTicket({ ...ticket, requested_ticket: !ticket.requested_ticket });
    } catch (error) {
      message.error("Ha ocurrido un error intente nuevamente");
      console.error(error);
    }
  };
  return (
    <Fragment>
      {tickets.length > 0 ? (
        <Row gutter={[24, 24]}>
          {tickets.map((ticket) => (
            <Col key={ticket.id} flex="auto" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
              <Card
                key={ticket.id}
                type="inner"
                title={`Ticket N° ${ticket.id}`}
                bordered={false}
                className="custom-card"
                width="auto"
                extra={
                  ticket.requested_ticket === false ? (
                    <Tag color="green" onClick={() => changeTicketStatus(ticket)} style={{ cursor: "pointer" }}>
                      Solicitar
                    </Tag>
                  ) : (
                    <Tag color="red" onClick={() => changeTicketStatus(ticket)} style={{ cursor: "pointer" }}>
                      Denegar
                    </Tag>
                  )
                }
              >
                <p>{ticket.user.name}</p>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <h1>No Hay Tickets Disponibles</h1>
      )}
    </Fragment>
  );
};

export default TicketCard;
