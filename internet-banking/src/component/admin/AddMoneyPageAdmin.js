import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {Segment} from 'semantic-ui-react';
import NavbarAdmin from './navbarAdmin';
import AddMoneyForm from '../form/AddMoneyForm';
import {addMoney} from '../../actions/auth';

class AddMoneyPageAdmin extends React.Component {
    submit = dataMoney =>
        this.props.addMoney(dataMoney).then(() => {
            this.props.history.push("/admin/home")
        });

    render() {
        return (
            <div className="ui container">
                <NavbarAdmin/>
                <Segment stacked>
                    <AddMoneyForm submit={this.submit}/>
                </Segment>
            </div>
        )
    }
}

AddMoneyPageAdmin.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    history: PropsTypes.shape({
        push: PropsTypes.func.isRequired
    }).isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps, {addMoney})(AddMoneyPageAdmin);