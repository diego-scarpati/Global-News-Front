import axios from "axios";
import { createReducer, createAsyncThunk, } from "@reduxjs/toolkit";

export const sendLicenseRequest = createAsyncThunk("LICENSE", async (data, thunkAPI)=>{
    const { user } = thunkAPI.getState();
    const info = {data, user}
    try{
        const licencia = await axios.post("http://localhost:3001/api/workLicenses/addLicense", {info} )
        return licencia.data
    }catch(error){console.log(error)}
});

export const rrhhReviewLicense = createAsyncThunk("RRHH_REVIEW_LICENCE", async ()=> {
    try{
        const licences = await axios.get("http://localhost:3001/api/workLicenses/")
        console.log("licencias data", licences.data)
        return licences.data
    }catch(error){console.log(error)}
})

const licenseReducer = createReducer({}, {
    [sendLicenseRequest.fulfilled]: (state,action)=>action.payload,
    [sendLicenseRequest.rejected]: (state,action)=>action.payload,

    [rrhhReviewLicense.fulfilled]: (state,action)=>action.payload,
    [rrhhReviewLicense.rejected]: (state,action)=>action.payload,


});

export default licenseReducer