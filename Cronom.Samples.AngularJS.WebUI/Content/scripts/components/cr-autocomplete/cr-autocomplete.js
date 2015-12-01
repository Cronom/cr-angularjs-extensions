/*

model
{
    data                = []                    // treelist array [{ Id:'', Title:'', Children:[], Unselectable: false, Extra:{} }]
    selectAndExpand     = true|false            // selects and expands the parent node at the same time
    buttonClass         = ""                    // bootstrap button class
    placeholder         = ""                    // text to show when no item is selected
    onItemSelected      = function(item)        // item selection callback
    closeOnSelect       = true|false            // closes list after selection
    -- useTextFilter    = true|false            // displays text filter
}

*/

var crAutocomplete = function (crCommon) {
    return {
        restrict: 'E',
        templateUrl: '/Content/scripts/components/cr-autocomplete/cr-autocomplete.tmpl.html',
        replace: true,
        require: '?ngModel',
        scope: {
            autocompleteModel: '=ngModel',
            defaultItem: '=',
            onSelection: '='
        },
        controller: function ($scope) {

            $scope.selectionHash = -1;
            $scope.isLoading = false;

            $scope.autocompleteModel.inputText = '';
            $scope.autocompleteModel.minimumInput = $scope.autocompleteModel.minimumInput || 3;
            $scope.autocompleteModel.selectedItem = {};

            $scope.$watch('autocompleteModel.inputText', function () {
                $scope.queryInput();
            });

            $scope.queryInput = function () {
                if ($scope.autocompleteModel.inputText && $scope.autocompleteModel.inputText.length >= $scope.autocompleteModel.minimumInput) {
                    $scope.isLoading = true;
                    var onSuccess = function (response) {
                        $scope.autocompleteModel.data = response;
                        $scope.isLoading = false;
                        console.info(response);
                    }
                    var payload = { 'keyword': $scope.autocompleteModel.inputText };
                    crCommon.http.call({ api: $scope.autocompleteModel.dataSource, method: 'POST', data: payload }, onSuccess);
                }
            };

            $scope.didRequestCompleted = function () {
                return $scope.autocompleteModel.inputText && $scope.autocompleteModel.inputText.length >= $scope.autocompleteModel.minimumInput && !$scope.isLoading;
            };

            $scope.hasSearchResult = function () {
                return $scope.autocompleteModel.inputText && $scope.autocompleteModel.inputText.length >= $scope.autocompleteModel.minimumInput && !$scope.isLoading && $scope.autocompleteModel.data.length > 0;
            };

            $scope.hasEmptyResult = function () {
                return $scope.autocompleteModel.inputText && $scope.autocompleteModel.inputText.length >= $scope.autocompleteModel.minimumInput && !$scope.isLoading && $scope.autocompleteModel.data.length == 0;
            };

        }
    };
};

window.$applicationModule.directive('crAutocomplete', ['crCommon', crAutocomplete]);