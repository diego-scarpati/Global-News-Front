import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const teamRequest = createAsyncThunk("TEAM_REQUEST", async ()=>{
    try{ 
    const team = await axios.get("http://localhost:3001/api/teams/")
    // console.log("store team", team.data)
        return team.data
    }catch(error){console.log(error)}
});

const teamReducer = createReducer([], {
    [teamRequest.fulfilled]: (state,action)=>action.payload,
    [teamRequest.rejected]: (state,action)=>action.payload,
});



export default teamReducer