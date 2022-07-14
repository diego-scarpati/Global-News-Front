import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";


export const hrLicensesReviewLicense = createAsyncThunk(
  "HR_LICENSES_REVIEW_LICENCE",
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




const hrLicenseReducer = createReducer(
  {},
  {
   
    [hrLicensesReviewLicense.fulfilled]: (state, action) => action.payload,
    [hrLicensesReviewLicense.rejected]: (state, action) => action.payload,

  }
);

export default hrLicenseReducer;