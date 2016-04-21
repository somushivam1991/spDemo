/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.forgetpassword {
    import layout = common.layouts.home;

    export class ForgetPasswordController extends ngTemplate.core.bases.PageController<layout.HomeLayoutController> {
        public vm: ViewModel;
        public isBusy: boolean = false;
        /* @ngInject */
        constructor($scope: IForgetPasswordControllerScope,
                    private forgetPasswordServices: ForgetPasswordServices,
                    private $state: angular.ui.IStateService,
                    private popupService: popup.PopupService,
                    private accountWebService: sierra.service.IAccountWebService) {
                    super($scope);
                    this.vm = this.forgetPasswordServices.createViewModel();
        }

        public onEmailChange(): void {
            this.vm.emailRequired = false;
            this.vm.incorrectEmail = false;
        }

        public onSubmitClick(): void {
            if (Boolean(this.vm.email)) {
                this.vm.emailRequired = false;
                this.vm.incorrectEmail = false;
                let isValidEmail: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.vm.email);
                this.vm.incorrectEmail = !isValidEmail;
                if (!this.vm.incorrectEmail) {
                    let resetPasswordRequest: sierra.model.ResetPasswordRequest = sierra.model.ModelFactory.createEmptyResetPasswordRequest((m: sierra.model.ResetPasswordRequest) => {
                        m.userName = this.vm.email;
                    });
                    this.isBusy = true;
                    this.accountWebService.Account_ForgotPassword(resetPasswordRequest).then((item: sierra.model.ApiResultModelResetPasswordResponse) => {
                        this.isBusy = false;
                        if (item.items.status) {
                            this.vm.emailSuccess = true;
                            this.vm.emailRequired = false;
                            this.vm.incorrectEmail = false;
                        } else {
                            this.vm.incorrectEmail = true;
                        }
                    });
                }
            } else {
                this.vm.emailRequired = true;
            }
        }
    }

    interface IForgetPasswordControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.HomeLayoutController> {
    }

    export const route: IPageState = {
        name: 'forget-password',
        layout: layout.homeRoute,
        templateUrl: 'forget-password/forget-password.html',
        url: '/forgot-password'
    };

    registerController(ForgetPasswordController, route);
}
