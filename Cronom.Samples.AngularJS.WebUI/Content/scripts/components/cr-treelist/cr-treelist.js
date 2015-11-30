window.$applicationModule.directive('crTreelist', function () {
    return {
        restrict: 'E',
        templateUrl: '/Content/scripts/components/cr-treelist/cr-treelist.tmpl.html',
        replace: true,
        require: '?ngModel',
        scope: {
            treeListModel: '=ngModel',
            defaultItem: '=',
            onSelection: '='
        },
        controller: function ($scope, $rootScope) {
            $rootScope.depth = 0;
            $scope.selectionHash = -1;

            $scope.treeListModel.selectedItem = $scope.defaultItem || {};

            $scope.itemOnClick = function (item) {
                $scope.selectionHash = item.$$hashKey;

                if ($scope.onSelection) {
                    $scope.onSelection(item);
                    $scope.treeListModel.selectedItem = item;
                }
            };

            $scope.expandCollapseOnClick = function (item) {
                if (item.Children.length > 0) {
                    item.expanded = !item.expanded;
                }
            };

            $scope.removeSelection = function () {
                $scope.treeListModel.selectedItem = $scope.defaultItem || {};
                $scope.selectionHash = -1;
            };
        }
    };
});