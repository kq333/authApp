import { configureStore } from "@reduxjs/toolkit";
import fireBaseReducer from '../features/authSlice'
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
    reducer: {
        auth: fireBaseReducer,
    },
    middleware: [thunkMiddleware],
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
