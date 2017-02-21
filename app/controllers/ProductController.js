app.controller('ProductController',['$scope','$http', '$location','tokenFactory','cartFactory','SERVER_PORT','SERVICE_URL',
                            function($scope,$http, $location, tokenFactory, cartFactory,SERVER_PORT, SERVICE_URL){

      $scope.productList = "";
      $scope.viewby = 3;
      $scope.totalItems = $scope.productList.length;
      $scope.currentPage = 1;
      $scope.itemsPerPage = $scope.viewby;
      $scope.maxSize = 5; //Number of pager buttons to show
      $scope.noResults = false;
      $scope.isProduct = true;
      $scope.stringLimit = 50;

    console.log('Inside the ProductController=======================');


    $scope.getproducts =function(){
        console.log('Inside the ProductController::before $scope.token=======================');
        $scope.token = tokenFactory.token();
        console.log('Inside the ProductController::after $scope.token====='+ $scope.token);

       
       var url = SERVER_PORT+SERVICE_URL.PRODUCTS_URL;
       var method = 'GET';

       if($scope.productSkuId != undefined){
          url = SERVER_PORT+SERVICE_URL.PRODUCTS_SKU_URL+$scope.productSkuId;
          method = 'POST';
       }

       $http({
        method:method,
        url: url
       }).then(function success(response){
        $scope.productList= response.data;
        $scope.totalItems = $scope.productList.length;
        $scope.productSkuId = undefined;
           if($scope.productList.length ==0){
               $scope.noResults = true;
           }
        },
         function error(response){
        });
     } // end of getproducts

    $scope.addItemsToCart =function(itemObj){        
          cartFactory.addToCart(itemObj);
          $location.path('/cart');

     } // End of addItemsToCart

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
    };

    // For deleting the unwanted keys from the JSON before storing in cart.
    $scope.storeToCart = function(itemObj) {
        if(itemObj.$$hashKey) {
            delete itemObj.$$hashKey;
        }
        console.log('After Removing ==='+ JSON.stringify(itemObj));
    }


    $scope.myValue=false;
}]);
