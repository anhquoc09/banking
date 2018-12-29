import React from 'react';
import PropsTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class AddMoneyForm extends React.Component {
    state = {
        dataMoney: {
            cmnd: "",
            accountBankNo: "",
            money: ""
        },
        errors: {},
    };

    onChange = e => this.setState({
        dataMoney: {...this.state.dataMoney, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.dataMoney);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.props
                .submit(this.state.dataMoney)
                .catch(err => this.setState({errors: {msg: err.response.data.msg}}));
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
        const {dataMoney, errors} = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                {errors.msg && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.msg}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.cmnd}>
                    <label htmlFor="text">CMND or CCCD :</label>
                    <input type="text" id="cmnd" name="cmnd" placeholder="012345678910"
                           value={dataMoney.fullname} onChange={this.onChange}
                    />
                    {errors.cmnd && <InlineError text={errors.cmnd}/>}
                </Form.Field>
                <Form.Field error={!!errors.accountBankNo}>
                    <label htmlFor="text">Số tài khoản :</label>
                    <input type="text" id="accountBankNo" name="accountBankNo" placeholder="012345789100001"
                           value={dataMoney.accountBankNo} onChange={this.onChange}
                    />
                    {errors.accountBankNo && <InlineError text={errors.accountBankNo}/>}
                </Form.Field>
                <Form.Field error={!!errors.money}>
                    <label htmlFor="text">Số tiền :</label>
                    <input type="number" id="money" name="money" placeholder="200000"
                           value={dataMoney.money} onChange={this.onChange}
                    />
                    {errors.money && <InlineError text={errors.money}/>}
                </Form.Field>
                <Button primary>Nạp tiền</Button>
            </Form>
        )
    }

}

AddMoneyForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

export default AddMoneyForm;