import React from 'react';
import PropsTypes from 'prop-types';
import {Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import NavbarAdmin from './navbarAdmin';
import AddAccountBankForm from '../form/AddAccountBankForm';
import {addAccountBank} from '../../actions/auth';

class AddAccountPageAdmin extends React.Component {

    submit = dataAccount =>
        this.props.addAccountBank(dataAccount).then(() => {
            this.props.history.push("/admin/home")
        });

    render() {
        return (
            <div className="ui container">
                <NavbarAdmin/>
                <Segment stacked>
                    <AddAccountBankForm submit={this.submit}/>
                </Segment>
            </div>
        )
    }
}

AddAccountPageAdmin.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    logout: PropsTypes.func.isRequired,
    location: PropsTypes.shape({
        pathname: PropsTypes.string.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps, {addAccountBank})(AddAccountPageAdmin);