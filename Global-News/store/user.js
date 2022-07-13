import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

// export const sendRegisterRequest = createAsyncThunk(
//   "REGISTER",
//   async (data) => {
//     try {
//       const info = await axios.post(
//         "http://localhost:3001/api/users/register",
//         data
//       );
//       return info.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const sendRegisterRequest = createAsyncThunk(
  "REGISTER",
  async (data) => {
    try {
      const info = await axios.post(
        "http://localhost:3001/api/auth/register",
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

  if (localUser !== null) {
    const user = await axios.get(
      `http://localhost:3001/api/users/email/${localUser}`
    );
    // (localUser === response.data.email ? localUser = user.data : null)
    return user.data;
  } else {
    return null;
  }
});

export const sendLoginRequest = createAsyncThunk(
  "LOGIN",
  async (data, thunkAPI) => {
    try {
      const loggedUser = await axios.post(
        `http://localhost:3001/api/auth/logIn`,
        data
      );
      console.log(
        "🚀 ~ file: user.js ~ line 56 ~ loggedUser.data.dataValues",
        loggedUser.data.dataValues
      );
      return loggedUser.data.dataValues;
    } catch (error) {
      console.log("entre en el catch");
      console.log(error);
    }
  }
);

// Ver donde se usan estas dos rutas y cambiar el nombre porque no es un login
// export const sendLoginRequest = createAsyncThunk(
//   "LOGIN",
//   async (data, thunkAPI) => {
//     try {
//         const loggedUser = await axios.get(
//           `http://localhost:3001/api/users/email/${data.email}`
//         );
//         return loggedUser.data;
//       }
//     catch (error) {
//       console.log(error);
//     }
//   }
// );

export const findUserByEmailMobile = createAsyncThunk(
  "LOGIN",
  async (data, thunkAPI) => {
    try {
      const loggedUser = await axios.get(
        `http://localhost:3001/api/users/email/${data}`
      );
      return loggedUser.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sendLogoutRequest = createAsyncThunk("LOGOUT", async () => {
  try {
    return null;
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

//no tiene uso aparentemente
export const searchAllUsers = createAsyncThunk(
  "SEARCH_ALL_REQUEST",
  async () => {
    try {
      const user = await axios.get(`http://localhost:3001/api/users/`);
      return user.data;
    } catch (error) {
      console.log(error);
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

    [findUserByEmailMobile.fulfilled]: (state, action) => action.payload,
    [findUserByEmailMobile.rejected]: (state, action) => action.payload,

    [sendLogoutRequest.fulfilled]: (state, action) => action.payload,
    [sendLogoutRequest.rejected]: (state, action) => action.payload,

    [userRequest.fulfilled]: (state, action) => action.payload,
    [userRequest.rejected]: (state, action) => action.payload,

    [searchAllUsers.fulfilled]: (state, action) => action.payload,
    [searchAllUsers.rejected]: (state, action) => action.payload,

    [setUser.fulfilled]: (state, action) => action.payload,
    [setUser.rejected]: (state, action) => action.payload,
  }
);

export default userReducer;
