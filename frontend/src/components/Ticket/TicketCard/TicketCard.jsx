import React, { Fragment } from "react";
import { Card, Col, Row } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

import "./style.css";
const TicketCard = ({ tickets, ...props }) => {
  return (
    <Fragment>
      {tickets.length > 0 ? (
        <Row gutter={[24, 24]}>
          <Col flex="auto" xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }}>
            <Card
              type="inner"
              title="Ticket N° 1"
              bordered={false}
              className="custom-card"
              width="auto"
              extra={<CloseCircleOutlined title="Cancelar ticket" style={{ color: "red" }} />}
            >
              <p>Miguelangel Palma</p>
            </Card>
          </Col>
        </Row>
      ) : (
        <h1>No Hay Tickets Disponibles</h1>
      )}
    </Fragment>
  );
};

export default TicketCard;
