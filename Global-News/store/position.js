import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const giveRol = createAsyncThunk("GIVE_ROL", async ()=>{
    try{ 
    const user = await axios.get(`http://localhost:3001/api/users/`)
        return user.data
    }catch(error){console.log(error)}
});

const positionReducer = createReducer({}, {
    [giveRol.fulfilled]: (state,action)=>action.payload,
    [giveRol.rejected]: (state,action)=>action.payload,
});

export default positionReducer