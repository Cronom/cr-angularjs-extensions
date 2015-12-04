var formPageController = function ($scope, crCommon) {

    $scope.formModel = {
        name: 'registerForm',
        title: 'New User Registration',
        icon: 'fa-user',
        cssClass: 'register-form',
        fields: ['name', 'surname', 'bandwidth', 'birthday', 'email', 'password', 'passwordRepeat', 'favoredTextEditor', 'acceptTos'],
        viewModel: {
            name: { label: 'Firstname', required: true, errorMessage: 'Please provide a valid firstname', type: 'text' },
            surname: { label: 'Lastname', required: true, errorMessage: 'Please provide a valid lastname', type: 'text' },
            birthday: { label: 'Birthday', required: true, errorMessage: 'Please provide a valid birthday', type: 'date' },
            email: { label: 'E-mail Address', required: true, errorMessage: 'Please provide a valid email address', type: 'email', placeholder: 'e.g me@localhost' },
            password: { label: 'Password or Pin-Code', required: true, errorMessage: 'Please provide a valid password', type: 'password', rule: 'registerForm.password.length>6' },
            passwordRepeat: { label: 'Repeat password', required: true, errorMessage: 'Passwords do not match', type: 'password', rule: 'registerForm.password==registerForm.passwordRepeat' },
            acceptTos: { label: 'Read And Accept TOS', required: true, errorMessage: 'You must accept TOS', type: 'checkbox' },
            bandwidth: {
                rule: 'registerForm.bandwidth',
                label: 'Connection Type',
                errorMessage: 'Please select your connection type',
                type: 'select',
                options: [
                    { text: 'ADSL', value: 'adsl' }, { text: 'HDSL', value: 'hdsl' }, { text: 'VDSL', value: 'vdsl' },
                    { text: 'T1', value: 't1' }, { text: 'T2', value: 't2' }, { text: 'T3', value: 't3' },
                    { text: '3G', value: '3G' }, { text: '4G', value: '4G' }, { text: '4.5G', value: '4.5G' }
                ]
            },
            favoredTextEditor: {
                rule: 'registerForm.favoredTextEditor',
                label: 'Favourite Text Editor',
                errorMessage: 'Please type your favourite text editor',
                type: 'autocomplete',
                dataSource: './QueryFavoredTextEditor',
                minimumInput: 2,
                placeholder: 'Type here...'
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