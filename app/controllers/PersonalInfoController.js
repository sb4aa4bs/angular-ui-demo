//Controller for handling Personal Information Details
app.controller('PersonalInfoController', ['$rootScope','$scope', '$location','cartFactory', '$http','SERVER_PORT','SERVICE_URL','tokenFactory', function($rootScope,$scope, $location, cartFactory,$http,SERVER_PORT,SERVICE_URL,tokenFactory){
  var auth_token = tokenFactory.token();
    console.info('Inside personalInfoController ===================');
    $scope.totalCartSize =  cartFactory.totalCartSize

    $scope.getCreditratingtypes = function(){
        console.log("Inside PersonalInfoController =>getCreditratingtypes");
        var url = SERVER_PORT+SERVICE_URL.CREDIT_TRATING_TYPES;

        $http({
            method:'GET',
            url: url,
            headers:{
               "authorization":auth_token
            }
        }).then(function success(response){
               console.log(response.data.message);
            console.log(angular.toJson(response.data.items));
               $scope.creditTratingTypes=response.data.items;
          },
          function error(response){
               console.error('PersonalInfoController->getCreditratingtypes->Error ::'+ response.data);
          })
    }


    $scope.personalInfoFormSubmit = function(personalInfo) {
        console.info(JSON.stringify(personalInfo));
        delete personalInfo['cemail'];
        personalInfo['expirydate'] = personalInfo['expirymonth']+"/"+personalInfo['expiryyear'].toString().substring(2,personalInfo['expiryyear'].toString().length)
        delete personalInfo['expirymonth'];
        delete personalInfo['expiryyear'];
        delete personalInfo['acceptInfo'];

        personalInfo['shiptype'] = "GROUND";
        personalInfo['billaddress1'] = personalInfo['shipaddress1'];
        personalInfo['billaddress2'] = personalInfo['shipaddress2'];
        personalInfo['billcity'] = personalInfo['shipcity'];
        personalInfo['billstate'] = personalInfo['shipstate'];
        personalInfo['billzip'] = personalInfo['shipzip'];
        personalInfo['store'] = "TMOBILE-US";
        personalInfo['creditreportusagetype'] = personalInfo['creditreportusagetype']['id'];
        cartFactory.personalInfo = personalInfo;
        console.info('From Cart Factory ::'+ JSON.stringify(cartFactory.personalInfo));
        cartFactory.prepareFinalCart(cartFactory.personalInfo);
        var finalCart = cartFactory.getFinalCart();
        console.log('finalCart ::'+ finalCart);



        //submit the call.
           var url = SERVER_PORT+SERVICE_URL.CHECKOUT_URL;
           $http({
            method:'POST',
            url: url,
            data: finalCart,
            headers: {
               "Content-Type": "application/json",
                "authorization": auth_token
            }
           }).then(function success(response){
               console.log(response.data.order_id);             
               cartFactory.orderId = response.data.order_id;   
               $location.path('/orderConfirm');
          },
          function error(response){
               console.error('ShippingInfoController->shippingInfoFormSubmit->Error ::'+ response.data);
          });
        
    }

    $scope.gotoShippingInfo = function() {
        console.info('Inside gotoShippingInfo, routing to /shippingInfo ===================');
        $location.path('/shippingInfo');
    }

    $scope.currentCarriers=["AT&T","Verizon","Sprint","Others"];
    $scope.numberPattern = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
    $scope.stateList = ["AL","AK","AZ","AR","CA","CO"];
    $scope.zipPattern = /^(\d{5}-\d{4}|\d{5})$/;

}]);
