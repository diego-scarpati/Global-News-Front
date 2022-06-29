import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLicenseRequest = createAsyncThunk("LICENSE", async (data)=>{
    try{
         const {info,license} = data
        console.log(info,license) 
        const licencia = await axios.post("http://localhost:3001/api/workLicenses/addLicense", info,license)
        console.log(licencia)
        //return licencia.data
    }catch(error){console.log(error)}
});

const licenseReducer = createReducer({}, {
    [sendLicenseRequest.fulfilled]: (state,action)=>action.payload,
    [sendLicenseRequest.rejected]: (state,action)=>action.payload,
});

export default licenseReducer