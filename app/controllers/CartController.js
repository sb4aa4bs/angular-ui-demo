app.controller('CartController',['$scope','$location','$http','cartFactory',"tokenFactory",                                                                                        function($scope,$location,$http,cartFactory,tokenFactory){

    console.log('Inside CartController ====================');
    $scope.cartItems = [];


    $scope.cartItemsDetails=[];
    $scope.totalCartAmount = 0;
    $scope.totalCartSize=0;
    $scope.getProductDetails = function(){
         var currentCartItem = cartFactory.getAllCartItems();
            cartFactory.totalCartSize = currentCartItem.length;
            $scope.totalCartSize = currentCartItem.length;
           for(var i =0;i< currentCartItem.length;i++) {
              if(currentCartItem[i].isAccessory){
                   $scope.totalCartAmount = $scope.totalCartAmount + parseFloat(currentCartItem[i]['sale_price']);
                   $scope.cartItemsDetails.push(angular.fromJson(currentCartItem[i]));
               }else{
                cartFactory.getCartProductDetails(currentCartItem[i].id).then(function success(response){
                  console.log(response.data);
                  var result = response.data[0];
                  result.quantity = 1;
                  $scope.totalCartAmount = $scope.totalCartAmount + parseFloat(result['sale_price']);
                  $scope.cartItemsDetails.push(result);
                 },
                 function error(response){
                     console.log('Error ::'+ response);
                 });
              }
         }
     }




    $scope.checkout = function(cartItemsDetails){
         console.log('Inside checkout, redirecting to /personalInfo ====================');
         var cartInfo = {};
         var items = [];
         cartInfo["id"] = tokenFactory.token();
         cartItemsDetails.forEach(function(cartItem){
           var item = {};
           item["id"] = cartItem.id;
           item["price"] = cartItem["sale_price"];
           item["tax"] = 4;
           items.push(item);
         });        
         cartInfo["items"] = items;
         cartInfo["total"] = $scope.totalCartAmount;         
         cartFactory.setCart(cartInfo);
         console.log("New Token"+JSON.stringify(cartInfo));
        $location.path('/personalInfo');
    };


    $scope.buttonNames={
        "cart":"Add To Cart"
    };

}])
