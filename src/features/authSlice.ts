import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../utils/fireBase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { State } from '../../type/type';

const initialState: State = {
  isLogin: false,
  rejectToRegister: false,
  isEditSaved: false,
  loginUserError: '',
};

export const registerUser = createAsyncThunk(
  'fireBase/registerUser',
  async (
    {
      registerEmail,
      registerPassword,
    }: { registerEmail: string; registerPassword: string },
    { rejectWithValue },
  ) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
      );
      return 'Registration successful';
    } catch (error: any) {
      console.error('Error registering user:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'fireBase/loginUser',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      if (!email) {
        throw new Error('Email is required');
      }

      await signInWithEmailAndPassword(auth, email, password);

      return 'Login successful';
    } catch (error: any) {
      console.error('Error logging in:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  'fireBase/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
      console.log('Logout successful');
      return 'Logout successful';
    } catch (error: any) {
      console.error('Error logging out:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogOut: (state, action) => {
      state.isLogin = action.payload;
    },

    setEditChanges: (state, action) => {
      state.isEditSaved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.rejectToRegister = true;
        state.isLogin = true;
        state.loginUserError = '';
        state.loginUserError = '';
      })
      .addCase(registerUser.rejected, (state) => {
        state.rejectToRegister = true;
        console.error('Error registering user:');
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLogin = true;
        state.loginUserError = '';
      })
      .addCase(loginUser.rejected, (state) => {
        state.loginUserError = 'Bad login or password';
      });
  },
});

export const { setLogOut, setEditChanges } = authSlice.actions;

export default authSlice.reducer;
