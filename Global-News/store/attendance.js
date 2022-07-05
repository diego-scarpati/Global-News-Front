import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const attendanceRequest = createAsyncThunk("ATTENDANCE", async (data)=>{
    try{
        const info = await axios.post("http://localhost:3001/api/users/register", data)
return info.data
    }catch(error){console.log(error)}
});


const attendanceReducer = createReducer({}, {
    [attendanceRequest.fulfilled]: (state,action)=>{action.payload},
    [attendanceRequest.rejected]: (state,action)=>action.payload,
});

export default attendanceReducer