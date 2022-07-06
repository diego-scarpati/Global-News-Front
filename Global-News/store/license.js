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


export const rrhhReviewLicense = createAsyncThunk(
  "RRHH_REVIEW_LICENCE",
  async (data) => {

    try {
      const licences = await axios.get(
        `http://localhost:3001/api/workLicenses/${data.id}`
      );
      return licences.data;
    } catch (error) {
      console.log(error);
    }
  }
); //trae las licencias

export const rrhhChangeLicenseStatus = createAsyncThunk(
  "RRHH_CHANGE_STATUS_LICENCE",
  async (data, thunkAPI) => {
    try {
      const licences = await axios.put(`http://localhost:3001/api/workLicenses/${data.id}`,data)
      return licences.data
    } catch (error) {
      console.log(error);
    }
  }
);

export const rrhhLicenseBySearch = createAsyncThunk("USER_BY_NAME", async (data) => {
  try {
      const userSearch = await axios.get(`http://localhost:3001/api/workLicenses/search/${data}`)
      return userSearch.data
  } catch(error) {
      console.error(error)
  }
})

const licenseReducer = createReducer(
  {},
  {
    [sendLicenseRequest.fulfilled]: (state, action) => action.payload,
    [sendLicenseRequest.rejected]: (state, action) => action.payload,

    [sendHistoyLicensesRequest.fulfilled]: (state, action) => action.payload,
    [sendHistoyLicensesRequest.rejected]: (state, action) => action.payload,

    [rrhhReviewLicense.fulfilled]: (state, action) => action.payload,
    [rrhhReviewLicense.rejected]: (state, action) => action.payload,

    [rrhhChangeLicenseStatus.fulfilled]: (state, action) => action.payload,
    [rrhhChangeLicenseStatus.rejected]: (state, action) => action.payload,

    [rrhhLicenseBySearch.fulfilled]: (state, action) => action.payload,
    [rrhhLicenseBySearch.rejected]: (state, action) => action.payload,
  }
);

export default licenseReducer;
