import { createSlice } from '@reduxjs/toolkit';

interface State {
  isLogin: boolean;
  name: string;
  email: string;
  registerEmail: string;
  registerPassword: string;
}

const initialState: State = {
  isLogin: false,
  name: '', // Add a name property if needed
  email: '',
  registerEmail: '',
  registerPassword: '',
};

export const fireBaseSlice = createSlice({
  name: 'fireBase',
  initialState,
  reducers: {
    setLoginEmail: (state, action) => {
      state.email = action.payload;
      state.isLogin = true;
    },
    setLoginPassword: (state, action) => {
      state.password = action.payload; 
    },
    setRegisterEmail: (state, action) => {
      state.registerEmail = action.payload;
      state.isLogin = true;
    },
    setRegisterPassword: (state, action) => {
      state.registerPassword = action.payload;
    },
  },
});

export const {
  setLoginEmail,
  setLoginPassword,
  setRegisterEmail,
  setRegisterPassword,
} = fireBaseSlice.actions;

export default fireBaseSlice.reducer;
