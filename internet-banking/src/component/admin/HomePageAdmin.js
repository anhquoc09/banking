import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import NavbarAdmin from './navbarAdmin';

class HomePageAdmin extends React.Component {

    render() {
        return (
            <div className="ui container">
                <NavbarAdmin />
                <h1>Home Page Admin</h1>
            </div>
        )
    }
}

HomePageAdmin.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    location: PropsTypes.shape({
        pathname: PropsTypes.string.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken,
    }
}

export default connect(mapStateToProps)(HomePageAdmin);