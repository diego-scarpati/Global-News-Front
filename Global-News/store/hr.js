import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";



export const hrSearchUsersByInput = createAsyncThunk(
  "HR_SEARCH_USER",
  async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      if (user.RRHH) {
        const userSearch = await axios.get(
          `http://localhost:3001/api/users/search/${data}?countryOfResidence=${user.countryOfResidence}`
        );
        return userSearch.data;
      } else {
        const userSearch = await axios.get(
          `http://localhost:3001/api/users/search/boss/${data.searchQuery}?name=${data.input}`
        );
        return userSearch.data;
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const hrReviewLicense = createAsyncThunk(
  "HR_REVIEW_LICENCE",
  async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      if (user.RRHH) {
        const licences = await axios.get(
          `http://localhost:3001/api/workLicenses/${data.id}?countryOfResidence=${user.countryOfResidence}`
        );
        return licences.data;
      } else {
        const licences = await axios.get(
          `http://localhost:3001/api/workLicenses/boss/${user.id}?name=${data.name}`
        );
        return licences.data;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const hrChangeLicenseStatus = createAsyncThunk(
  "HR_CHANGE_STATUS_LICENCE",
  async (data, thunkAPI) => {
    try {
      const licences = await axios.put(
        `http://localhost:3001/api/workLicenses/${data.id}`,
        data
      );
      return licences.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const hrLicenseBySearch = createAsyncThunk(
  "HR_LICENSE_BY_SEARCH",
  async (data, thunkAPI) => {
    try {
      const { user } = thunkAPI.getState();
      const userSearch = await axios.get(
        `http://localhost:3001/api/workLicenses/search/${data}?countryOfResidence=${user.countryOfResidence}`
      );
      return userSearch.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const hrSendHistoyLicensesRequest = createAsyncThunk(
  "HR_HISTORY_LICENCES",
  async (data, thunkAPI) => {
    try {
      const licencias = await axios.get(
        `http://localhost:3001/api/workLicenses/user/${data.userId}`
      );
      return licencias.data;
    } catch (error) {
      console.log(error);
    }
  }
);



const hrReducer = createReducer(
  {},
  {
    [hrSearchUsersByInput.fulfilled]: (state, action) => action.payload,
    [hrSearchUsersByInput.rejected]: (state, action) => action.payload,

    [hrReviewLicense.fulfilled]: (state, action) => action.payload,
    [hrReviewLicense.rejected]: (state, action) => action.payload,

    [hrChangeLicenseStatus.fulfilled]: (state, action) => action.payload,
    [hrChangeLicenseStatus.rejected]: (state, action) => action.payload,

    [hrLicenseBySearch.fulfilled]: (state, action) => action.payload,
    [hrLicenseBySearch.rejected]: (state, action) => action.payload,

    [hrSendHistoyLicensesRequest.fulfilled]: (state, action) => action.payload,
    [hrSendHistoyLicensesRequest.rejected]: (state, action) => action.payload,
  }
);

export default hrReducer;
