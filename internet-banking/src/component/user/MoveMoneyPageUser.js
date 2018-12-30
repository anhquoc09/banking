import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import NavbarUser from './navbarUser';
import TransactionForm from '../form/TransactionForm';
import {addTransaction} from '../../actions/auth';

class MoveMoneyPageUser extends React.Component {

    render() {
        return (
            <div className="ui container">
                <NavbarUser/>
                <TransactionForm/>
            </div>
        )
    }
}

MoveMoneyPageUser.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    history: PropsTypes.shape({
        push: PropsTypes.func.isRequired
    }).isRequired,
    addTransaction: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps, {addTransaction})(MoveMoneyPageUser);