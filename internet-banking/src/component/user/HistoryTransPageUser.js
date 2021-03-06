import React from 'react';
import PropsTypes from 'prop-types';
import {Segment} from 'semantic-ui-react'
import {connect} from 'react-redux';
import NavbarUser from './navbarUser';
import HistoryTransForm from '../form/HistoryTransForm';

class HistoryTransPageUser extends React.Component {
    render() {
        return (
            <div className="ui container">
                <NavbarUser/>
                <Segment stacked>
                    <HistoryTransForm/>
                </Segment>
            </div>
        )
    }
}

HistoryTransPageUser.propsTypes = {
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

export default connect(mapStateToProps,)(HistoryTransPageUser);