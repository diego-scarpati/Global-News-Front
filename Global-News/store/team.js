import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const teamRequest = createAsyncThunk("TEAM_REQUEST", async ()=>{
    try{ 
    const team = await axios.get("http://localhost:3001/api/teams/")
    console.log("store teamRequest", team.data)
        return team.data
    }catch(error){console.log(error)}
});

export const teamRequestByUser = createAsyncThunk("TEAM_REQUEST_BY_USER", async (data, thunkAPI)=>{
    const {user} = thunkAPI.getState()
    try{ 
    const team = await axios.get(`http://localhost:3001/api/teams/user/${user.id}`)
    console.log("store teamRequestByUser", team.data)
        return team.data
    }catch(error){console.log(error)}
});

const teamReducer = createReducer([], {
    [teamRequest.fulfilled]: (state,action)=>action.payload,
    [teamRequest.rejected]: (state,action)=>action.payload,
    [teamRequestByUser.fulfilled]: (state,action)=>action.payload,
    [teamRequestByUser.rejected]: (state,action)=>action.payload,
});



export default teamReducer