import React from 'react';
import LoginForm from '../component/form/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class HomePage extends React.Component {
    submit = data => this.props.login(data).then(() => {
        if (this.props.user.permission === 0) {
            this.props.history.push("/user/home")
        }else{
            this.props.history.push("/admin/home")
        }
    });

    render() {
        return (
            <div  className="ui container">
                <h1>QS BANK</h1>
                <LoginForm submit={this.submit}/>
            </div>
        );
    };
}

HomePage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps, {login})(HomePage);