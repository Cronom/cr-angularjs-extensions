var treelistdropController = function ($scope, crCommon) {

    $scope.selected = {};
    $scope.treeListModel = {  };

    $scope.init = function() {
        $scope.treeListModel.placeholder = 'Select an item';
        $scope.treeListModel.buttonClass = 'btn-info';
        $scope.treeListModel.defaultItem = { Id: 'GR' };
        $scope.treeListModel.selectAndExpand = false;
        $scope.treeListModel.closeOnSelect = false;
        $scope.treeListModel.includeChildren = true;

        $scope.treeListModel.onDataSourceLoaded = function(data) {
            $scope.treeListModel.data[0].Children[0].Extra = { 'Culture': 'en-gb', 'Tld': '.uk', 'Currency': '£' };
            $scope.treeListModel.data[1].Unselectable = true;
            $scope.treeListModel.data[1].Children[0].Unselectable = true;
            $scope.serializedOutput = JSON.stringify($scope.treeListModel.data, '', 2);
        };

        $scope.initWithUrl();
    };

    $scope.initWithUrl = function() {
        $scope.treeListModel.dataSource = './GetPageTreeListData';
    };

    $scope.initWithList = function () {
        var opts = { api: './GetPageTreeListData', method: 'GET' };
        var success = function (response) {
            $scope.treeListModel.dataSource = response;
        };
        crCommon.http.call(opts, success);
    };

    $scope.itemSelected = function (item) {
        $scope.selected = item;
    };

};


window.$applicationModule.controller('treelistdropController', ['$scope', 'crCommon', treelistdropController]);