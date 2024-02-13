import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountController.getAllAccounts'

//message service imports
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService'
import MESSAGE_CHANNEL from '@salesforce/messageChannel/MyPracticeAppChannel__c'

export default class AccountData extends LightningElement {

    @wire(MessageContext)
    messageContext;

    subscription = null;
    searchKey = '';

    columns = [
        { label: 'Institution Name', fieldName: 'Name' },
        { label: 'Address', fieldName: 'BillingAddress' },
        { label: 'Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
        { label: 'Number of Employees', fieldName: 'NumberOfEmployees', type: 'number' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }
    ]

    data;
    error;

    @wire(getAllAccounts, { searchKey: '$searchKey' })
    populateData({ data, error }) {
        if (data) {
            this.data = data
            this.error = undefined;
        }
        if (error) {
            this.error = error;
            this.data = undefined;
        }
    };

    subscribeToMessageChannel() {
        this.subscription = subscribe(this.messageContext, MESSAGE_CHANNEL, (message) => {
            this.searchKey = message.searchKey;
        }, { scope: APPLICATION_SCOPE });
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

}