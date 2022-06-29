import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLicenseRequest = createAsyncThunk("LICENSE", async (data)=>{
    try{
        console.log(data)
        const info = await axios.post("http://localhost:3001/api/workLicenses/addLicense", data)
        return info.data
    }catch(error){console.log(error)}
});

const licenseReducer = createReducer([], {
    [sendLicenseRequest.fulfilled]: (state,action)=>{
        const newState = [...state, action.payload]
        return newState // chequear si esto agrega al array de licencias.
    },
    [sendLicenseRequest.rejected]: (state,action)=>action.payload,
});

export default licenseReducer