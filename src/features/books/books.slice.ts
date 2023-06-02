import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getErrorMessage, notify, withSecretKey } from '../../utils';
import axios from 'axios';

const initialState = {
    loading: false,
    singleBookLoading: false,
    singleBookError: false,
    singleBook: {},
    books: [],
    error: undefined,
};

export const getBooks = createAsyncThunk('books/get', async (_, thunkAPI) => {
    try {
        const {
            data: { data },
        } = await axios.get(`/books`, withSecretKey('GET', '/books'));

        return data;
    } catch (e) {
        const message = getErrorMessage(e);
        return thunkAPI.rejectWithValue(message);
    }
});

export const createBook = createAsyncThunk(
    'books/create',
    async (options: { isbn: string }, thunkAPI) => {
        try {
            const {
                data: { data },
            } = await axios.post(
                `/books`,
                options,
                withSecretKey('POST', '/books', options)
            );
            notify('Book created successfully', 'success');

            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            notify(message, 'error');
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const editBook = createAsyncThunk(
    'books/edit',
    async (options: { id: string; status: string }, thunkAPI) => {
        console.log(options);

        try {
            const {
                data: { data },
            } = await axios.patch(
                `/books/${options.id}`,
                { status: options.status },
                withSecretKey('PATCH', `/books/${options.id}`, {
                    status: options.status,
                })
            );
            notify('Book updated successfully', 'success');

            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            notify(message, 'error');
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const deleteBook = createAsyncThunk(
    'books/delete',
    async (id: string, thunkAPI) => {
        try {
            const { data } = await axios.delete(
                `/books/${id}`,
                withSecretKey('DELETE', `/books/${id}`)
            );
            notify('Book deleted successfully', 'success');

            return data;
        } catch (e) {
            const message = getErrorMessage(e);
            notify(message, 'error');
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const booksSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout() {
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        });
        builder.addCase(
            getBooks.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.books = action.payload;
            }
        );
        builder.addCase(
            getBooks.rejected,
            (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            }
        );
        builder.addCase(createBook.pending, (state) => {
            state.singleBookLoading = true;
            state.error = undefined;
        });
        builder.addCase(
            createBook.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.singleBookLoading = false;
                state.singleBook = action.payload;
            }
        );
        builder.addCase(
            createBook.rejected,
            (state, action: PayloadAction<any>) => {
                state.singleBook = false;
                state.singleBookError = action.payload;
            }
        );
        builder.addCase(editBook.pending, (state) => {
            state.singleBookLoading = true;
            state.error = undefined;
        });
        builder.addCase(
            editBook.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.singleBookLoading = false;
                state.singleBook = action.payload;
            }
        );
        builder.addCase(
            editBook.rejected,
            (state, action: PayloadAction<any>) => {
                state.singleBook = false;
                state.singleBookError = action.payload;
            }
        );
        builder.addCase(deleteBook.pending, (state) => {
            state.singleBookLoading = true;
            state.error = undefined;
        });
        builder.addCase(
            deleteBook.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.singleBookLoading = false;
                state.singleBook = action.payload;
            }
        );
        builder.addCase(
            deleteBook.rejected,
            (state, action: PayloadAction<any>) => {
                state.singleBook = false;
                state.singleBookError = action.payload;
            }
        );
    },
});

export const booksActions = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
