import React from 'react';
import {Table} from 'semantic-ui-react';
import NavbarUser from './navbarUser';
import {connect} from 'react-redux';
import api from '../../api';

class ShowAccountBankPageUser extends React.Component {
    state = {
        dataAccount: [],
    };

    componentDidMount = () => {
        api.user.showAccountBank(this.props.user.idUser).then(res => this.setState({dataAccount: res}));
    };

    render() {
        console.log(this.state.dataAccount);
        return (
            <div className="ui container">
                <NavbarUser/>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Số Tài Khoản</Table.HeaderCell>
                            <Table.HeaderCell>Số dư</Table.HeaderCell>
                            <Table.HeaderCell>Ngày tạo </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.dataAccount.length > 0 && this.state.dataAccount.map(value => (
                            <Table.Row key={value.accountBankNo}>
                                <Table.Cell>{value.accountBankNo}</Table.Cell>
                                <Table.Cell>{value.money}</Table.Cell>
                                <Table.Cell>{value.createDate}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        isAuthenticated: !!state.user.refreshToken
    }
}

export default connect(mapStateToProps)(ShowAccountBankPageUser);