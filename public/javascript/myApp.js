var myApp = angular.module('myApp', []);

myApp.controller('myController', function($scope, $http) {
  $scope.urlData = {};
  //background color scope variables
  $scope.bgColor = '';
  var colCount = 0;
  var colorArr = ['oneBg', 'twoBg', 'threeBg', 'fourBg'];
  var currColor = '';

  $scope.shorten = function() {
    $http({
          method  : 'POST',
          url     : '/api/shorten',
          data    : {url: $('#url-field').val()}
         })
          .then(function(response) {
              var resultHTML = '<a class="result" href="' + response.data.shortUrl + '">'
                  + response.data.shortUrl + '</a>';
              $scope.urlData.short = response.data.shortUrl;
          });

    //background color cycle script
    colCount ++;
      if (colCount < colorArr.length)
      {
          $scope.bgColor = colorArr[colCount];
      } else {
          colCount = 0;
          $scope.bgColor = colorArr[colCount];
      }
  }

});
