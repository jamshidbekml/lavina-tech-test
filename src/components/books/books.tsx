import * as React from 'react';
import useActions from '../../hooks/useActions';
import useTypedSelector from '../../hooks/useTypedSelector';
import BookCard from './books.card';
import { Box } from '@mui/material';

const Books = () => {
    const { getBooks } = useActions();
    const { books, singleBookLoading } = useTypedSelector(
        (state) => state.books
    );
    React.useEffect(() => {
        if (!singleBookLoading) getBooks();
    }, [getBooks, singleBookLoading]);

    return (
        <>
            <Box
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {books &&
                    books.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
            </Box>
        </>
    );
};

export default Books;
