import { LightningElement, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getContact from '@salesforce/apex/ContactController.getContact';
import updateContact from '@salesforce/apex/ContactController.updateContact';

export default class MyContact extends LightningElement {

    myContact;
    draftContact;

    @wire(getContact)
    wiredGetContact(value) {
        // Hold on to the provisioned value so we can refresh it later.
        this.wiredContact = value;
        // Destructure the provisioned value 
        const { data, error } = value;
        if (data) {
            this.myContact = data;

            // Cloning object as data from wire is immutable
            this.draftContact = Object.assign({}, data);
        }
        else if (error) { 
            console.log(error);
        }
    }

    handleUpdate() {
        updateContact({
            myContact: this.draftContact
        })
        .then(() => {
            refreshApex(this.wiredContact);
        })
        .catch((error) => {
            console.log('ERROR:');
            console.log(error);
        });
    }

    handleFirstNameUpdate(event) {
        this.draftContact.FirstName = event.target.value;
    }
}