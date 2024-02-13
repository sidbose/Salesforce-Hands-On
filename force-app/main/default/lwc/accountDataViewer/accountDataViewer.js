import { LightningElement } from 'lwc';
import getAccountData from '@salesforce/apex/SearchAccountDataController.getAccountData'

const COL = [
    {
        label: 'Account Name',
        fieldName: 'accountName',
        type: 'text'
    },
    {
        label: 'Record Type',
        fieldName: 'type',
        type: 'text'
    },
    {
        label: 'Contact Name',
        fieldName: 'contactName',
        type: 'text'
    },
    {
        label: 'Phone',
        fieldName: 'phone',
        type: 'text'
    },
    {
        label: 'Opportunity name',
        fieldName: 'opportunityName',
        type: 'text'
    },
    {
        label: 'Stage',
        fieldName: 'stage',
        type: 'text'
    }
];

export default class AccountDataViewer extends LightningElement {

    columns = COL;
    data;
    error;

    input = {
        name: '',
        industry: ''
    }

    handleNameChange(event) {
        this.input = {
            ...this.input,
            name: event.target.value
        }
    }

    handleIndustryChange(event) {
        this.input = {
            ...this.input,
            industry: event.target.value
        }
    }

    handleSearch(event) {
        console.log('inside handleSearch');
        event.preventDefault();
        console.log('this.input:: ' + this.input);
        getAccountData({ input: this.input })
            .then(result => {
                console.log('result:: ' + JSON.stringify(result));
                this.data = result;
            })
            .catch(error => {
                console.log('error: ' + JSON.stringify(error));
                this.error = error;
            })
    }
}