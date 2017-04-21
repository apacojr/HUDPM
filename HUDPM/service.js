/// <reference path="C:\Users\Jon\Desktop\HUDPM\HUDPM\HUDPM\Scripts/angular.js" />

var EmployeeService = angular.module('EmployeeService', []);

EmployeeService.factory('EmpApi', function($http) {

    var urlBase = "http://localhost:54455/api";
    var EmpApi = {};

    // GET
    EmpApi.getEmployees = function() {
        return $http.get(urlBase + '/Employees');
    };

    // ADD
    EmpApi.AddEmployee = function(emp) {
        return $http.post(urlBase + '/Employees/', emp);
    }

    // EDIT
    EmpApi.EditEmployee = function(empToUpdate) {
       return $http.put(urlBase + '/Employees/'+ empToUpdate.Id, empToUpdate );
    }
    
    // DELETE
    EmpApi.DeleteEmployee = function (empToDelete) {
        return $http.delete(urlBase + '/Employees/' + empToDelete.Id);
    }

    return EmpApi;
});
