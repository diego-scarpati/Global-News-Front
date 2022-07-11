import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const availabilityRequest = createAsyncThunk("AVAILABILITY_REQUEST", async (data)=>{
    try{
         const info = await axios.put("http://localhost:3001/api/availability/user", data)
         return info.data
    }catch(error){console.log(error)}
});


const availabilityReducer = createReducer({}, {
    [availabilityRequest.fulfilled]: (state,action)=>action.payload,
    [availabilityRequest.rejected]: (state,action)=>action.payload,
});


export default availabilityReducer