app.factory("tokenFactory",['$http','SERVER_PORT','SERVICE_URL', function($http,SERVER_PORT, SERVICE_URL){

    console.log("Inside the tokenFactory======================");

    var token;

    function getTokenDummy(){
        console.log("Inside the getTokenDummy :: token100");
        token = 'token100';
        return token;
    }

    return {
        getToken: function() {
            //set authentication header. Hardcoded
            var config = {
                headers:{ 'Authorization': 'Basic-token100'}
            }
         
            return $http({
                 url: SERVER_PORT+SERVICE_URL.TOKEN_SERVICE_URL,
                 method:'POST',
                 config,
                 data: {
                     'bearertoken':'token100'
                 }
             })
        },
        token: function() {
            if((token === undefined) || (token !== undefined && token.length == 0)) {
                return getTokenDummy();
            } else {
                return token;
            }
        }
    }
}]);
