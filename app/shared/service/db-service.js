
serviceModule.service('dbService', ['$rootScope','$cordovaSQLite', 'sharedConstants', function ($rootScope,$cordovaSQLite, sharedConstants) {

    this.createTables = function (dataBase) {
        $cordovaSQLite.execute($rootScope.dataBase, sharedConstants.dbSchema.schema_table);

    };

    this.performDbInsert = function (response) {
        var dbServiceName = response.config.db.insert;
        console.log("dbServiceName : " + dbServiceName);
        if (angular.isFunction(this[dbServiceName])) {
             this[dbServiceName](response);
        }
    };
    
    this.performDbFetch = function (config) {
        var dbServiceName = config.db.fetch;
        console.log("dbServiceName : " + dbServiceName);
        if (angular.isFunction(this[dbServiceName])) {
            this[dbServiceName]();
        }
    };

    this.insertIntoTable = function (response) {
        console.log("response : " + response.data.returnMsg);
        var sql = "INSERT INTO APPROVER (approverName, currencyCode,description,receiptStatus,reportHeaderId,reportNumber,reportStatus,submittedDate,totalAmount) " + "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)";     
        var companies = response.data.ieDetails; // get data from json
        angular.forEach(companies, function (item) {
            var params = [item.approverName, item.currencyCode, item.description,
             item.receiptStatus, item.reportHeaderId, item.reportNumber, item.reportStatus, 
             item.submittedDate, item.totalAmount];
             $rootScope.dataBase.executeSql(sql, params);
        })
    };

    this.fetchFromTable = function () {
        console.log("fetchFromTable");
        //TODO fetch 
    };


}]);