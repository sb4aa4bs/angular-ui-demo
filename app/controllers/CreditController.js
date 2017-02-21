//Controller for handling Personal Information Details
app.controller('CreditController', ['$scope', '$location', 'cartFactory', function($scope, $location, cartFactory){
    var creditInfo = {};
    
    console.info('Inside CreditController ===================');
    
    $scope.creditFormSubmit = function(creditInfo) {
        console.info(JSON.stringify(creditInfo));
        
        //push the data to personal info json        
        angular.forEach(creditInfo, function(value, key){
            cartFactory.personalInfo[key] = value;
        });        
        cartFactory.prepareFinalCart(cartFactory.personalInfo);
        creditInfo = {};        
        $location.path('/orderInfo');   
    }
                                          
    $scope.myValue=false;
                                       
}]);