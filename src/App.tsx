import React from 'react';
import SignIn from './pages/auth/signin';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './pages/auth/signup';
import PrivateRoute from './layout/user/PrivateRoute';
import NotFound from './pages/NotFound';
import Dashboard from './pages/dashboard/dashboard';

function App() {
    return (
        <>
            <Switch>
                <Route path={'/signin'} exact component={SignIn} />
                <Route path={'/signup'} exact component={SignUp} />
                <PrivateRoute component={Dashboard} path={'/'} exact />
                <PrivateRoute component={NotFound} />
            </Switch>
            <ToastContainer />
        </>
    );
}

export default App;
