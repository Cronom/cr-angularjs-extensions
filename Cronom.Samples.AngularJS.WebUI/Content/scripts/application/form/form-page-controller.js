var formPageController = function ($scope, crCommon) {

    $scope.formModel = {
        name: 'registerForm',
        title: 'New User Registration',
        icon: 'fa-user',
        cssClass: 'register-form',
        fields: ['name', 'surname', 'country', 'birthday', 'email', 'password', 'passwordRepeat', 'acceptTos'],
        viewModel: {
            name: { label: 'Firstname', required: true, errorMessage: 'Please provide a valid firstname', type: 'text' },
            surname: { label: 'Lastname', required: true, errorMessage: 'Please provide a valid lastname', type: 'text' },
            birthday: { label: 'Birthday', required: true, errorMessage: 'Please provide a valid birthday', type: 'date' },
            email: { label: 'E-mail Address', required: true, errorMessage: 'Please provide a valid email address', type: 'email', placeholder: 'e.g me@localhost' },
            password: { label: 'Password or Pin-Code', required: true, errorMessage: 'Please provide a valid password', type: 'password', rule: 'registerForm.password.length>6' },
            passwordRepeat: { label: 'Repeat password', required: true, errorMessage: 'Passwords do not match', type: 'password', rule: 'registerForm.password==registerForm.passwordRepeat' },
            acceptTos: { label: 'Read And Accept TOS', required: true, errorMessage: 'You must accept TOS', type: 'checkbox' },
            country: {
                rule: 'registerForm.country',
                label: 'Country', errorMessage: 'Please select your country', type: 'select',
                options: [
                    { text: 'Greece', value: 'gr' }, { text: 'Norway', value: 'no' },
                    { text: 'Turkey', value: 'tr' }, { text: 'United Kingdom', value: 'uk' }
                ]
            }
        },
        submitLabel: 'Register',
        submitIcon: 'fa-user-plus',
        resetIcon: 'fa-refresh',
        canReset: true,
        submitForm: function (formData) {
            console.log(formData);
            $scope.actionResult = 'form submit';
        },
        resetForm: function () {
            $scope.actionResult = 'form reset';
        }
    };

    $scope.init = function () {

    };

};

window.$applicationModule.controller('formPageController', ['$scope', 'crCommon', formPageController]);