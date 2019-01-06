import React from 'react';
import {connect} from 'react-redux';
import VerifyOTPForm from '../form/VerifyOTPForm';
import PropsTypes from "prop-types";
import {sendOtp} from '../../actions/auth';

class VerifyOTPPageUser extends React.Component {
    submit = (otp,idUser) =>
        this.props.sendOtp(otp,idUser).then(()=>{
            this.props.history.push("/user/movemoney")
        });

    render() {
        return (
            <VerifyOTPForm submit={this.submit}/>
        )
    }
}

VerifyOTPForm.propsTypes = {
    isAuthenticated: PropsTypes.bool.isRequired,
    history: PropsTypes.shape({
        push: PropsTypes.func.isRequired
    }).isRequired,
    sendOtp: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps,{sendOtp})(VerifyOTPPageUser);