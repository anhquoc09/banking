import React from 'react';
import PropsTypes from 'prop-types';
import {connect} from 'react-redux';
import {Input, Form, Button, Icon,Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class VerifyOTPForm extends React.Component {
    state = {
        otp: "",
        errors: {},
    };

    onChange = e => this.setState({
        otp: e.target.value
    });

    onSubmit = () => {
        const errors = this.validate(this.state.otp);
        this.setState({errors});
        this.props
            .submit(this.state.otp,this.props.user.idUser)
            .catch(err=>this.setState({errors: {msg: err.response.data.msg}}));
    };

    validate = data => {
        const errors = {};
        if (!data) errors.otp = "Can't be blank";
        return errors;
    };

    render() {
        const {errors, otp} = this.state;
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}
                 className="ui container">
                <Form onSubmit={this.onSubmit}>
                    <h1>Send OTP mail </h1>
                    <h3>Please fill in your OTP which we sent you email</h3>
                    {errors.msg && (
                        <Message negative>
                            <Message.Header>Something went wrong</Message.Header>
                            <p>{errors.msg}</p>
                        </Message>
                    )}
                    <Form.Field error={!!errors.otp}>
                        <label htmlFor="text">Your OTP : </label>
                        <Input icon="key" iconPosition='left' type="number" placeholder="your OTP"
                               value={otp} onChange={this.onChange}/>
                        {errors.otp && <InlineError text={errors.otp}/>}
                    </Form.Field>
                    <Button primary icon labelPosition='left'>
                        <Icon name="key"/>
                        Xác nhận
                    </Button>
                </Form>
            </div>
        )
    }
}

VerifyOTPForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return{
        user: state.user.user,
    }
}

export default connect(mapStateToProps)(VerifyOTPForm);