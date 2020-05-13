"use strict";

/* Global Imports */
import { dbTicket } from "../db-api/";
import { Success, Error, objectIsEmpty } from "../util";
import Debug from "debug";

/* Config Vars */
const debug = new Debug("keiron-test-backend:controllers:ticket");

/* * * * * * * * * *  Controlller Functions * * * * * * * * * * * */

const getTickets = async (req, res) => {
  debug("getTickets");
  try {
    const tickets = await dbTicket.findAll();
    if (!tickets) return Error({ message: "Ticket not found", status: 404 }, res);
    Success(res, { data: tickets, model: "tickets" });
  } catch (error) {
    Error(error, res);
  }
};

const getTicket = async (req, res) => {
  debug("getTicket");
  try {
    const { id } = req.params;
    if (!id) {
      return Error("Bad Request", res, 400);
    }
    const ticket = await dbTicket.findById(id);
    if (!ticket) return Error({ message: "ticket not found", status: 404 }, res);
    Success(res, { data: ticket, model: "ticket" });
  } catch (error) {
    Error(error, res);
  }
};

const saveTicket = async (req, res) => {
  debug("saveTicket");
  try {
    const objectTicket = req.body;

    if (objectIsEmpty(objectTicket) || !objectTicket.userId) {
      return Error("Bad Request", res, 400);
    }

    const ticket = await dbTicket.create(objectTicket);
    Success(res, { data: ticket, model: "ticket" }, 201);
  } catch (error) {
    Error(error, res);
  }
};

const updateTicket = async (req, res) => {
  debug("updateTicket");
  try {
    const { id } = req.params;
    const objectTicket = req.body;
    if (objectIsEmpty(objectTicket) || !id) {
      return Error("Bad Request", res, 400);
    }
    const ticket = await dbTicket.update(id, objectTicket);
    if (!ticket) return Error({ message: "ticket not found", status: 404 }, res);
    Success(res, { data: ticket, model: "ticket" });
  } catch (error) {
    Error(error, res);
  }
};

const deleteTicket = async (req, res) => {
  debug("deleteTicket");
  try {
    const { id } = req.params;
    if (!id) {
      return Error("Bad Request", res, 400);
    }
    await dbTicket.delete(id);
    Success(res);
  } catch (error) {
    Error(error, res);
  }
};

const getTicketsByUser = async (req, res) => {
  debug("getTicketUser");
  try {
    const { id } = req.params;
    if (!id) {
      return Error("Bad Request", res, 400);
    }
    const ticketsByUser = await dbTicket.findTicketsByUser(id);
    if (!ticketsByUser) return Error({ message: "Tickets not found", status: 404 }, res);
    Success(res, { data: ticketsByUser, model: "ticketsByUser" });
  } catch (error) {
    Error(error, res);
  }
};

export default {
  saveTicket,
  getTickets,
  getTicket,
  getTicketsByUser,
  updateTicket,
  deleteTicket,
};
