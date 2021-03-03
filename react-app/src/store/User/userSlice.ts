import { createSlice } from '@reduxjs/toolkit';
import { UserInfo } from '../../models/UserInfo';
import { loginUser, registerUser } from './userThunks';

type user = {
  logged: boolean;
  errorMsg: string | null;
  info: UserInfo | null;
};

const initialState: user = {
  logged: false,
  errorMsg: null,
  info: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginIn(state, action) {
      state.logged = true;
      state.info = action.payload;
    },

    logout(state) {
      state.logged = false;
      state.info = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state, action) => {
      state.errorMsg = action.error.message as string | null;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.errorMsg = action.error.message as string | null;
    });
  },
});

export const { loginIn, logout } = userSlice.actions;

export const selectAuthState = (state: {
  user: { logged: boolean };
}): boolean => state.user.logged;

export const selectErrorMsg = (state: { user: { errorMsg: string } }): string =>
  state.user.errorMsg;

export const selectUserEmail = (state: {
  user: { info: { email: string } };
}): string => state.user.info?.email;

export const userReducer = userSlice.reducer;
