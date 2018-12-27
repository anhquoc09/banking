import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const AdminRoute = ({isAuthenticated, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? <Component {...props}/> : <Redirect to="/"/>}
    />
);

AdminRoute.propsTypes = {
    component: PropsTypes.func.isRequired,
    isAuthenticated: PropsTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.refreshToken
    };
}

export default connect(mapStateToProps)(AdminRoute);