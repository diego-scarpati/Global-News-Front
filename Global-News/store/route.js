import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const setStartScreenRoute = createAsyncThunk(
  "ROUTE_FOR_STARTSCREEN",
  async (data, thunkAPI) => {
    try {
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const routeReducer = createReducer(
  {},
  {
    [setStartScreenRoute.fulfilled]: (state, action) => action.payload,
    [setStartScreenRoute.rejected]: (state, action) => action.payload,
  }
);

export default routeReducer;