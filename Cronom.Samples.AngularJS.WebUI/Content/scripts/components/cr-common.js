/// <reference path="libraries/angular.js" />
/// <reference path="libraries/jquery-2.1.4.js" />

var storageContext = 'sessionStorage';
window.$applicationModule.$__currentScope = [];

window.$applicationModule.factory('crCommon', function ($http, $q) {

    var container = { http: {}, ui: {}, ml: { lang: 'TR' }, storage: {}, async: {} };

    container.http.callAsync = function (options) {
        var requestPromises = [];
        for (var i = 0; i < options.length; i++) {
            requestPromises.push(container.http.call(options[i]));
        }

        return $q.all(requestPromises);
    }

    // options = {api, data, method, onSuccess, onError }
    container.http.call = function (options, onSuccess, onError) {
        if (!options.api) {
            return;
        }

        options.onSuccess = options.onSuccess || onSuccess;
        options.onError = options.onError || onError;

        if (options.api.indexOf('?') > -1) {
            options.api += '&tt=' + new Date().getTime();
        }
        else {
            options.api += '?tt=' + new Date().getTime();
        }

        var config = {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };

        //console.debug('http.call');
        //console.debug(options);

        var requestPromise;
        if ('POST' == options.method) {
            requestPromise = $http.post(options.api, options.data, config);
        }
        else {
            var queryString = jQuery.param(options.data || {});
            if (options.api.indexOf('?') > -1) {
                options.api += '&' + queryString;
            }
            else {
                options.api += '?' + queryString;
            }
            requestPromise = $http.get(options.api, config);
        }

        window.$applicationModule.ui.toggleBusyIndicator(true);

        requestPromise
            .success(function (responseData, status, headers) {
                if ((status == 400 || (responseData && responseData.error)) && options.onError) {
                    options.onError(responseData);
                    return;
                }

                if (options.onSuccess) {
                    options.onSuccess(responseData, status, headers);
                }
                else if (options.onError) {
                    options.onError(responseData);
                }
            })
            .error(function (responseData) {
                if ((status == 400 || (responseData && responseData.error)) && options.onError) {
                    options.onError(responseData);
                    return;
                }

                if (options.onError) {
                    options.onError(responseData);
                }
            })
            .finally(function () {
                window.$applicationModule.ui.toggleBusyIndicator(false);
            });

        return requestPromise;
    };

    container.http.navigate = function (target) {
        window.location = url;

    };

    container.storage.get = function (key) {
        var value = window[storageContext].getItem(key);
        if ((value && !value.expires) || (value && value.expires <= Date.getTime())) {
            return JSON.parse(value);
        }
        return undefined;
    };

    container.storage.set = function (key, value, expireMinutes) {
        if (expireMinutes) {
            value.expires = Date.getTime() + (expireMinutes * 1000 * 60);
        }
        value = JSON.stringify(value);
        window[storageContext].setItem(key, value);
    };

    return container;
});

window.$applicationModule.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

window.$applicationModule.ui = {
    init: function () {

    },
    toggleBusyIndicator: function (display) {
        if (display) {
            $('#bs-busy-indicator').show();
        }
        else {
            $('#bs-busy-indicator').hide();
        }
    },
    _eof: 0,
};

Number.prototype.makeRange = function (to, step) {
    var arr = [], from = this;
    while (from <= to) {
        arr.push(from++);
    }
    return arr;
};

window.$applicationModule.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});

window.$applicationModule.directive('compile', function ($compile) {
    return function (scope, element, attrs) {
        scope.$watch(
          function (scope) {
              return scope.$eval(attrs.compile);
          },
          function (value) {
              element.html(value);
              $compile(element.contents())(scope);
          }
        );
    };
});