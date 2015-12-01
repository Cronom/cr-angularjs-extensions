var autocompletePageController = function ($scope, crCommon) {

    $scope.selected = {};
    $scope.autocompleteModel = { data: [], inputText: '', dataSource: './QueryPageAutocompleteData', minimumInput: 2, placeholder: 'Search...' };

    $scope.init = function () {

    };

    $scope.itemSelected = function (item) {
        $scope.selected = item;
    };

};

window.$applicationModule.controller('autocompletePageController', ['$scope', 'crCommon', autocompletePageController]);