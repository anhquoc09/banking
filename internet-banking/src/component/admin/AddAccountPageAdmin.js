import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import NavbarAdmin from './navbarAdmin';

class AddAccountPageAdmin extends React.Component {

    render() {
        return (
            <div className="ui container">
                <NavbarAdmin />
            </div>
        )
    }
}

AddAccountPageAdmin.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    logout: PropsTypes.func.isRequired,
    location: PropsTypes.shape({
        pathname: PropsTypes.string.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps)(AddAccountPageAdmin);