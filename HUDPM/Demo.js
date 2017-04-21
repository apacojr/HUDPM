/// <reference path="C:\Users\Jon\Desktop\HUDPM\HUDPM\HUDPM\Scripts/angular.js" />

var MyApp = angular.module("MyApp", ['ngRoute', 'EmployeeService']);

MyApp.config(['$routeProvider', function ($routeProvider)
{
    $routeProvider.when('/Add',
        {
            templateUrl: 'Views/add.html',
            controller: 'AddController'
        })
        .when('/Edit',
        {
            templateUrl: 'Views/edit.html',
            controller: 'EditController'
        })
        .when('/Delete',
        {
            templateUrl: 'Views/delete.html',
            controller: 'DeleteController'
        })
        .when('/Home',
        {
            templateUrl: 'Views/home.html',
            controller: 'HomeController'
        })
        .otherwise({
            redirectTo: '/Home'
        });
}
]);

MyApp.controller("AddController", function($scope, EmpApi) {
       $scope.addEmp = function() {
           var empToAdd = {
               'Name': $scope.name,
               'Age': $scope.age,
               'Salary': $scope.sal
           };

           EmpApi.AddEmployee(empToAdd)
               .then(function(response) {
                   alert("user added");

                   $scope.name = undefined;
                   $scope.age = undefined;
                   $scope.sal = undefined;

               });
       }
    });

MyApp.controller("DeleteController", function ($scope, EmpApi) {
    $scope.selectedItem = "Select Employee";
    $scope.isDeleteItemVisible = false;

    getEmployees();

    function getEmployees() {
        EmpApi.getEmployees()
            .then(function (result) {
                $scope.emps = result.data;
            });
    }

    $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.Id;
        $scope.name = item.Name;
        $scope.age = item.Age;
        $scope.sal = item.Salary;
        $scope.empid = item.Id;
    }

    $scope.DeleteEmp = function() {
        var empToDelete = {
            'Id': $scope.empid
        };
    
    EmpApi.DeleteEmployee(empToDelete)
            .then(function (response) {
                alert("user deleted");

                $scope.name = undefined;
                $scope.age = undefined;
                $scope.sal = undefined;
                $scope.empid = undefined;
                $scope.selectedItem = "Select Employee";
                $scope.isDeleteItemVisible = false;
                getEmployees();

            });
    }

    });

MyApp.controller("EditController", function ($scope, EmpApi) {
    $scope.selectedItem = "Select Employee";
    $scope.isDeleteItemVisible = false;

    getEmployees();

    function getEmployees() {
        EmpApi.getEmployees()
            .then(function(result) {
                $scope.emps = result.data;
            });
    }

    $scope.dropboxitemselected = function(item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.Id;
        $scope.name = item.Name;
        $scope.age = item.Age;
        $scope.sal = item.Salary;
        $scope.empid = item.Id;
    }

    $scope.UpdateEmp = function() {
        var empToUpdate = {
            'Id': $scope.empid,
            'Name': $scope.name,
            'Age': $scope.age,
            'Salary': $scope.sal
        };

        EmpApi.EditEmployee(empToUpdate)
            .then(function(response) {
                alert("user updated");

                $scope.name = undefined;
                $scope.age = undefined;
                $scope.sal = undefined;
                $scope.empid = undefined;
                $scope.selectedItem = "Select Employee";
                $scope.isDeleteItemVisible = false;
                getEmployees();

            });
    }

});

MyApp.controller("HomeController", function ($scope, EmpApi) {

    getEmployee();
    
    function getEmployee() {
        EmpApi.getEmployees()
            .then(function(result) {
                $scope.emps = result.data;
            });
        //.then(function (error) {
        //    $scope.status = 'Unable to load emp data: ' + error.message;
        //});
    }


    });


