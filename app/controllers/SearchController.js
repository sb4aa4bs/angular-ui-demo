app.controller('SearchController',function($scope,$http,$location){
      $scope.accesoryList = "";     
      $scope.viewby = 3;
      $scope.totalItems = $scope.accesoryList.length;
      $scope.currentPage = 1;
      $scope.itemsPerPage = $scope.viewby;
      $scope.maxSize = 5; //Number of pager buttons to show   
      $scope.noAccessories = false;
    

   $scope.getAccessories =function(){       
       var url = 'http://localhost:3000/accessories';
       if($scope.skuId != undefined){
          url = 'http://localhost:3000/accessories/'+$scope.skuId;
       }
       $http({
        method:'GET',
        url: url
       }).then(function success(response){       
        $scope.accesoryList= response.data; 
        $scope.totalItems = $scope.accesoryList.length;
        $scope.skuId = undefined;
           if($scope.accesoryList.length ==0){
               $scope.noAccessories = true;
           }
        
        },
         function error(response){
        
        });
    
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
     
     //add items to cart.
     //addItemsToCart
        $scope.addItemsToCart =function(itemObj){       
           var url = 'http://localhost:3000/cart';
           $http({
            method:'POST',
            url: url,
            data: {
              "cart_id": "100",
              "item_id": "itemObj.skuid",
              "nitems": "2"
            },
            headers: {
               "Content-Type": "application/json"
            }   
           }).then(function success(response){       
          },
          function error(response){
          });

          $location.path('/cart');            
        
     }
    
    $scope.myValue=false;
})