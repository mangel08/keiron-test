import { FETCH_TICKETS, FETCH_TICKETS_USER, DELETE_TICKET, ADD_TICKET, UPDATE_TICKET } from "../types/ticket";
import { ticketServices } from "../services/";

export const fetchTicketsAction = () => async (dispatch) => {
  try {
    const response = await ticketServices.getTickets();
    dispatch({
      type: FETCH_TICKETS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchTicketsByUserAction = (userId) => async (dispatch) => {
  try {
    const response = await ticketServices.getTicketsByUser(userId);
    dispatch({
      type: FETCH_TICKETS_USER,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const saveTicketAction = (ticket) => async (dispatch) => {
  if (ticket) {
    await ticketServices.saveTicket(ticket);
    const response = await ticketServices.getTickets();
    dispatch({
      type: ADD_TICKET,
      payload: response.data,
    });
  }
};

export const updateTicketAction = (ticket) => async (dispatch) => {
  if (ticket) {
    await ticketServices.updateTicket(ticket);
    dispatch({
      type: UPDATE_TICKET,
      payload: ticket,
    });
  }
};

export const deleteTicketAction = (ticketId) => async (dispatch) => {
  if (ticketId) {
    try {
      await ticketServices.deleteTicket(ticketId);
      dispatch({
        type: DELETE_TICKET,
        payload: ticketId,
      });
    } catch (error) {
      console.error(error);
    }
  }
};
