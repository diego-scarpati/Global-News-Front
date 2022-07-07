import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendRegisterRequest = createAsyncThunk(
  "REGISTER",
  async (data) => {
    try {
      console.log("DATA: ", data);
      const info = await axios.post(
        "http://localhost:3001/api/users/register",
        data
      );
      return info.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const setUser = createAsyncThunk("SET_USER", async () => {
  const localUser = JSON.parse(localStorage.getItem("email"));
  console.log("🚀 ~ file: user.js ~ line 22 ~ setUser ~ localUser", typeof localUser);

  if (localUser !== null) {
    const user = await axios.get(
      `http://localhost:3001/api/users/email/${localUser}`
    );
    console.log("🚀 ~ file: user.js ~ line 28 ~ setUser ~ user", user)
    // (localUser === response.data.email ? localUser = user.data : null)
    return user.data
  } else {
    return null;
  }
});

export const sendLoginRequest = createAsyncThunk(
  "LOGIN",
  async (data, thunkAPI) => {
    console.log("🚀 ~ file: user.js ~ line 39 ~ data", data)
    console.log("🚀 ~ file: user.js ~ line 40 ~ data", data.email)
    try {
        const loggedUser = await axios.get(
          `http://localhost:3001/api/users/email/${data.email}`
        );
        return loggedUser.data;
      }
    catch (error) {
      console.log(error);
    }
  }
);

export const sendLogoutRequest = createAsyncThunk("LOGOUT", async (data) => {
  try {
    const info = await axios.post(
      "http://localhost:3001/api/users/logout",
      data
    );
    return info.data;
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

export const searchAllUsers = createAsyncThunk("USER_REQUEST", async () => {
  try {
    const user = await axios.get(`http://localhost:3001/api/users/`);
    return user.data;
  } catch (error) {
    console.log(error);
  }
});

export const searchUsersByInput = createAsyncThunk(
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

const userReducer = createReducer(
  {},
  {
    [sendRegisterRequest.fulfilled]: (state, action) => {
      action.payload;
    },
    [sendRegisterRequest.rejected]: (state, action) => action.payload,

    [sendLoginRequest.fulfilled]: (state, action) => action.payload,
    [sendLoginRequest.rejected]: (state, action) => action.payload,

    [sendLogoutRequest.fulfilled]: (state, action) => action.payload,
    [sendLogoutRequest.rejected]: (state, action) => action.payload,

    [userRequest.fulfilled]: (state, action) => action.payload,
    [userRequest.rejected]: (state, action) => action.payload,

    [searchAllUsers.fulfilled]: (state, action) => action.payload,
    [searchAllUsers.rejected]: (state, action) => action.payload,

    [searchUsersByInput.fulfilled]: (state, action) => action.payload,
    [searchUsersByInput.rejected]: (state, action) => action.payload,

    [setUser.fulfilled]: (state, action) => action.payload,
    [setUser.rejected]: (state, action) => action.payload,
  }
);

export default userReducer;
