//Controller for handling Personal Information Details
app.controller('ShippingInfoController', ['$rootScope','$scope', '$location','$http','cartFactory', function($rootScope, $scope, $location, $http, cartFactory){
    var shippingInfo = {};
                                          
    console.info('Inside shippingInfoController =========='); 
    
    $scope.shippingInfoFormSubmit = function(shippingInfo) {
        console.info(JSON.stringify(shippingInfo));
        //push the data to personal info json
        
        angular.forEach(shippingInfo, function(value, key){
           // if(key !=='cemail' || key !=='accept' || key !=='acceptBilling' || key !=='store' || key !=='creditreportusuagetype'){
            if(key !='cemail' && key !='accept' && key !='acceptBilling' ){
                cartFactory.personalInfo[key] = value;
            }
            
        });
        cartFactory.personalInfo['shiptype'] = 'GROUND';
        
        console.info('From Cart Factory ::'+ JSON.stringify(cartFactory.personalInfo));
        
        //TODO: If billing address checked, billing same as customer address.
        cartFactory.personalInfo['billaddress1'] = cartFactory.personalInfo['shipaddress1'];
        cartFactory.personalInfo['billaddress2'] = cartFactory.personalInfo['shipaddress2'];
        cartFactory.personalInfo['billcity'] = cartFactory.personalInfo['shipcity'];
        cartFactory.personalInfo['billstate'] = cartFactory.personalInfo['shipstate'];
        cartFactory.personalInfo['billzip'] = cartFactory.personalInfo['shipzip'];
        
        //cartFactory.personalInfo['store'] = 'TMOBILE-ONLINE';        
        //cartFactory.personalInfo['creditreportusuagetype'] = 'AWESOME-CREDIT';
        
        shippingInfo = {};
        cartFactory.prepareFinalCart(cartFactory.personalInfo);
         var finalCart = cartFactory.getFinalCart();
        
         //submit the call.
           var url = 'http://localhost:3000/checkout/submit/all';
           $http({
            method:'POST',
            url: url,
            data: {
              finalCart
            },
            headers: {
               "Content-Type": "application/json",
                "authorization": "AUTH100"
            }
           }).then(function success(response){
               console.log(response.data.message);
               $rootScope.successmessage=response.data.message;
          },
          function error(response){
               console.error('ShippingInfoController->shippingInfoFormSubmit->Error ::'+ response.data);
          });
        
        $location.path('/welcome');   
    }
    
//    $scope.gotoShippingInfo = function() {
//        $location.path('/shippingInfo');                                      
//    }
                                          
   $scope.myValue=false;
                                       
}]);