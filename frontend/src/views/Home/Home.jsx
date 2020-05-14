import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTicketsAction, fetchTicketsByUserAction } from "../../actions/ticketActions";
import { authServices } from "../../services/";

import TicketCard from "../../components/Ticket/TicketCard";
import TicketTable from "../../components/Ticket/TicketTable";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const getTickets = () => dispatch(fetchTicketsAction());
  const getTicketsByUser = (userId) => dispatch(fetchTicketsByUserAction(userId));

  useEffect(() => {
    if (!authServices.isAdmin()) {
      getTicketsByUser(user.id);
    } else {
      getTickets();
    }
  }, []);

  const renderByTypeUser = () => {
    if (!authServices.isAdmin()) {
      return <TicketCard tickets={tickets} getTicketsByUser={getTicketsByUser} />;
    } else {
      return <TicketTable tickets={tickets} getTickets={getTickets} />;
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
