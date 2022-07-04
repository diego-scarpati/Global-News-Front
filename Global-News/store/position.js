import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const rrhhGiveRol = createAsyncThunk("GIVE_ROL", async (data)=>{
    try{ 
    const user = await axios.put(`http://localhost:3001/api/users/updatePosition`,data)
        return user.data
    }catch(error){console.log(error)}
});

const positionReducer = createReducer({}, {
    [rrhhGiveRol.fulfilled]: (state,action)=>action.payload,
    [rrhhGiveRol.rejected]: (state,action)=>action.payload,
});

export default positionReducer