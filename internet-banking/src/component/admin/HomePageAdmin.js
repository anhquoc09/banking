import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid, Image, Label, Icon,Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import NavbarAdmin from './navbarAdmin';
import userImage from '../../Image/no_image.png';

class HomePageAdmin extends React.Component {

    render() {
        return (
            <div className="ui container">
                <NavbarAdmin/>
                <Segment stacked>
                    <Grid celled>
                        <Grid.Column width={5}>
                            <Image src={userImage} circular/>
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <h1>{this.props.user.fullname}</h1>
                            <Label as={Link} size={'big'} basic pointing={'left'} to="/admin/adduser">
                                <Icon name='add user'/>
                                Thêm người dùng
                            </Label>
                            <br/><br/>
                            <Label as={Link} size={'big'} basic pointing={'left'} to="/admin/addaccount">
                                <Icon name='add square'/>
                                Thêm tài khoản người dùng
                            </Label>
                            <br/><br/>
                            <Label as={Link} size={'big'} basic pointing={'left'} to="/admin/addmoney">
                                <Icon name='money bill alternate'/>
                                Nạp tiền vào tài khoản
                            </Label>
                        </Grid.Column>
                    </Grid>
                </Segment>
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