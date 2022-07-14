import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLicenseRequest = createAsyncThunk(
  "LICENSE",
  async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const info = { data, user };
      const licencia = await axios.post(
        "http://localhost:3001/api/workLicenses/addLicense",
        { info }
      );
      return licencia.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendHistoyLicensesRequest = createAsyncThunk(
  "HISTORY_LICENCES",
  async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const licencias = await axios.get(
        `http://localhost:3001/api/workLicenses/user/${user.id}`
      );
      return licencias.data;
    } catch (error) {
      console.log(error);
    }
  }
);



const licenseReducer = createReducer(
  {},
  {
    [sendLicenseRequest.fulfilled]: (state, action) => action.payload,
    [sendLicenseRequest.rejected]: (state, action) => action.payload,

    [sendHistoyLicensesRequest.fulfilled]: (state, action) => action.payload,
    [sendHistoyLicensesRequest.rejected]: (state, action) => action.payload,

  }
);

export default licenseReducer;
