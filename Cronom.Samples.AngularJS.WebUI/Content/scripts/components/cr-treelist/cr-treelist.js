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
            $scope.treeListModel.selectedItem = $scope.defaultItem || {};
            $scope.treeListModel.listVisible = false;
            console.log('main-id = ' + $scope.$id);
        }
    };
});

window.$applicationModule.directive('crTreelistItem', function ($compile) {
    return {
        restrict: 'E',
        templateUrl: '/Content/scripts/components/cr-treelist/cr-treelist-item.tmpl.html',
        replace: true,
        scope: {
            item: '=',
            onSelection: '='
        },
        link: function (scope, element, attrs) {
            scope.$watch('item.Children', function () {
                element.append($compile('<ul style="list-style:none;" ng-show="item.expanded"><cr-treelist-item ng-repeat="child in item.Children" item="child" on-selection="onSelection"></cr-treelist-item></ul>')(scope));
            });
        },
        controller: function ($scope, $rootScope) {
            console.log('item-id = ' + $scope.$id);

            $scope.itemOnClick = function (item) {
                item.selected = !item.selected;
                if (item.Children.length > 0) {
                    item.expanded = !item.expanded;
                }
                if ($scope.onSelection) {
                    $scope.onSelection(item);
                    $scope.treeListModel.selectedItem = item;
                }
            };
        }
    };
});