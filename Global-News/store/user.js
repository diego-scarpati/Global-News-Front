import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const sendRegisterRequest = createAsyncThunk("REGISTER", async ()=>{
    try{
        const info = await axios.post("/api/users/register")

    }catch(error){console.log(error)}
});

export const sendLoginRequest = createAsyncThunk("LOGIN", async (data)=>{
    try{ 
    const info = await axios.post("/api/users/login",data)
    return info.data 
    }catch(error){console.log(error)}
});

export const sendLogoutRequest = createAsyncThunk("LOGIN",()=>{
    
});


const userReducer = createReducer([], {
    [sendRegisterRequest.fulfilled]: (state,action)=>action.payload,
    [sendRegisterRequest.rejected]: (state,action)=>action.payload,
    [sendLoginRequest.fulfilled]: (state,action)=>action.payload,
    [sendLoginRequest.rejected]: (state,action)=>action.payload,
    [sendLogoutRequest.fulfilled]: (state,action)=>action.payload,
    [sendLogoutRequest.rejected]: (state,action)=>action.payload,
  });

export default userReducer