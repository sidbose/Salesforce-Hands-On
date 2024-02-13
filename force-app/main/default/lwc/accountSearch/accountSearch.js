import { LightningElement, wire } from 'lwc';

//import for message channel
import { publish, MessageContext } from 'lightning/messageService'
import MESSAGE_CHANNEL from '@salesforce/messageChannel/MyPracticeAppChannel__c'

export default class AccountSearch extends LightningElement {
    searchKey = '';

    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.searchKey = event.target.value;

        const payload = { searchKey: this.searchKey };
        publish(this.messageContext, MESSAGE_CHANNEL, payload);
    }
}