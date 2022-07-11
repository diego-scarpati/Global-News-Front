import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const attendaceStartRequest = createAsyncThunk("ATTENDANCE_START_REQUEST", async (data)=>{
    try{
          const info = await axios.post("http://localhost:3001/api/attendance/workDayStart", data)
          return info.data
    }catch(error){console.log(error)}
});

export const attendaceEndRequest = createAsyncThunk("ATTENDANCE_END_REQUEST", async (data)=>{
    try{
          const info = await axios.put("http://localhost:3001/api/attendance/workDayEnd", data)
          return info.data
    }catch(error){console.log(error)}
});

export const attendaceControl = createAsyncThunk("ATTENDANCE_CONTROL", async (data)=>{
    try{
          const info = await axios.get(`http://localhost:3001/api/attendance/search/${data.id}`)
          return info.data
    }catch(error){console.log(error)}
});


const attendanceReducer = createReducer({}, {
    [attendaceStartRequest.fulfilled]: (state,action)=>action.payload,
    [attendaceStartRequest.rejected]: (state,action)=>action.payload,

    [attendaceEndRequest.fulfilled]: (state,action)=>action.payload,
    [attendaceEndRequest.rejected]: (state,action)=>action.payload,

    [attendaceControl.fulfilled]: (state,action)=>action.payload,
    [attendaceControl.rejected]: (state,action)=>action.payload,
});

export default attendanceReducer
