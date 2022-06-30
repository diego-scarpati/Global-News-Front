// import axios from "axios";
// import { createReducer, createAction } from "@reduxjs/toolkit";

// export const setStart = createAction ("START")
// export const setEnd = createAction ("END")

// const dayReducer = createReducer({start:null, end:null}, {
//     [setStart]: (state,action)=>({...state,start: action.payload}),
//     [setEnd]:   (state,action)=>({...state,end: action.payload})
    
// });
// export default dayReducer

import { createReducer, createAction } from "@reduxjs/toolkit";

// export const selectDay = createAction("SELECT_DAY");
export const startDay = createAction ("START")
export const endDay = createAction ("END")

const calendarReducer = createReducer({start:null, end:null}, {
  // [selectDay]: (state, action) =>{ state.push(action.payload)},
  [startDay]: (state, action) =>{state.start = action.payload},
  [endDay]: (state, action) =>{state.end = action.payload}
});

export default calendarReducer;