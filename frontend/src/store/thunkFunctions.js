import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

export const registerUser = createAsyncThunk(
    // typePrefix
    "user/registerUser",
    // payloadCreator
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/register`
            )
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)