var autocompletePageController = function ($scope, crCommon) {

    $scope.selected = {};
    $scope.autocompleteModel = { inputText: '', dataSource: './QueryPageAutocompleteData', minimumInput: 1, placeholder: 'Search...'};
    $scope.serializedOutput = '';

    $scope.init = function () {
        $scope.$watch('autocompleteModel.data', function () {
            $scope.serializedOutput = JSON.stringify($scope.autocompleteModel.data, '', 2);
        });
    };

    $scope.itemSelected = function (item) {
        $scope.selected = item;
    };

};

window.$applicationModule.controller('autocompletePageController', ['$scope', 'crCommon', autocompletePageController]);