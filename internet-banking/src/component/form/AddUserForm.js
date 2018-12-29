import React from 'react';
import PropsTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class AddUserForm extends React.Component {
    state = {
        dataUser: {
            fullname: "",
            cmnd: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            refreshToken:"",
        },
        errors: {},
    };

    onChange = e => this.setState({
        dataUser: {...this.state.dataUser, [e.target.name]: e.target.value}
    });

    onSubmit = () => {

        const errors = this.validate(this.state.dataUser);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.props
                .submit(this.state.dataUser)
                .catch(err => this.setState({errors: {msg: err.response.data.msg}}));
        }
    };

    validate = data => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        if (!data.password) errors.password = "Can't be blank";
        if (!data.confirmPassword) {
            errors.confirmPassword = "Can't be blank";
        } else if (data.password !== data.confirmPassword) {
            errors.confirmPassword = "Confirm Password different Password";
        }
        if (!data.fullname) errors.fullname = "Can't be blank";
        if (!data.cmnd) errors.cmnd = "Can't be blank";
        if (!data.phoneNumber) errors.phoneNumber = "Can't be blank";
        return errors;
    };

    render() {
        const {dataUser, errors} = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                {errors.msg && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.msg}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.fullname}>
                    <label htmlFor="text">Họ và tên :</label>
                    <input type="text" id="fullname" name="fullname" placeholder="Nguyen Van A"
                           value={dataUser.fullname} onChange={this.onChange}
                    />
                    {errors.fullname && <InlineError text={errors.fullname}/>}
                </Form.Field>
                <Form.Field error={!!errors.cmnd}>
                    <label htmlFor="text">CMND or CCCD :</label>
                    <input type="text" id="cmnd" name="cmnd" placeholder="0123456789"
                           value={dataUser.cmnd} onChange={this.onChange}
                    />
                    {errors.cmnd && <InlineError text={errors.cmnd}/>}
                </Form.Field>
                <Form.Field error={!!errors.email}>
                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" placeholder="example@example.com"
                           value={dataUser.email} onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email}/>}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor="password">Password :</label>
                    <input type="password" id="password" name="password" placeholder="Abc12345"
                           value={dataUser.password} onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password}/>}
                </Form.Field>
                <Form.Field error={!!errors.confirmPassword}>
                    <label htmlFor="password">Confirm Password :</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Abc12345"
                           value={dataUser.confirmPassword} onChange={this.onChange}
                    />
                    {errors.confirmPassword && <InlineError text={errors.confirmPassword}/>}
                </Form.Field>
                <Form.Field error={!!errors.phoneNumber}>
                    <label htmlFor="text">Số Điện thoại : </label>
                    <input type="text" id="phoneNumber" name="phoneNumber" placeholder="0120000000"
                           value={dataUser.phoneNumber} onChange={this.onChange}
                    />
                    {errors.phoneNumber && <InlineError text={errors.phoneNumber}/>}
                </Form.Field>
                <Button primary>Đăng ký</Button>
            </Form>
        )
    }
}

AddUserForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

export default AddUserForm;