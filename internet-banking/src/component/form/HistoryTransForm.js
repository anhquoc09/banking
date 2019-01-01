import React from 'react';
// import PropsTypes from "prop-types";
import {Dropdown,Table} from 'semantic-ui-react';
import api from '../../api';
import {connect} from 'react-redux';

class HistoryTransForm extends React.Component{
    state={
        data : [],
        loading: false,
        value : "",
        options: [],
    };

    componentDidMount = () => {
        var dataTemp = [];
        var optionsTemp = [];
        api.user.findAccount(this.props.user.idUser).then(res=> {
            dataTemp = res.map(({accountBankNo})=>({accountBankNo: accountBankNo}));
            optionsTemp = res.map(({accountBankNo}) => ({value: accountBankNo,text: accountBankNo}));
            this.setState({options: optionsTemp});

            dataTemp.forEach(value => {
                api.user.showHistoryTrans(value.accountBankNo).then(callback => {
                    value.transactions = callback;
                })
            });
            this.setState({data:dataTemp});
        });
    };

    onChange = (e,data) => {
        this.setState({value: data.value});
        console.log(data.value);
        if(e.target.textContent === "" ){
            this.setState({loading: false});
        }else{
            this.setState({loading: true});
        }
    };

    render() {
        const {data,options,loading,value} = this.state;
        const transactions = data.find(x => x.accountBankNo === value);
        return(
            <div className="ui container">
                <Dropdown clearable options={options} selection onChange={this.onChange}/>
                {loading && (
                    <div className="ui container">
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Số Tài Khoản Chuyển</Table.HeaderCell>
                                    <Table.HeaderCell>Số Tiền</Table.HeaderCell>
                                    <Table.HeaderCell>Nội dung</Table.HeaderCell>
                                    <Table.HeaderCell>Ngày Chuyển</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {transactions.transactions.length > 0 && transactions.transactions.map(res=>(
                                    <Table.Row key={res.accountBankNo}>
                                        <Table.Cell>{res.accountTransferTo}</Table.Cell>
                                        <Table.Cell>{res.transferMoney}</Table.Cell>
                                        <Table.Cell>{res.notes}</Table.Cell>
                                        <Table.Cell>{res.createDate}</Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps)(HistoryTransForm);