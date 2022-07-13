import { createReducer, createAction } from "@reduxjs/toolkit";
import { orderDate } from "../utils/getDate"

export const startDay = createAction ("START")
export const endDay = createAction ("END")

const calendarReducer = createReducer({start:null, end:null}, {
  [startDay]: (state, action) =>{state.start = orderDate(action.payload)},
  [endDay]: (state, action) =>{state.end = orderDate(action.payload)}
});

export default calendarReducer;