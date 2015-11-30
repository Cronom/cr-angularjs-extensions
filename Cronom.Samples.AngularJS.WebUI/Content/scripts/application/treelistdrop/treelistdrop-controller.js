﻿var treelistdropController = function ($scope, crCommon) {

    $scope.selected = {};
    $scope.treeListModel = { data: [] };

    $scope.init = function () {
        var opts = { api: './GetPageTreeListData', method: 'GET' };
        var success = function (response) {
            $scope.treeListModel.data = response;
            $scope.treeListModel.placeholder = 'Select an item';
            $scope.treeListModel.buttonClass = 'btn-info';
            $scope.treeListModel.defaultItem = { Id: 'GR' };
            $scope.treeListModel.selectAndExpand = true;
            $scope.treeListModel.closeOnSelect = true;
            //$scope.treeListModel.useTextFilter = true;
            $scope.serializedOutput = JSON.stringify(response, '', 2);
        };
        crCommon.http.call(opts, success);
    };

    $scope.itemSelected = function (item) {
        $scope.selected = item;
    };

};


window.$applicationModule.controller('treelistdropController', ['$scope', 'crCommon', treelistdropController]);