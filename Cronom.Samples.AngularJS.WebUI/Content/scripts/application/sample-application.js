var sampleApplicationModule = angular.module('sampleApplicationModule', []);

sampleApplicationModule.ui = {

    init: function () {
        window.alert = function (args) {
            bootbox.alert(args);
        }

        if (!window.console) {
            window.console = {};
            if (!window.console.log) {
                window.console.log = function () { };
            }
        }
    },

    toggleOverlay: function (willDisplay) {
        if (willDisplay && !$('div.overlay').is(':visible')) {
            $('div.overlay').fadeIn(50);
        }
        else {
            $('div.overlay').fadeOut(50);
        }
    },

    _endobj: null,
};

$(document).ready(function () {
    sampleApplicationModule.ui.init();
});

window.$applicationModule = sampleApplicationModule;

