import React from 'react';
import PropsTypes from 'prop-types';
import {Menu,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/auth';
import {connect} from 'react-redux';

class NavbarUser extends React.Component {
    render() {
        const {user, logout} = this.props;

        return (
            <Menu secondary pointing icon='labeled'>
                <Menu.Item as={Link} to="/user/home">
                    <Icon name='home'/>
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to="/user/showaccount">
                    <Icon name='user'/>
                    Xem Tài Khoản
                </Menu.Item>
                <Menu.Item as={Link} to="/user/movemoney">
                    <Icon name='money bill alternate outline'/>
                    Chuyển khoản
                </Menu.Item>
                <Menu.Item as={Link} to="/user/historytrans">
                    <Icon name='history'/>
                    Lịch sử giao dịch
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item onClick={()=>logout()}>
                        <Icon name='log out'/>
                        Thoát({user.fullname})
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

NavbarUser.propsTypes = {
    user: PropsTypes.shape({email: PropsTypes.string.isRequired}).isRequired,
    logout: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
    };
}

export default connect(mapStateToProps, {logout: actions.logout})(NavbarUser);