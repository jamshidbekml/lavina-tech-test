import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ConfirmationDelete from '../modals/delete.modal';
import EditModal from '../modals/edit.modal';

interface ExpenditureDynamicsProps {
    book: {
        book: {
            id: number;
            isbn: string;
            title: string;
            cover: string;
            author: string;
            published: string;
            pages: number;
        };
        status: number;
    };
}

const BookCard: React.FC<ExpenditureDynamicsProps> = ({ book }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '10px' }}>
            <CardHeader
                action={<EditModal book={book} />}
                title={book.book.title ? book.book.title : 'Book Title'}
                subheader={
                    book.book.author
                        ? `${book.book.author} - ${book.book.published}`
                        : `${new Date()}`.slice(0, 21)
                }
            />
            <CardMedia
                style={{ objectFit: 'contain' }}
                component="img"
                height="194"
                width="345"
                image={
                    book.book.cover
                        ? book.book.cover
                        : `https://picsum.photos/345/194?random=${book.book.id}`
                }
                alt={book.book.title}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <span style={{ marginLeft: 'auto' }}>
                    <ConfirmationDelete id={book.book.id} />
                </span>
            </CardActions>
        </Card>
    );
};

export default BookCard;
