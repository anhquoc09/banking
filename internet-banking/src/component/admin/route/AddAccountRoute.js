import React from 'react';
import PropsTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const AddAccountRoute = ({isAuthenticated, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? <Component {...props}/> : <Redirect to="/"/>}
    />
);

AddAccountRoute.propsTypes = {
    component: PropsTypes.func.isRequired,
    isAuthenticated: PropsTypes.bool.isRequired
};

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.user.refreshToken
    };
}

export default connect(mapStateToProps)(AddAccountRoute);