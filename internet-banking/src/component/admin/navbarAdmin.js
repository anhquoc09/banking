import React from 'react';
import PropsTypes from 'prop-types';
import {Menu,Icon,Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/auth';
import {connect} from 'react-redux';

class NavbarAdmin extends React.Component {
    state={activeName:'home'};

    render() {
        const {user, logout} = this.props;
        return (
            <Segment stacked>
                <Menu secondary pointing icon='labeled'>
                    <Menu.Item name='home' as={Link} to="/admin/home">
                        <Icon name='home'/>
                        Home
                    </Menu.Item>
                    <Menu.Item as={Link} to="/admin/adduser">
                        <Icon name='add user'/>
                        Thêm người dùng
                    </Menu.Item>
                    <Menu.Item name='addacount' as={Link} to="/admin/addaccount">
                        <Icon name='add square'/>
                        Thêm Tài Khoản
                    </Menu.Item>
                    <Menu.Item name='addmoney' as={Link} to="/admin/addmoney">
                        <Icon name='money bill alternate'/>
                        Nạp tiền
                    </Menu.Item>

                    <Menu.Menu position="right">
                        <Menu.Item onClick={()=>logout()}>
                            <Icon name='log out'/>
                            Thoát({user.fullname})
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Segment>
        )
    }
}

NavbarAdmin.propsTypes = {
    user: PropsTypes.shape({email: PropsTypes.string.isRequired}).isRequired,
    logout: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
    };
}

export default connect(mapStateToProps, {logout: actions.logout})(NavbarAdmin);