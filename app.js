(function() {
    'use strict';

    angular
        .module('app', ['ui.router',
                        'ui.bootstrap'
        ]);
})();

(function() {
    angular.module('app')
        .constant(_, '_')
}());

(function() {

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider'];

    function appConfig($stateProvider) {

    }

}());

(function() {

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('dashboard', {
                url: '/',
                views: {
                    "main": {
                        controller: 'dashboardController',
                        controllerAs: 'vm',
                        templateUrl: 'app/dashboard/dashboard.html'
                    }
                }
            })
            .state('character', {
               url: '/character:id',
               views: {
                   "main": {
                       controller: 'characterController',
                       controllerAs: 'vm',
                       templateUrl: 'app/dashboard/character/character.html'
                   }
               }
           })

        $urlRouterProvider.otherwise('/');
    }
})();

(function() {

    angular.module('app')
        .run(runBlock);

    runBlock.$inject = ['$rootScope', '$state'];

    function runBlock($rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('view change Start ')
            $rootScope.currentState = toState.name;
        });

        $rootScope.$on('$viewContentLoaded', function (){
          console.log('view Loaded');
        });
    }

}());

(function() {
    'use strict';
    angular.module('app')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$state', 'apiService'];
    /* @ngInject */
    function dashboardController($scope, $state, apiService) {
        var vm = this;

      
    }
})();

/**
 * Created by Delymar on 23/10/2016.
 */
(function() {
    'use strict'

    angular.module('app').
    factory('apiService', apiService);

    apiService.$inject = ['$http', '$q'];

    function apiService($http, $q) {

        var apiService = {
            getAll: getAll,
            getComics: getComics,
            getCharacterDetails: getCharacterDetails,
        };
        return apiService;

        function getAll() {
                  var deferred = $q.defer();
                  $http.get('/apiData/value.json')
                      .success(function(value, status, headers, config) {
                          deferred.resolve(value.results);
                      })
                      .error(function(status) {
                          deferred.reject(status);
                      });
                  return deferred.promise;
        };
        function getComics() {
                  var deferred = $q.defer();
                  $http.get('/apiData/value.json')
                        .success(function(value, status, headers, config) {
                            deferred.resolve(value.comic);
                        })
                        .error(function(status) {
                            deferred.reject(status);
                        });
                  return deferred.promise;
        };
        function getCharacterDetails() {
                  var deferred = $q.defer();
                  $http.get('/apiData/value.json')
                        .success(function(value, status, headers, config) {
                            deferred.resolve(value.characterDetails);
                        })
                        .error(function(status) {
                            deferred.reject(status);
                        });
                  return deferred.promise;
        }
    }
})();


(function() {
    'use strict';
    var app = angular.module('app')
        .controller('comicsDetailsController', ['$scope', '$uibModalInstance',  'apiService', 'items',
            function ($scope, $uibModalInstance, apiService, items) {
                var vm = this;

                apiService.getComics().then(
                    function success (resp) {
                        $scope.comic = resp;
                    },
                    function error (err) {
                        console.log("err",err)
                      }
                  );
                  $scope.actions = {
                  CloseModal: function () {
                      $uibModalInstance.close();
                  }
              };

            }]
        );
})();

(function(){
    'use strict';
    angular.module('app')
        .directive('favorite',function(){
            return {
                templateUrl:'app/components/favorite/favorite.html',
                restrict: 'E',
                replace: true,
                controller: favoriteController,
                controllerAs: 'vm'
            }
        });

    favoriteController.$inject = ['$state', '$scope', 'apiService'];
    function favoriteController($state, $scope, apiService) {
        var vm = this;

    }

})();

(function(){
    'use strict';
    angular.module('app')
        .directive('feed',function(){
            return {
                templateUrl:'app/components/feed/feed.html',
                restrict: 'E',
                replace: true,
                controller: feedController
            }
        });

    feedController.$inject = ['$state', '$scope', 'apiService', '$uibModal'];
    function feedController($state, $scope, apiService, $uibModal) {
        var vm = this;

            apiService.getAll().then(
                function success (resp) {
                  _.each(resp, function (character) {
                    if(!_.isEmpty(character.comics.items)) {
                      _.each(character.comics.items, function(comic) {
                        var str = comic.resourceURI.split('/');
                        comic.id = str[6];
                        return comic;
                      })
                    }
                    return character;
                  });
                   $scope.characters = resp;
                },
                function error (err) {
                    console.log("err",err)
                  }
              );

              $scope.actions= {
                OpenComicsDetailsModal: function (nameComics) {
                    console.log("estoy en comicsDetailsController", nameComics)
                    var modalInstance = $uibModal.open({
                        animation: true,
                        ariaLabelledBy: 'modal-title',
                        ariaDescribedBy: 'modal-body',
                        templateUrl: 'app/components/comicsDetails/comicsDetails.html',
                        controller: 'comicsDetailsController',
                        size: 'md',
                        resolve: {
                            items: function(){
                                var comicsInfo = {
                                    nameComics: nameComics
                                };
                                return comicsInfo;
                            }
                        }
                    })
                },
              };
    }

})();

(function() {
    'use strict';

    angular
        .module('app')
        .directive('footerDirective', footerDirective);

    function footerDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/footer/footer.html',
            controller: footerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    footerController.$inject = [];

    /* @ngInject */
    function footerController() {
        var vm = this;

        activate();

        function activate() {
            //console.log('footer Activate');
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('app')
        .directive('headerDirective', headerDirective);

    function headerDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/components/header/header.html',
            controller: headerController,
            controllerAs: 'headerController',
            bindToController: true
        };

        return directive;
    }

    headerController.$inject = ['$state', '$scope', '$window'];

    /* @ngInject */
    function headerController($state, $scope, $window) {
        var vm = this;
    }
})();
(function() {
    'use strict';
    angular.module('app')
        .controller('characterController', characterController);

    characterController.$inject = ['$scope', '$state', 'apiService', '$uibModal'];
    /* @ngInject */
    function characterController($scope, $state, apiService, $uibModal) {
        var vm = this;

        vm.characterId = $state.params.id;
        console.log(vm.characterId);

        apiService.getCharacterDetails().then(
            function success (resp) {
                $scope.CharacterDetails = resp;
                console.log("aqui me muestra los detalles", $scope.CharacterDetails);
            },
            function error (err) {
                console.log("err",err)
              }
          );

          $scope.actions= {
            OpenComicsDetailsModal: function (comicsId) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/comicsDetails/comicsDetails.html',
                    controller: 'comicsDetailsController',
                    size: 'md',
                    resolve: {
                        items: function(){
                            var comicsInfo = {
                                comicsId: comicsId
                            };
                            return comicsInfo;
                        }
                    }
                })
            },
          };
    }
})();
