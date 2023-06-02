import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Box, TextField } from '@mui/material';
import useActions from '../../hooks/useActions';

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
const EditModal: React.FC<ExpenditureDynamicsProps> = ({ book }) => {
    const [open, setOpen] = React.useState(false);
    const { editBook } = useActions();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        editBook({
            id: data.get('id')?.toString() ?? '',
            status: data.get('status')?.toString() ?? '',
        });
        setOpen(false);
    };

    return (
        <div>
            <Tooltip
                title="Edit"
                onClick={handleClickOpen}
                style={{ marginLeft: '10px' }}
            >
                <IconButton>
                    <EditIcon color="primary" />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box component={'form'} onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        {'Change the status of the book'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContent>
                            <TextField
                                style={{ marginTop: '10px' }}
                                required
                                id="outlined-required"
                                label="Status"
                                name="status"
                                defaultValue={book.status}
                            />
                            <TextField
                                style={{ display: 'none' }}
                                name="id"
                                value={book.book.id}
                            />
                        </DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" autoFocus>
                            Edit
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
};

export default EditModal;
