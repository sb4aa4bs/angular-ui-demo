app.factory("cartFactory",['$http','SERVER_PORT','SERVICE_URL','tokenFactory', function($http,SERVER_PORT,SERVICE_URL,tokenFactory){

    console.log("Inside the cartFactory======================");

    var cartItems = [];
    var personalInfo = {};
    var finalCartInfo = {};
     var creditInfo = {};
    var orderId = "";
    var totalCartSize = 0;
    var auth_token = tokenFactory.token();
    return {
        
        addToCart: function(items) {
          console.log("itmes values"+ cartItems.length);
            console.log("current item "+ angular.toJson(items));
           var quantity = 1;
             items.quantity = quantity;
             cartItems.push(items);
        },

        setItem: function(key, value){
            console.log('key ::'+ key);
            console.log('value::'+ JSON.stringify(value));
            cartItems.push(value);
        },

        getAllCartItems: function(){
            return cartItems;
        },

        getItem: function(key){
             return cartItems[key];
        },

        setCart: function(obj){
            finalCartInfo['cart'] = obj;
            console.info('cartFactory->setCart::'+ angular.toJson(finalCartInfo));
        },

        prepareFinalCart: function(obj) {
            finalCartInfo['customer'] = obj;
            console.info('cartFactory->prepareFinalCart::'+ angular.toJson(finalCartInfo));
        },

        getFinalCart: function(){
            return angular.toJson(finalCartInfo);
        },

        getCartProductDetails: function(id){
            console.log('Inside Cartservice => getCartProductDetails ====================');
           var url = SERVER_PORT+SERVICE_URL.PRODUCT_DETAILS_URL+id;

           return $http({
                method:'GET',
                url: url,
               headers: {
               "Content-Type": "application/json",
                "authorization": auth_token
            }
            });
        },
        
        getAccessoryDetails: function(id){
            console.log('Inside Cartservice => getAccessoryDetails ====================');
           var url = SERVER_PORT+SERVICE_URL.ACCESSORY_DETAILS_URL+id;

           return $http({
                method:'GET',
                url: url,
               headers: {
               "Content-Type": "application/json",
                "authorization": auth_token
              }
            });
        },
        
        clearAll: function(){
           cartItems = [];
           personalInfo = {};
           finalCartInfo = {};
           creditInfo = {};
           totalCartSize = 0;
         }

    }
}]);
