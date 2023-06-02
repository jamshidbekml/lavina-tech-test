import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import useTypedSelector from '../../hooks/useTypedSelector';

interface PrivateRouteProps {
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>
        | undefined;
    path?: string;
    exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component,
    path = '/',
    exact = false,
}) => {
    const { user } = useTypedSelector((state) => state.auth);
    if (!user?.key) return <Redirect to={`/login?redirectTo=${path}`} />;
    return <Route component={component} path={path} exact={exact} />;
};

export default PrivateRoute;
