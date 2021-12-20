import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

const ProtectedRoute = ({ component, ...args }) => {
    return (

        <Route component={withAuthenticationRequired(component, {
            onRedirecting: () => <p>Loading...</p>
        })}
            {...args}
        >

        </Route>
    )
}

export default ProtectedRoute;
