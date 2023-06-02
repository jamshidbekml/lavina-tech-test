import { Divider } from '@mui/material';
import Books from '../../components/books/books';
import DrawerRight from '../../components/sidebar/sidebar';
import CreateModal from '../../components/modals/create.modal';

const Dashboard = () => {
    return (
        <>
            <DrawerRight>
                <CreateModal />
                <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
                <Books />
            </DrawerRight>
        </>
    );
};

export default Dashboard;
