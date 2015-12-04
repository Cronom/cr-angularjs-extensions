/*

model
{
    dataSource          = "" | [{ Id:'', Title:''}]         // if dataSource is a url query is performed on serverside. if a list of items provided, query will be on clientside
    placeholder         = ""                                // placeholder text for query input
    onItemSelected      = function(item)                    // item selection callback
    inputText           = ""                                // query value
    minimumInput        = 3                                 // minimum length of text to perform query
}

*/

var crAutocomplete = function (crCommon) {
    return {
        restrict: 'E',
        templateUrl: '/Content/scripts/components/cr-autocomplete/cr-autocomplete.tmpl.html',
        replace: true,
        transclude: true,
        require: '?ngModel',
        scope: {
            autocompleteModel: '=ngModel',
            defaultItem: '=',
            onSelection: '=',
            parentFieldName: '=',
        },
        controller: function ($scope) {
            $scope.changeFromSelection = false;
            $scope.selectionHash = -1;
            $scope.isLoading = false;
            $scope.displayResults = false;
            $scope.previousInput = '';

            $scope.autocompleteModel.data = [];
            $scope.autocompleteModel.closeOnSelect = true;
            $scope.autocompleteModel.inputText = '';
            $scope.autocompleteModel.minimumInput = $scope.autocompleteModel.minimumInput || 3;
            $scope.autocompleteModel.selectedItem = {};

            $scope.$watch('autocompleteModel.inputText', function () {
                if (!$scope.autocompleteModel.inputText || $scope.autocompleteModel.inputText.length < $scope.autocompleteModel.minimumInput) {
                    return;
                }
                if ($scope.changeFromSelection) {
                    $scope.changeFromSelection = false;
                    return;
                }
                $scope.queryInput();
            });

            $scope.queryInput = function () {
                $scope.isLoading = true;
                $scope.displayResults = true;

                if (typeof ($scope.autocompleteModel.dataSource) === 'string') {
                    $scope.searchRemote();
                }
                else {
                    $scope.searchLocal();
                }
            };

            $scope.searchLocal = function () {
                $scope.autocompleteModel.data = [];
                var length = $scope.autocompleteModel.dataSource.length;
                for (var i = 0; i < length; i++) {
                    if ($scope.autocompleteModel.dataSource[i].Title.toLowerCase().indexOf($scope.autocompleteModel.inputText.toLowerCase()) > -1) {
                        $scope.autocompleteModel.data.push($scope.autocompleteModel.dataSource[i]);
                    }
                }
                $scope.isLoading = false;
            };

            $scope.searchRemote = function () {
                var onSuccess = function (response) {
                    $scope.autocompleteModel.data = response;
                    $scope.previousInput = $scope.autocompleteModel.inputText;
                    $scope.isLoading = false;
                }
                var payload = { 'keyword': $scope.autocompleteModel.inputText };
                crCommon.http.call({ api: $scope.autocompleteModel.dataSource, method: 'POST', data: payload }, onSuccess);
            };

            $scope.willDisplayResult = function () {
                if (!$scope.displayResults) {
                    return false;
                }

                return $scope.autocompleteModel.inputText && $scope.autocompleteModel.inputText.length >= $scope.autocompleteModel.minimumInput && !$scope.isLoading;
            };

            $scope.hasSearchResult = function () {
                return $scope.autocompleteModel.inputText && $scope.autocompleteModel.inputText.length >= $scope.autocompleteModel.minimumInput && !$scope.isLoading && $scope.autocompleteModel.data.length > 0;
            };

            $scope.hasEmptyResult = function () {
                return $scope.autocompleteModel.inputText && $scope.autocompleteModel.inputText.length >= $scope.autocompleteModel.minimumInput && !$scope.isLoading && $scope.autocompleteModel.data.length == 0;
            };

            $scope.itemOnClick = function (item, $index) {
                if (item.Unselectable) {
                    return;
                }

                $scope.changeFromSelection = true;
                $scope.selectionHash = item.$$hashKey;
                $scope.autocompleteModel.selectedItem = item;
                $scope.autocompleteModel.inputText = item.Title;

                var selectionCallback = $scope.onSelection || $scope.autocompleteModel.onItemSelected;

                if (selectionCallback) {
                    selectionCallback(item, $index, $scope.parentFieldName);
                }

                if ($scope.autocompleteModel.closeOnSelect) {
                    $scope.displayResults = false;
                }
            };

            $scope.clear = function () {
                $scope.autocompleteModel.inputText = '';
                $scope.autocompleteModel.selectedItem = {};
                $scope.autocompleteModel.data = [];
            };
        }
    };
};

window.$applicationModule.directive('crAutocomplete', ['crCommon', crAutocomplete]);