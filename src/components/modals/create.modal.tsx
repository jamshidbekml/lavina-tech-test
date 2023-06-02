import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import useActions from '../../hooks/useActions';

export default function CreateModal() {
    const [open, setOpen] = React.useState(false);
    const { createBook } = useActions();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        createBook({ isbn: data.get('isbn')?.toString() ?? '' });
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Create Book
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box component={'form'} onSubmit={handleSubmit}>
                    <DialogTitle id="alert-dialog-title">
                        {'Create a new book'}
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            style={{ marginTop: '10px' }}
                            required
                            id="outlined-required"
                            label="ISBN"
                            name="isbn"
                            defaultValue="9781118464465"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" autoFocus>
                            Create
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
}
