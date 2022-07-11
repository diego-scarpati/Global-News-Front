import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const hrAllUsers = createAsyncThunk("hr_ALL_USERS", async (data)=>{
    try{
        const user = await axios.get(`http://localhost:3001/api/users/`);
        return user.data;
    }catch(error){console.log(error)}
});

export const hrSearchUsersByInput = createAsyncThunk(
    "USER_BY_INPUT",
    async (data) => {
      try {
        const userSearch = await axios.get(
          `http://localhost:3001/api/users/search/${data}`
        );
        return userSearch.data;
      } catch (error) {
        console.error(error);
      }
    }
  );


  export const hrReviewLicense = createAsyncThunk(
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
  
  export const hrChangeLicenseStatus = createAsyncThunk(
    "HR_CHANGE_STATUS_LICENCE",
    async (data, thunkAPI) => {
      try {
        const licences = await axios.put(`http://localhost:3001/api/workLicenses/${data.id}`,data)
        return licences.data
      } catch (error) {
        console.log(error);
      }
    }
  );
  
  export const hrLicenseBySearch = createAsyncThunk("HR_LICENSE_BY_SEARCH", async (data) => {
    try {
        const userSearch = await axios.get(`http://localhost:3001/api/workLicenses/search/${data}`)
        return userSearch.data
    } catch(error) {
        console.error(error)
    }
  });




const hrReducer = createReducer({}, {
    [hrAllUsers.fulfilled]: (state,action)=>action.payload,
    [hrAllUsers.rejected]: (state,action)=>action.payload,

    [hrSearchUsersByInput.fulfilled]: (state, action) => action.payload,
    [hrSearchUsersByInput.rejected]: (state, action) => action.payload,

    [hrReviewLicense.fulfilled]: (state, action) => action.payload,
    [hrReviewLicense.rejected]: (state, action) => action.payload,

    [hrChangeLicenseStatus.fulfilled]: (state, action) => action.payload,
    [hrChangeLicenseStatus.rejected]: (state, action) => action.payload,

    [hrLicenseBySearch.fulfilled]: (state, action) => action.payload,
    [hrLicenseBySearch.rejected]: (state, action) => action.payload,
});


export default hrReducer