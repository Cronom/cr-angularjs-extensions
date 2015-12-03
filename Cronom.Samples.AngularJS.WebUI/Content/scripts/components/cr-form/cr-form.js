/*

ngModel definition
{
    name        : ''                                                    // name of the form element
    title       : ''                                                    // form title to display
    icon        : ''                                                    // fontawesome (fa-) icon of the form
    cssClass    : ''                                                    // css class to use in form
    fields      : []                                                    // array of field names
    viewModel   : {                                                     // viewModel of the form
            propertyName : {                                            // each field must be defined as property 
               type         : 'email'|'text'|'number'|'password'        // html input[type] values 
               label        : ''                                        // label to be displayed in form field
               required     : true|false                                // true if the input is required
               errorMessage : ''                                        // error message to be deisplayed if invalid or required
               placeholder  : ''                                        // placeholder text for the input field
               rule         : ''                                        // angularjs expressions to evaluate on validation
            }
    }
    submitLabel : 'Submit'                                              // form submit button label
    submitIcon  : ''                                                    // submit button icon
    submitForm  : function(formData)                                    // form submit action
    canReset    : true|false                                            // if true, a reset form button will be created
    resetLabel  : 'Reset'                                               // reset form button label
    resetIcon   : ''                                                    // reset button icon
    resetForm   : function(formData)                                    // form submit action
}

*/

var crForm = function () {
    return {
        restrict: 'E',
        templateUrl: '/Content/scripts/components/cr-form/cr-form.tmpl.html',
        replace: true,
        require: '?ngModel',
        scope: {
            formModel: '=ngModel'
        },
        controller: function ($scope) {

            $scope.$watch($scope.formModel.name, function (form) {
                if (form) {
                    $scope.formModel.form = form;
                }
            });

            $scope.$watch('formModel.viewModel', function () {
                for (var i = 0; i < $scope.formModel.fields.length; i++) {
                    $scope.hasError($scope.formModel.fields[i]);
                }
            });

            $scope.hasError = function (field) {
                var isExpressionValid = $scope.evaluateFormRule(field);
                var isNotvalid = $scope.formModel.form[field].$invalid && !$scope.formModel.form[field].$pristine;
                var hasError = !isExpressionValid || isNotvalid;
                $scope.formModel.viewModel[field].isValid = !isNotvalid;
                $scope.formModel.viewModel[field].isExpressionValid = isExpressionValid;
                $scope.formModel.viewModel[field].isPristine = $scope.formModel.form[field].$pristine;
                $scope.formModel.viewModel[field].isDirty = $scope.formModel.form[field].$dirty;
                return hasError;
            };

            $scope.evaluateFormRule = function (field) {
                var rule = $scope.formModel.viewModel[field].rule;
                if (rule && $scope.formModel.viewData[field] && $scope.formModel.viewData[field].length > 0) {
                    // --- to use with form element ---
                    // var find = $scope.formModel.name + '.';
                    // var regex = new RegExp(find, 'g');
                    // var expression = rule.replace(regex, 'formModel.form.');

                    var find = $scope.formModel.name + '.';
                    var regex = new RegExp(find, 'g');
                    var expression = rule.replace(regex, 'formModel.viewData.');
                    return $scope.$eval(expression);
                }
                return true;
            };

            $scope.isFormInvalid = function () {
                return $scope.formModel.form.$invalid;
            };

            $scope.submitForm = function () {
                if ($scope.formModel.form.$valid && $scope.formModel.submitForm) {
                    $scope.formModel.submitForm($scope.formModel.viewData);
                }
            };

            $scope.resetForm = function () {
                $scope.formModel.viewData = {};
                if ($scope.formModel.form) {
                    $scope.formModel.form.$setPristine();
                    $scope.formModel.form.$setUntouched();
                }
                if ($scope.formModel.resetForm) {
                    $scope.formModel.resetForm();
                }
                $scope.formModel.viewModel._reset = true;
            };

            $scope.resetForm();
        }
    };
};

window.$applicationModule.directive('crForm', [crForm]);