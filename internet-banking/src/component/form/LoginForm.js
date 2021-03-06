import React from 'react';
import PropsTypes from 'prop-types';
import {Form, Button, Message, Segment,Input} from "semantic-ui-react";
import Recaptcha from 'react-recaptcha';
import Validator from 'validator';
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
    state = {
        data: {
            email: "",
            password: "",
        },
        user: {},
        refreshToken: "",
        accessToken: "",
        loading: false,
        errors: {},
        isVerified: true,
    };

    onChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            if (this.state.isVerified) {
                this.setState({loading: true});
                this.props
                    .submit(this.state.data)
                    .catch(err => this.setState({errors: {msg: err.response.data.msg}, loading: false}));

            } else {
                alert("Please verify that you are a human");
            }
        }
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Can't be blank";
        return errors;
    };

    recaptchaLoaded = () => {
        console.log("catcha loaded successfully");
    };

    verifyCallback = () => {
        this.setState({isVerified: true})
    };

    render() {
        const {data, errors, loading} = this.state;
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '600px'
            }}
                 className="ui container">
                <Segment stacked>
                    <Form style={{height: '300px', width: '600px'}} onSubmit={this.onSubmit} loading={loading}>
                        <h1>QS BANK</h1>
                        {errors.msg && (
                            <Message negative>
                                <Message.Header>Something went wrong</Message.Header>
                                <p>{errors.msg}</p>
                            </Message>
                        )}
                        <Form.Field error={!!errors.email}>
                            <label htmlFor="email">Email</label>
                            <Input type="email" icon={'mail'} id="email" name="email" placeholder="example@example.com"
                                   value={data.email} onChange={this.onChange}
                            />
                            {errors.email && <InlineError text={errors.email}/>}
                        </Form.Field>
                        <Form.Field error={!!errors.password}>
                            <label htmlFor="password">Password</label>
                            <Input type="password" icon={'key'} id="password" name="password" placeholder="fill password !!!"
                                   value={data.password} onChange={this.onChange}
                            />
                            {errors.password && <InlineError text={errors.password}/>}
                        </Form.Field>
                        <Recaptcha
                            sitekey="6Ld1pIUUAAAAAN6-ntR1wmaaSrq4_7TNXqfU3qEU"
                            render="explicit"
                            onloadCallback={this.recaptchaLoaded}
                            verifyCallback={this.verifyCallback}
                        />
                        <Button primary>Login</Button>
                    </Form>
                </Segment>
            </div>
        );
    };
}

LoginForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

export default LoginForm;