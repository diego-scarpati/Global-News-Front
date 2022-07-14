import axios from "axios";
import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";

// export const setUserFromLogin = createAction("SET_USER_LOGIN")
export const setUserFromLogin = createAsyncThunk("SET_USER_LOGIN", (data) => {
console.log("🚀 ~ file: user.js ~ line 24 ~ setUserFromLogin ~ data", data)
  const loggedUser = {...data}
  return loggedUser;
});

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

export const setUserFromStorage = createAsyncThunk(
  "SET_USER_FROM_STORAGE",
  async () => {
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
  }
);

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
  "FIND_USER_BY_EMAIL_M",
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

    

    [searchAllUsers.fulfilled]: (state, action) => action.payload,
    [searchAllUsers.rejected]: (state, action) => action.payload,

    [setUserFromStorage.fulfilled]: (state, action) => action.payload,
    [setUserFromStorage.rejected]: (state, action) => action.payload,

    [setUserFromLogin.fulfilled]: (state, action) => action.payload,
    [setUserFromLogin.rejected]: (state, action) => action.payload,
  }
);

export default userReducer;
