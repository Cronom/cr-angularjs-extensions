var compilePageController = function ($scope, crCommon) {

    $scope.info = [];
    $scope.warning = [];
    $scope.danger = [];
    $scope.htmlButtonInfo = [];
    $scope.htmlButtonWarning = [];
    $scope.htmlButtonDanger = [];

    $scope.init = function () {

    };

    $scope.addButton = function () {
        $scope.info.push(0);
        $scope.warning.push(0);
        $scope.danger.push(0);
        $scope.htmlButtonInfo.push('<button data-index="{{$index}}" class="btn btn-info" ng-click="actionInfo($index)">{{$index+1}}. Info</button> <span> index: {{$index}} clicks: {{info[$index]}}</span>');
        $scope.htmlButtonWarning.push('<button data-index="{{$index}}" class="btn btn-warning" ng-click="actionWarning($index)">{{$index+1}}. Warning</button> <span> index: {{$index}} clicks: {{warning[$index]}}</span>');
        $scope.htmlButtonDanger.push('<button data-index="{{$index}}" class="btn btn-danger" ng-click="actionDanger($index)">{{$index+1}}. Danger</button> <span> index: {{$index}} clicks: {{danger[$index]}}</span>');
    };

    $scope.actionInfo = function (index) {
        $scope.info[index]++;
    };

    $scope.actionWarning = function (index) {
        $scope.warning[index]++;
    };

    $scope.actionDanger = function (index) {
        $scope.danger[index]++;
    };

};

window.$applicationModule.controller('compilePageController', ['$scope', 'crCommon', compilePageController]);