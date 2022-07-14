import axios from "axios";
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";



export const editUser = createAsyncThunk("EDIT_USER", async (data) => {
  try {
    const user = await axios.put(
      `http://localhost:3001/api/users/${data.id}`,
      data.info
    );
    return user.data;
  } catch (error) {
    console.log(error);
  }
});

export const userRequest = createAsyncThunk("USER_REQUEST", async (data) => {
    try {
      const user = await axios.get(
        `http://localhost:3001/api/users/${data.userId}`
      );
      return user.data;
    } catch (error) {
      console.log(error);
    }
  });

const hrEditUserReducer = createReducer(
  {},
  {

    [editUser.fulfilled]: (state, action) => action.payload,
    [editUser.rejected]: (state, action) => action.payload,

    [userRequest.fulfilled]: (state, action) => action.payload,
    [userRequest.rejected]: (state, action) => action.payload,

    
  }
);

export default hrEditUserReducer;