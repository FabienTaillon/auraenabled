public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static Contact getContact() {
        return [
            SELECT Id, FirstName, LastName, Title, Phone, Email
            FROM Contact
            WHERE LastName = 'Hendricks'
            LIMIT 1
        ];
    }

    @AuraEnabled
    public static void updateContact(Contact myContact) {
        System.debug(myContact);
        update myContact;
    }
}