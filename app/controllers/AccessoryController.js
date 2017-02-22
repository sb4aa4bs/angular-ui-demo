app.controller('AccessoryController',['$scope','$http','$location','cartFactory','tokenFactory','SERVER_PORT','SERVICE_URL',
                                       function($scope,$http, $location,cartFactory,tokenFactory,SERVER_PORT, SERVICE_URL){
      $scope.accesoryList = "";
      $scope.viewby = 3;
      $scope.totalItems = $scope.accesoryList.length;
      $scope.currentPage = 1;
      $scope.itemsPerPage = $scope.viewby;
      $scope.maxSize = 5; //Number of pager buttons to show
      $scope.noResults = false;
      $scope.totalCartSize =  cartFactory.totalCartSize
      var auth_token = tokenFactory.token();
      $scope.accessoryDetails = "";                                           
    //Get all accessories => $http call
    $scope.getAccessories =function(){
      $scope.token = tokenFactory.token();
      console.log('Inside the ProductController::after $scope.token====='+ $scope.token);

       var url = SERVER_PORT+SERVICE_URL.ACCESSORY_URL;
       if($scope.skuId != undefined){
          url = url+"/"+$scope.skuId;
       }
       $http({
        method:'GET',
        url: url,
       headers: {
           "Content-Type": "application/json",
            "authorization": auth_token
        }
       }).then(function success(response){
        $scope.accesoryList= response.data;
        $scope.totalItems = $scope.accesoryList.length;
        $scope.skuId = undefined;
           if($scope.accesoryList.length ==0){
               $scope.noResults = true;
           }

        },
         function error(response){

        });

     }
    
    $scope.getAccessoryDetails = function(accessoryId){
        cartFactory.getAccessoryDetails(accessoryId).then(function success(response){
          console.log(response.data);
          var result = response.data[0];
           result.quantity = 1;
           $scope.accessoryDetails = result;
         },
         function error(response){
             console.log('Error ::'+ response);
         });
        
    }
    

     $scope.addItemsToCart =function(itemObj){
       itemObj.isAccessory = true;
         cartFactory.addToCart(itemObj);
           $location.path('/cart');

      }

    $scope.buttonNames={
         "cart":"Add To Cart"
     }

     //Pagination Code
     $scope.previous= function(currentPage){
         $scope.currentPage = $scope.currentPage -1;
     }

     $scope.next= function(currentPage){
         $scope.currentPage = $scope.currentPage +1;
     }



     $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };

     $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage);

      };

     $scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first paghe
    }
}])
