//Controller for handling Personal Information Details
app.controller('OrderInfoController', ['$scope', '$location', 'cartFactory', function($scope, $location, cartFactory){

    console.info('Inside OrderInfoController ===================');

    $scope.orderId =  cartFactory.orderId;  

    cartFactory.clearAll();

}]);
