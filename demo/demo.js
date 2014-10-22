var app = angular.module('MobileAngularUiExamples', [
  "ngRoute",
  "ngTouch",
  "mobile-angular-ui"
]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/',          {templateUrl: "home.html"});
  $routeProvider.when('/scroll',    {templateUrl: "scroll.html"}); 
  $routeProvider.when('/toggle',    {templateUrl: "toggle.html"}); 
  $routeProvider.when('/tabs',      {templateUrl: "tabs.html"}); 
  $routeProvider.when('/accordion', {templateUrl: "accordion.html"}); 
  $routeProvider.when('/overlay',   {templateUrl: "overlay.html"}); 
  $routeProvider.when('/forms',     {templateUrl: "forms.html"});
  $routeProvider.when('/about',  {templateUrl: "about.html"});
  $routeProvider.when('/all-events',  {templateUrl: "all-events.html"});
});

app.service('analytics', [
  '$rootScope', '$window', '$location', function($rootScope, $window, $location) {
    var send = function(evt, data) {
      ga('send', evt, data);
    }
  }
]);

app.directive( "carouselExampleItem", function($rootScope, $swipe){
  return function(scope, element, attrs){
      var startX = null;
      var startY = null;
      var endAction = "cancel";
      var carouselId = element.parent().parent().attr("id");

      var translateAndRotate = function(x, y, z, deg){
        element[0].style["-webkit-transform"] = "translate3d("+x+"px,"+ y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-moz-transform"] = "translate3d("+x+"px," + y +"px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-ms-transform"] = "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["-o-transform"] = "translate3d("+x+"px," + y  + "px," + z + "px) rotate("+ deg +"deg)";
        element[0].style["transform"] = "translate3d("+x+"px," + y + "px," + z + "px) rotate("+ deg +"deg)";
      }

      $swipe.bind(element, {
        start: function(coords) {
          endAction = null;
          startX = coords.x;
          startY = coords.y;
        },

        cancel: function(e) {
          endAction = null;
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        end: function(coords, e) {
          if (endAction == "prev") {
            $rootScope.carouselPrev(carouselId);
          } else if (endAction == "next") {
            $rootScope.carouselNext(carouselId);
          }
          translateAndRotate(0, 0, 0, 0);
          e.stopPropagation();
        },

        move: function(coords) {
          if( startX != null) {
            var deltaX = coords.x - startX;
            var deltaXRatio = deltaX / element[0].clientWidth;
            if (deltaXRatio > 0.3) {
              endAction = "next";
            } else if (deltaXRatio < -0.3){
              endAction = "prev";
            } else {
              endAction = null;
            }
            translateAndRotate(deltaXRatio * 200, 0, 0, deltaXRatio * 15);
          }
        }
      });
    }
});

app.controller('MainController', function($rootScope, $http, $scope, analytics){

  $rootScope.$on("$routeChangeStart", function(){
    $rootScope.loading = true;
  });

  $rootScope.$on("$routeChangeSuccess", function(){
    $rootScope.loading = false;
  });

  var scrollItems = [];

  for (var i=1; i<=100; i++) {
    scrollItems.push("Item " + i);
  }

  $scope.scrollItems = scrollItems;
  $scope.invoice = {payed: true};
  
  $scope.userAgent =  navigator.userAgent;
  $scope.chatUsers = [
    { name: "Carlos  Flowers", online: true },
    { name: "Byron Taylor", online: true },
    { name: "Jana  Terry", online: true },
    { name: "Darryl  Stone", online: true },
    { name: "Fannie  Carlson", online: true },
    { name: "Holly Nguyen", online: true },
    { name: "Bill  Chavez", online: true },
    { name: "Veronica  Maxwell", online: true },
    { name: "Jessica Webster", online: true },
    { name: "Jackie  Barton", online: true },
    { name: "Crystal Drake", online: false },
    { name: "Milton  Dean", online: false },
    { name: "Joann Johnston", online: false },
    { name: "Cora  Vaughn", online: false },
    { name: "Nina  Briggs", online: false },
    { name: "Casey Turner", online: false },
    { name: "Jimmie  Wilson", online: false },
    { name: "Nathaniel Steele", online: false },
    { name: "Aubrey  Cole", online: false },
    { name: "Donnie  Summers", online: false },
    { name: "Kate  Myers", online: false },
    { name: "Priscilla Hawkins", online: false },
    { name: "Joe Barker", online: false },
    { name: "Lee Norman", online: false },
    { name: "Ebony Rice", online: false }
  ];
$scope.calCount = 0;
$scope.select = "Select";
  $scope.serveAll = function(){
      var url1 = "http://ashesi.edu.gh/resources/events.html?task=ical.download&id=181";
      window.open(url1, '_self');
  } 

  $scope.clickme = function(u_id, sd, ed, sum, desp, loc, urllink){
            var url3 = "http://ical-30890.onmodulus.net/ical?uid="+u_id+"&stdate="+sd+"&edate="+ed+"&summary="+sum+"&description="+desp+"&location="+loc+"&url="+urllink;
            //console.log(sd);
            window.open(url3, '_self');

  }

  $scope.addCal = function(u_id, sd, ed, sum, desp, loc, urllink){
      var url4 = "http://calito-31036.onmodulus.net/addCal?uid="+u_id+"&stdate="+sd+"&edate="+ed+"&summary="+sum+"&description="+desp+"&location="+loc+"&url="+urllink;
      if($scope.select=="Select"){
      var request = $http({
                        method: "get",
                        url: url4,
                        params: {
                            action: "get"
                        }
                    });
      $scope.calCount++;
      $scope.select = "Selected";
    }
    else{
      alert("Already selected!");
    }
  }

  $scope.flushCal = function(){
      var url6 = "http://calito-31036.onmodulus.net/flushCal";
      var request = $http({
                        method: "get",
                        url: url6
                    });
      $scope.calCount = 0;
  }

  $scope.serveCal = function(){
      var url5 = "http://calito-31036.onmodulus.net/serveCal";
      window.open(url5, '_self');
  }

 $scope.todayEvents = [];
  $scope.weekEvents = [];
  var todayDate = new Date();
  var weekToday = new Date(new Date().setDate(new Date().getDate()+1));
  var weekAway = new Date(new Date().setDate(new Date().getDate() + 7));
  var url = "http://ical-30890.onmodulus.net/ical2";
  $http.get(url).success(function (data) {
        console.log(url);
        $scope.loading = false;

        var arr = $.map(data, function(value, key){return value;});
        $scope.summary = [];
        $scope.ical = arr;
        $scope.count = arr.length;
        
        var log = [];
        angular.forEach($scope.ical, function(value, key) {
          var eventDates = new Date(value.start);
          if(eventDates.getTime() > weekToday.getTime() && eventDates.getTime() < weekAway.getTime()){
            console.log(key + ' : ' + value.summary);
            $scope.weekEvents.push(value);
          }
          if(eventDates.getDate() == todayDate.getDate()){
              console.log(key + 'Key : ' + value.summary);
              $scope.todayEvents.push(value);
          }
        }, log);
        
});
  $scope.loading = true;
});