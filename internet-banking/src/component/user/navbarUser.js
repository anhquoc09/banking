import React from 'react';
import PropsTypes from 'prop-types';
import {Menu,Dropdown,Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/auth';
import {connect} from 'react-redux';
import gravatarUrl from 'gravatar-url';

class NavbarUser extends React.Component {
    render() {
        const {user, logout} = this.props;

        return (
            <Menu secondary pointing>
                <Menu.Item as={Link} to="/user/home">
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to="/user/showaccount">
                    Xem Tài Khoản
                </Menu.Item>
                <Menu.Item as={Link} to="/user/movemoney">
                    Chuyển khoản
                </Menu.Item>
                <Menu.Item as={Link} to="/user/historytrans">
                    Lịch sử giao dịch
                </Menu.Item>

                <Menu.Menu position="right">
                    <Dropdown  trigger={<Image avatar src={gravatarUrl(user.email)} />}>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>logout()}>
                                Thoát
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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