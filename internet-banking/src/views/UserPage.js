import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import NavbarUser from '../component/user/navbarUser';

class UserPage extends React.Component {
    render() {
        // const {isAuthenticated, isConfirmed,user} = this.props;
        // console.log(isAuthenticated);
        // console.log(isConfirmed);
        // console.log(user);

        return (
            <div className="ui container">
                <NavbarUser/>

            </div>
        )
    }

}

UserPage.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    logout: PropsTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps)(UserPage);