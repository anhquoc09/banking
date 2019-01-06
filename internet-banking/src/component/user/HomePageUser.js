import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid,Image} from 'semantic-ui-react';
import NavbarUser from './navbarUser';
import userImage from '../../Image/Google_Contacts_logo.png';

class HomePageUser extends React.Component {
    render() {
        const {user} = this.props;
        return (
            <div className="ui container">
                <NavbarUser/>
                <Grid celled>
                    <Grid.Column width={5}>
                        <Image src={userImage} circular/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <h1>{user.fullname}</h1>
                        <h3>CCND (CCCD) : {user.idUser}</h3>
                        <h3>Email : {user.email}</h3>
                        <h3>Phone Number : {user.phoneNumber}</h3>
                    </Grid.Column>
                </Grid>
            </div>

        )
    }
}

HomePageUser.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken,
    }
}

export default connect(mapStateToProps)(HomePageUser);