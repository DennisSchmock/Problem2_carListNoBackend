var app = angular.module('carApp', ['ngRoute']);

app.controller('viewCarController', function ($scope, carList,$routeParams) {

    $scope.cars = carList.getAll();
    $scope.title = "Cars Demo App";
    $scope.predicate = "year";
    $scope.reverse = false;

    $scope.delete = function (id) {
        carList.deleteCar(id);
        window.console.log("delete");
    };
});

app.controller('addCarController', function ($scope, carList, $location) {

    $scope.save = function () {
        carList.addCar($scope.newCar);
        $location.path('/list');
    };


});

app.controller('editCarController', function ($scope, carList, $routeParams, $location) {
    $scope.id = $routeParams.id;
    $scope.newCar = carList.getCar($scope.id);

    $scope.save = function () {
        carList.addCar($scope.newCar);
        $location.path('/list');

    };

});


app.config(function ($routeProvider) {
    $routeProvider
            .when("/edit/:id", {
                templateUrl: "templates/addCar.html",
                controller: "editCarController"
            })
            .when("/list", {
                templateUrl: "templates/allCars.html",
                controller: "viewCarController"
            }) .when("/delete/:id", {
                templateUrl: "templates/allCars.html",
                controller: "viewCarController"
            })
            .when("/add", {
                templateUrl: "templates/addCar.html",
                controller: "addCarController"
            })

            .otherwise({
                redirectTo: "/list"
            });
});



app.factory('carList', function () {
    var cars = [
        {id: 1, year: 1997, registered: new Date(1999, 3, 15), make: 'Ford', model: 'E350', description: 'ac, abs, moon', price: 3000}
        , {id: 2, year: 1999, registered: new Date(1996, 3, 12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900}
        , {id: 3, year: 2000, registered: new Date(199, 12, 22), make: 'Chevy', model: 'Venture', description: '', price: 5000}
        , {id: 4, year: 1996, registered: new Date(2002, 3, 15), make: 'Jeep', model: 'Grand Cherokee', description: 'Air, moon roof, loaded', price: 4799}

    ];
    return{
        getAll: function () {
            return cars;
        },
        getCar: function (id) {
            for (var i in cars) {
                if (cars[i].id == id)
                    return cars[i];
            }
            return cars[id];
        },
        addCar: function (newCar) {
            if (newCar.id == null) {
                newCar.id = cars.length + 1;
                cars.push(newCar);
            } else {
                for (var i in cars) {
                    if (cars[i].id == newCar.id) {
                        cars[i] = newCar;
                    }
                }
            }
        },
        deleteCar: function (id) {
            
            for (var i in cars) {
                if (cars[i].id == id) {
                    cars.splice(i,1);
                }
            }
        }


    };


});
