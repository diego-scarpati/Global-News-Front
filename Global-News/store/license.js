import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLicenseRequest = createAsyncThunk("LICENSE", async (data)=>{
    try{
        console.log("data store", data)
        const licencia = await axios.post("http://localhost:3001/api/workLicenses/addLicense", data)
        return licencia.data
    }catch(error){console.log(error)}
});

const licenseReducer = createReducer({}, {
    [sendLicenseRequest.fulfilled]: (state,action)=>action.payload,
    [sendLicenseRequest.rejected]: (state,action)=>action.payload,
});

export default licenseReducer