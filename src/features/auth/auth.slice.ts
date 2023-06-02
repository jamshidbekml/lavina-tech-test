import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage, notify } from '../../utils';
import { MD5 } from 'crypto-js';
import axios from 'axios';

const initialState = {
    loading: false,
    error: undefined,
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    message: undefined,
};

export const signin = createAsyncThunk(
    'auth/signin',
    async (options: { key: string; secret: string }, thunkAPI) => {
        try {
            const signString = 'GET/myself' + options.secret;
            const sign = MD5(signString).toString();
            const {
                data: { data },
            } = await axios.get(`/myself`, {
                headers: {
                    'Content-Type': 'application/json',
                    Key: options.key,
                    Sign: sign,
                },
            });

            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            notify(message, 'error');
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (
        options: { name: string; key: string; email: string; secret: string },
        thunkAPI
    ) => {
        try {
            const {
                data: { data },
            } = await axios.post(`/signup`, options);

            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            notify(message, 'error');
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout() {
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signin.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(
            signin.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
            }
        );
        builder.addCase(
            signin.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );
        builder.addCase(signup.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(
            signup.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.user = action.payload;
            }
        );
        builder.addCase(
            signup.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );
    },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
