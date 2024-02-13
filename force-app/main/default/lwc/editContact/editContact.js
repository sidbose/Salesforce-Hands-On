import { LightningElement, api } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import NAME_FIELD from '@salesforce/schema/Contact.Name';
import ACCOUNT_NAME from '@salesforce/schema/Contact.AccountId';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

export default class EditContact extends LightningElement {

    /*@api objectApiName;*/
    //@api recordId;

    objectApiName = CONTACT_OBJECT;

    fields = [NAME_FIELD, ACCOUNT_NAME, EMAIL_FIELD, PHONE_FIELD];

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Phone = '22222222222';
        this.template.querySelector('lightning-record-form').submit(fields);
    }
}