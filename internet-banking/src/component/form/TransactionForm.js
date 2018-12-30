import React from 'react';
import PropsTypes from 'prop-types';
import {Form, Button, Message} from 'semantic-ui-react';
import InlineError from '../messages/InlineError';

class TransactionForm extends React.Component {
    render() {
        return (
            <div>Transacsion Form</div>
        )
    }

}

TransactionForm.propTypes = {
    submit: PropsTypes.func.isRequired
};

export default TransactionForm;