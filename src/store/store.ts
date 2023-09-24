import { configureStore } from "@reduxjs/toolkit";
import fireBaseReducer from '../features/authSlice'
export const store = configureStore({
    reducer: {
        FireBaseReducer: fireBaseReducer,
    },
})