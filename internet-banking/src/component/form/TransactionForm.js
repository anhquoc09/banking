import React from 'react';
import PropsTypes from 'prop-types';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';
import {connect} from 'react-redux';
import api from '../../api';

class TransactionForm extends React.Component {
    state = {
        dataTrans: {
            idUser: "",
            accountBankNo: "",
            accountTransferTo: "",
            transferMoney: 0,
            notes: "",
        },
        errors: {},
        rememberAccount: [],
    };

    onChange = e => this.setState({
        dataTrans: {...this.state.dataTrans, [e.target.name]: e.target.value}
    });

    onSubmit = () => {
        const errors = this.validate(this.state.dataTrans);
        this.setState({errors});
        this.props
            .submit(this.state.dataTrans)
            .catch(err => this.setState({errors: {msg: err.response.data.msg}}));
    };

    validate = data => {
        const errors = {};
        if (!data.idUser) {
            errors.idUser = "Can't be blank";
        }
        if (!data.accountBankNo) errors.accountBankNo = "Can't be blank";
        if (!data.accountTransferTo) {
            errors.accountTransferTo = "Can't be blank";
        } else if (data.accountTransferTo === data.accountBankNo) {
            errors.accountTransferTo = "Số tài khoản chuyển phải khác số tài khoản của bạn !!!";
        }
        if (!data.transferMoney) errors.transferMoney = "Can't be blank";
        if (!data.notes) errors.notes = "Can't be blank";
        return errors;
    };

    componentDidMount = () => {
        api.user.getAccountHistory(this.props.user.idUser).then(res => this.setState({rememberAccount: res}));
    };

    render() {
        const {dataTrans, errors, rememberAccount} = this.state;
        return (
            <Form onSubmit={this.onSubmit}>
                {errors.msg && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.msg}</p>
                    </Message>
                )}
                <Form.Field error={!!errors.idUser}>
                    <label htmlFor="text">CMND or CCCD :</label>
                    <input type="text" id="idUser" name="idUser" placeholder="012345678910"
                           value={dataTrans.idUser} onChange={this.onChange}
                    />
                    {errors.idUser && <InlineError text={errors.idUser}/>}
                </Form.Field>
                <Form.Field error={!!errors.accountBankNo}>
                    <label htmlFor="text">Số tài khoản :</label>
                    <input type="text" id="accountBankNo" name="accountBankNo" placeholder="0123456789100001"
                           value={dataTrans.accountBankNo} onChange={this.onChange}
                    />
                    {errors.accountBankNo && <InlineError text={errors.accountBankNo}/>}
                </Form.Field>
                <Form.Field error={!!errors.accountTransferTo}>
                    <label htmlFor="text">Số tài khoản chuyển tiền :</label>
                    <div>
                        <Input list='accountTransferTo' placeholder='Choose language...' name='accountTransferTo'
                               onChange={this.onChange}/>
                        <datalist id='accountTransferTo'>
                            {rememberAccount.length > 0 && rememberAccount.map(value => (
                                <option key={value._id} value={value._id}/>
                            ))}
                        </datalist>
                    </div>
                    {errors.accountTransferTo && <InlineError text={errors.accountTransferTo}/>}
                </Form.Field>
                <Form.Field error={!!errors.transferMoney}>
                    <label htmlFor="text">Số tiền chuyển :</label>
                    <input type="number" id="transferMoney" name="transferMoney" placeholder="0123456789100001"
                           value={dataTrans.transferMoney} onChange={this.onChange}
                    />
                    {errors.transferMoney && <InlineError text={errors.transferMoney}/>}
                </Form.Field>
                <Form.Field error={!!errors.notes}>
                    <label htmlFor="text">Nội dung :</label>
                    <input type="text" id="notes" name="notes" placeholder="0123456789100001"
                           value={dataTrans.notes} onChange={this.onChange}
                    />
                    {errors.notes && <InlineError text={errors.notes}/>}
                </Form.Field>
                <Button primary>Chuyển tiền</Button>
            </Form>
        )
    }

}

TransactionForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

function mapSateToProps(state) {
    return {
        user: state.user.user,
    }
}

export default connect(mapSateToProps)(TransactionForm);