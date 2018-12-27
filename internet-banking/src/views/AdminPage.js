import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import NavbarAdmin from '../component/admin/navbarAdmin';

class AdminPage extends React.Component {
    render() {
        return(
            <div className="ui container">
                <NavbarAdmin/>

            </div>
        )
    }
}

AdminPage.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    logout: PropsTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps)(AdminPage);