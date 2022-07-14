import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const hrAllUsers = createAsyncThunk(
  "HR_ALL_USERS",
  async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const users = await axios.get(
        `http://localhost:3001/api/users?countryOfResidence=${user.countryOfResidence}`
      );
      return users.data;
    } catch (error) {
      console.log(error);
    }
  }
);


const hrGiveRollReducer = createReducer(
  {},
  {
    [hrAllUsers.fulfilled]: (state, action) => action.payload,
    [hrAllUsers.rejected]: (state, action) => action.payload,
  }
);

export default hrGiveRollReducer;