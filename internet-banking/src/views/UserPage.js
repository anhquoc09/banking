import React from 'react';
import PropsTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

const UserPage = ({isAuthenticated,isConfirmed,logout}) => (
    <div>
        <h1>User Page</h1>
        <button onClick={()=> logout()}>Logout</button>
    </div>
);

UserPage.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    logout: PropsTypes.func.isRequired,
    isConfirmed: PropsTypes.bool.isRequired
};

function mapStateToProps(state){
 return{
     isAuthenticated: !!state.user.refreshToken
 }
}

export default connect(mapStateToProps, { logout: actions.logout })(UserPage);