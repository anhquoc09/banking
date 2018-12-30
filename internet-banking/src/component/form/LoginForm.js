import React from 'react';
import PropsTypes from 'prop-types';
import {Form, Button, Message} from "semantic-ui-react";
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

    render() {
        const {data, errors, loading} = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.msg && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.msg}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="example@example.com"
                           value={data.email} onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="fill password !!!"
                           value={data.password} onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>

                <Button primary>Login</Button>
            </Form>
        );
    };
}

LoginForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

export default LoginForm;