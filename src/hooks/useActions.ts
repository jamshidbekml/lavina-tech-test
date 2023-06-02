import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useMemo } from 'react';
import { authActions, signin, signup } from '../features/auth/auth.slice';
import {
    getBooks,
    createBook,
    editBook,
    deleteBook,
} from '../features/books/books.slice';

const actions = {
    signin,
    signup,
    getBooks,
    editBook,
    createBook,
    deleteBook,
    ...authActions,
};

const useActions = function () {
    const dispatch = useDispatch();
    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, [dispatch]);
};

export default useActions;
