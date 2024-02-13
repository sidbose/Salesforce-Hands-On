public with sharing class AccountController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(String searchKey){
        List<Account> accList = new List<Account>();
        if(String.isBlank(searchKey)) {
            accList = [ SELECT Name,BillingAddress,AnnualRevenue,NumberOfEmployees,Phone FROM Account ];
        }
        else {
            searchKey = '%'+searchKey+'%';
            accList = [ SELECT Name,BillingAddress,AnnualRevenue,NumberOfEmployees,Phone FROM Account WHERE Name LIKE :searchKey];
        }
        return accList;
    }
}
