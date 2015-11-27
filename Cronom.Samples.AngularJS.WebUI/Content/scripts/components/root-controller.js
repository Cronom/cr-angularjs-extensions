var layoutController = function ($scope, crCommon) {

    $scope.init = function () {

    };

    $scope.toggleBusyIndicator = function (display) {
        if (display != $scope.busyIndicatorModel.show) {
            $scope.busyIndicatorModel.show = display;
            $scope.busyIndicatorModel.text = 'Loading...';
        }
    };

    $scope.showMessage = function (type, title, message, closeCallback) {
        
    };

    $scope.showSuccessMessage = function (title, message, closeCallback) {
        $scope.showMessage('success', title, message, closeCallback);
    };

    $scope.showInfoMessage = function (title, message, closeCallback) {
        $scope.showMessage('info', title, message, closeCallback);
    };

    $scope.showErrorMessage = function (title, message, closeCallback) {
        $scope.showMessage('danger', title, message, closeCallback);
    };

};

window.$applicationModule.controller('rootController', ['$scope', 'crCommon', layoutController]);
