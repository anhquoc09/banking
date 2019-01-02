import React from 'react';
import {Table, Button,Message} from 'semantic-ui-react';
import NavbarUser from './navbarUser';
import {connect} from 'react-redux';
import api from '../../api';
import PropsTypes from "prop-types";
import * as actions from '../../actions/auth';

class ShowAccountBankPageUser extends React.Component {
    state = {
        dataAccount: [],
        errors: {}
    };

    componentDidMount = () => {
        api.user.showAccountBank(this.props.user.idUser).then(res => this.setState({dataAccount: res}));
    };

    onSubmit = (idUser, accountBankNo) => {
        this.props
            .closeAccount(idUser, accountBankNo)
            .then(() => {
                this.componentDidMount();
            })
            .catch(err => {
                this.setState({
                    errors: {
                        msg: err.response.data.msg
                    }
                })
            })
        ;
    };

    render() {
        const {errors} = this.state;
        console.log(this.state.dataAccount);
        return (
            <div className="ui container">
                <NavbarUser/>
                {errors.msg && (
                    <Message negative>
                        <Message.Header>Something went wrong</Message.Header>
                        <p>{errors.msg}</p>
                    </Message>
                )}
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Số Tài Khoản</Table.HeaderCell>
                            <Table.HeaderCell>Số dư</Table.HeaderCell>
                            <Table.HeaderCell>Ngày tạo </Table.HeaderCell>
                            <Table.HeaderCell>Đóng tài khoản</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.dataAccount.length > 0 && this.state.dataAccount.map(value => (
                            <Table.Row key={value.accountBankNo}>
                                <Table.Cell>{value.accountBankNo}</Table.Cell>
                                <Table.Cell>{value.money}</Table.Cell>
                                <Table.Cell>{value.createDate}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        basic color="red" icon="trash"
                                        onClick={() => {
                                            this.onSubmit(this.props.user.idUser, value.accountBankNo)
                                        }}/>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

ShowAccountBankPageUser.propsTypes = {
    user: PropsTypes.shape({email: PropsTypes.string.isRequired}).isRequired,
    closeAccount: PropsTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps, {closeAccount: actions.closeAccount})(ShowAccountBankPageUser);