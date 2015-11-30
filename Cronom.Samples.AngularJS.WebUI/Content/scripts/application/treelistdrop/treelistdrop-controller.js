var treelistdropController = function ($scope, crCommon) {

    $scope.selected = {};
    $scope.treeListModel = { data: [] };

    $scope.init = function () {
        var opts = { api: './GetPageTreeListData', method: 'GET' };
        var success = function (response) {
            $scope.treeListModel.data = response;
            $scope.treeListModel.placeholder = 'Select an item';
            $scope.treeListModel.buttonClass = 'button-info';
        };
        crCommon.http.call(opts, success);
    };

    $scope.itemSelected = function (item) {
        $scope.selected = item;
    };

};


window.$applicationModule.controller('treelistdropController', ['$scope', 'crCommon', treelistdropController]);