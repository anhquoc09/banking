import React from 'react';
import PropsTypes from 'prop-types';
import {Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import NavbarAdmin from './navbarAdmin';
import AddUserForm from '../form/AddUserForm';
import {regist} from '../../actions/auth';

class AddUserPageAdmin extends React.Component {
    submit = dataUser => {
        this.props.regist(dataUser).then(() => {
            this.props.history.push("/admin/home")
        });
    };

    render() {
        return (
            <div className="ui container">
                <NavbarAdmin/>
                <Segment stacked>
                    <AddUserForm submit={this.submit}/>
                </Segment>
            </div>
        )
    }
}

AddUserPageAdmin.propTypes = {
    // isAuthenticated: PropsTypes.bool.isRequired,
    history: PropsTypes.shape({
        push: PropsTypes.func.isRequired
    }).isRequired,
    regist: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        // isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps, {regist})(AddUserPageAdmin);