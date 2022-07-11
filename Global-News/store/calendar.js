

import { createReducer, createAction } from "@reduxjs/toolkit";


export const startDay = createAction ("START")
export const endDay = createAction ("END")

const calendarReducer = createReducer({start:null, end:null}, {
  [startDay]: (state, action) =>{state.start = action.payload},
  [endDay]: (state, action) =>{state.end = action.payload}
});

export default calendarReducer;