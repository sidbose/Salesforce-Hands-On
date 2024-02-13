public with sharing class SearchAccountDataController {
    
    @AuraEnabled( cacheable = true )
    public static List<OutputWrapper> getAccountData(InputWrapper input){
        System.debug('input:: '+ input);
        List<OutputWrapper> resutls = new List<OutputWrapper>();
        List<Account> accounts = new List<Account>();
        try {
            Boolean isFiltered = false;
            String query = 'SELECT Name, (SELECT Name,Phone FROM Contacts), (SELECT Name, StageName FROM Opportunities) FROM Account WHERE Name!=NULL';
            if(String.isNotEmpty(input.name)) {
                isFiltered = true;
                query += ' AND Name LIKE \'%'+input.name + '%\'';
            }
            if(String.isNotEmpty(input.name)) {
                isFiltered = true;
                query += ' AND Industry LIKE \'%'+input.industry + '%\'';
            }
            if(isFiltered) {
                accounts = Database.query(query);
            }
            if(!accounts.isEmpty()) {
                for(Account account : accounts) {
                    if(!account.Contacts.isEmpty()) {
                        for(Contact con: account.Contacts) {
                            OutputWrapper output = new OutputWrapper();
                            output.accountName = account.Name;
                            output.type = 'Contact';
                            output.contactName = con.Name;
                            output.phone = con.Phone;
                            output.keyfield = con.ID;
                            resutls.add(output);
                        }
                    }

                    if(!account.Opportunities.isEmpty()) {
                        for(Opportunity opp: account.Opportunities) {
                            OutputWrapper output = new OutputWrapper();
                            output.accountName = account.Name;
                            output.type = 'Opportunity';
                            output.opportunityName = opp.Name;
                            output.stage = opp.StageName;
                            output.keyfield = opp.ID;
                            resutls.add(output);
                        }
                    }
                }
            }            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return resutls;
    }

    public class InputWrapper {
        @AuraEnabled
        public String name {get;set;}
        @AuraEnabled
        public String industry {get;set;}
    }

    public class OutputWrapper {
        @AuraEnabled
        public ID keyfield;
        @AuraEnabled
        public String accountName;
        @AuraEnabled
        public String type;
        @AuraEnabled
        public String opportunityName;
        @AuraEnabled
        public String stage;
        @AuraEnabled
        public String contactName;
        @AuraEnabled
        public String phone;
    }
}