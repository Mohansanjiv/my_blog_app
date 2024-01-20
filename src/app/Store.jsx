
import useReducer from "../features/userSlice";
import { configureStore } from "@reduxjs/toolkit";


export default configureStore({
    reducer:{
        user:useReducer,
    },
})