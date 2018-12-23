import React from 'react';
import LoginForm from '../component/form/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class HomePage extends React.Component {
    submit = data => this.props.login(data).then(() => this.props.history.push("/user"));

    render() {
        const {history} = this.props;

        console.log(this.props);
        console.log(history);
        return (
            <div>
                <h1>Home Page</h1>
                <LoginForm submit={this.submit}/>
            </div>
        );
    };
}

HomePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, {login})(HomePage);