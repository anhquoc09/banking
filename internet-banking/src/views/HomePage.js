import React from 'react';
import LoginForm from '../component/form/LoginForm';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

class HomePage extends React.Component {
    submit = data => this.props.login(data).then(() => {
        console.log(data);
        if (this.props.user.permission === 0) {
            this.props.history.push("/user")
        }else{
            this.props.history.push("/admin")
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
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, {login})(HomePage);