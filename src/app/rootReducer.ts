import { combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/auth.slice';
import { booksReducer } from '../features/books/books.slice';
const rootReducer = combineReducers({
    auth: authReducer,
    books: booksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
