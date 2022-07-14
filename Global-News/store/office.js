import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const officeRequest = createAsyncThunk("OFFICE_REQUEST", async (data,thunkAPI)=>{
    try{ 
        const { user } = thunkAPI.getState()
    const offices = await axios.get(`http://localhost:3001/api/offices?country=${user.countryOfResidence}`)
        return offices.data
    }catch(error){console.log(error)}
});

export const officeCreate= createAsyncThunk("CREATE_OFFICE", async (data)=>{
    try{ 
         const ofice = await axios.post(`http://localhost:3001/api/offices/addOffice`,data)

        return ofice.data
    }catch(error){console.log(error)}
});

export const addUserToOffice = createAsyncThunk("ADD_USER_TO_TEAM", async (data)=>{
    try{ 
         const team = await axios.post(`http://localhost:3001/api/offices/user/addToOffice`,data)
        return team.data
    }catch(error){console.log(error)}
});

const officeReducer = createReducer({}, {
    [officeRequest.fulfilled]: (state,action)=>action.payload,
    [officeRequest.rejected]: (state,action)=>action.payload,

    [officeCreate.fulfilled]: (state,action)=>action.payload,
    [officeCreate.rejected]: (state,action)=>action.payload,

});

export default officeReducer