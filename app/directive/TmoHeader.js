app.directive('tmoHeader',function(){
var directive = {
restrict: 'E',
template:'<div id="undefined-sticky-wrapper" class="sticky-wrapper" style="height: 84px;"><header class="header fixed"><div class="header-wrapper bg-tmo"><div class="container"><!-- Logo --><div class="logo"><a href="#welcome"><img src="./images/t-mobile-logo.png" alt="TMOBILE-US"></a></div><!-- /Logo --><!-- Mobile menu toggle button --><a href="#" class="menu-toggle btn btn-theme-transparent"><i class="fa fa-bars"></i></a><!-- /Mobile menu toggle button -->               </div></div></header></div>'
};
return directive; 
})
