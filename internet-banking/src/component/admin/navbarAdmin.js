import React from 'react';
import PropsTypes from 'prop-types';
import {Menu,Dropdown,Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/auth';
import {connect} from 'react-redux';
import gravatarUrl from 'gravatar-url';

class NavbarAdmin extends React.Component{
    render(){
        const {user,logout} = this.props;

        return(
            <Menu secondary pointing>
                <Menu.Item as={Link} to="/admin">
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to="/admin/adduser">
                    Thêm người dùng
                </Menu.Item>
                <Menu.Item as={Link} to="/admin/addaccount">
                    Chuyển khoản
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
        );
    }
}

NavbarAdmin.propsTypes = {
    user: PropsTypes.shape({email: PropsTypes.string.isRequired}).isRequired,
    logout: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return{
        user: state.user.user,
    };
}

export default connect(mapStateToProps,{logout: actions.logout})(NavbarAdmin);