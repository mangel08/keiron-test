import { FETCH_TICKETS, FETCH_TICKETS_USER, ADD_TICKET, DELETE_TICKET, UPDATE_TICKET } from "../types/ticket";

const initialState = {
  tickets: [],
  ticket: null,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TICKETS:
      return {
        ...state,
        tickets: [...payload],
      };
    case FETCH_TICKETS_USER:
      return {
        ...state,
        tickets: [...payload],
      };
    case ADD_TICKET:
      return {
        ...state,
        tickets: [...payload],
      };
    case UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((item) => {
          if (item.id !== payload.id) {
            return item;
          }
          return { ...item, ...payload };
        }),
      };
    case DELETE_TICKET:
      console.log(state);
      return {
        ...state,
        tickets: [...state.tickets.filter((item) => item.id !== payload)],
      };
    default:
      return state;
  }
};

export default userReducer;
