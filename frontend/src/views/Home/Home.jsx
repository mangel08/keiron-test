import React, { useEffect, useState } from "react";
import { message } from "antd";
import { withRouter } from "react-router-dom";
import TicketCard from "../../components/Ticket/TicketCard";
import TicketTable from "../../components/Ticket/TicketTable";
import { ticketServices, authServices } from "../../services/";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTicketsByUsername = async () => {
    try {
      const response = await ticketServices.getTicketsByUser(user.id);
    } catch (error) {
      console.error(error);
    }
  };

  const getTickets = async () => {
    try {
      const response = await ticketServices.getTickets();
      if (response.status) {
        setTickets(response.tickets);
      }
    } catch (error) {
      console.log(error);
      message.error("Ha ocurrido un error.");
    }
  };

  useEffect(() => {
    if (!authServices.isAdmin()) {
      getTicketsByUsername();
    } else {
      getTickets();
    }
    return () => {
      setTickets([]);
    };
  }, []);

  const renderByTypeUser = () => {
    if (!authServices.isAdmin()) {
      return <TicketCard tickets={tickets} />;
    } else {
      return <TicketTable getTickets={getTickets} tickets={tickets} setTickets={setTickets} />;
    }
  };

  return (
    <div>
      <h1>Bienvenido {user.name} </h1>
      {renderByTypeUser()}
    </div>
  );
};

export default withRouter(Home);
