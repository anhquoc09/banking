import React from 'react';
import PropsTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class AddAccountBankForm extends React.Component {
    state = {
        dataAccount: {
            cmnd: "",
            accountBankNo: "",
            money: "",
        },
        errors: {},
    };

    onChange = e => this.setState({
        dataAccount: {...this.state.dataAccount, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.dataAccount);
        this.setState({errors});
        if(Object.keys(errors).length === 0){
            this.props
                .submit(this.state.dataAccount)
                .catch(err => this.setState({errors: {msg: err.response.data}}));
        }
    };

    validate = data => {
        const errors = {};
        if(!data.cmnd) errors.cmnd = "Can't be blank";
        if(!data.accountBankNo) errors.accountBankNo = "Can't be blank";
        if(!data.money) errors.money = "Can't be blank";

        return errors;
    };

    render() {
        const {dataAccount, errors} = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                {errors.msg && (
                    <Message>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.msg}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.cmnd}>
                    <label htmlFor="text">CMND or CCCD :</label>
                    <input type="text" id="cmnd" name="cmnd" placeholder="012345678910"
                           value={dataAccount.cmnd} onChange={this.onChange}
                    />
                    {errors.cmnd && <InlineError text={errors.cmnd}/>}
                </Form.Field>
                <Form.Field error={!!errors.accountBankNo}>
                    <label htmlFor="text">Số tài khoản :</label>
                    <input type="text" id="accountBankNo" name="accountBankNo" placeholder="0123456789100001"
                           value={dataAccount.accountBankNo} onChange={this.onChange}
                    />
                    {errors.accountBankNo && <InlineError text={errors.accountBankNo}/>}
                </Form.Field>
                <Form.Field error={!!errors.money}>
                    <label htmlFor="text">Số dư tài khoản :</label>
                    <input type="number" id="money" name="money" placeholder="Nguyen Van A"
                           value={dataAccount.money} onChange={this.onChange}
                    />
                    {errors.money && <InlineError text={errors.money}/>}
                </Form.Field>
                <Button primary>Tạo Tài Khoản</Button>
            </Form>
        )
    }
}

AddAccountBankForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

export default AddAccountBankForm;