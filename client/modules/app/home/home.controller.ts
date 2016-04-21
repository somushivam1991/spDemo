/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.home {
    import layout = common.layouts.home;

    export class HomeController extends ngTemplate.core.bases.PageController<layout.HomeLayoutController> {
        public vm: ViewModel;
        /* @ngInject */
        constructor($scope: IHomeControllerScope,
                    private $state: angular.ui.IStateService,
                    private homeServices: HomeServices,
                    private toastr: toastr.IToastrService,
                    private authWebService: AuthWebService,
                    private $timeout: ng.ITimeoutService,
                    private homeState: HomeState,
                    private popupService: popup.PopupService) {
                    super($scope);
                    this.vm = this.homeServices.createViewModel();
        }

        public errorMessage: string = '';
        public isBusy: boolean = false;
        public onSubmitClick(): void {
            if (Boolean(this.vm.login.username) && Boolean(this.vm.login.password)) {
                this.vm.error.usernameRequired = false;
                this.vm.error.passwordRequired = false;
                this.vm.error.invalidCredential = false;
                let isValidEmail: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.vm.login.username);
                this.vm.error.invalidCredential = !isValidEmail;
                this.errorMessage = 'Incorrect Username or Password';
                if (isValidEmail) {
                    this.authenticationServiceCall();
                } else {
                    this.isBusy = false;
                }
            } else {
                this.monitoringValidationProperties();
            }
        }

        private authenticationServiceCall(): void {
            this.isBusy = true;
            if (Boolean(this.homeState.authentication)) {
                this.homeState.authentication = '';
            }
            let data: string = 'grant_type=password&username=' + this.vm.login.username + '&password=' + this.vm.login.password + '&channel=R';
            this.authWebService.Login_Post(data).then((user: LoginModel) => {
                this.isBusy = false;
                let clientsidetoken: string = user.token_type + ' ' + user.access_token;
                this.homeState.authentication = clientsidetoken;
                this.getParent().shell.userName = user.firstName + ' ' + user.lastName;
                this.getParent().shell.userEmail = user.userName;
                this.getParent().shell.defaultPipeLineView = user.defaultPipeLineView;
                this.homeState.defaultPipeLineView = user.defaultPipeLineView;
                this.$timeout(() => {
                    this.getParent().shell.title = '';
                    this.isBusy = false;
                    //this.$state.go('dashboard.pipelineTab');
                    this.$state.go('loan.info', { loanNumber : 123456789 });
                }, 400);
            }).catch((error: common.ICatchException) => {
                this.isBusy = false;
                if (error.Message === 'Invalid credentials.') {
                   this.errorMessage = 'Incorrect Username or Password';
                   this.vm.error.invalidCredential = true;
                } else {
                    this.popupService.showInfo('The application has encountered an unknown error.', 'Exception');
                }
                this.vm.error.invalidCredential = true;
            });
        }

        private monitoringValidationProperties(): void {
            if (!Boolean(this.vm.login.username) && !Boolean(this.vm.login.password)) {
                this.vm.error.usernameRequired = true;
                this.vm.error.passwordRequired = true;
            } else if (!Boolean(this.vm.login.username)) {
                this.vm.error.usernameRequired = true;
                this.vm.error.passwordRequired = false;
            } else if (!Boolean(this.vm.login.password)) {
                this.vm.error.passwordRequired = true;
                this.vm.error.usernameRequired = false;
            }
        }
    }

    interface IHomeControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.HomeLayoutController> {
    }

    export const route: IPageState = {
        name: 'home',
        layout: layout.homeRoute,
        templateUrl: 'home/home.html',
        url: '/'
    };

    registerController(HomeController, route);
}
