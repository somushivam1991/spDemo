/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace common.layouts.loan {
    /* @ngInject */
    export class LayoutController extends ngTemplate.core.bases.LayoutController<shell.ShellController> {
        /* @ngInject */
        constructor($scope: ngTemplate.core.bases.ILayoutControllerScope<shell.ShellController>,
                    private idleTimeoutService: security.IdleTimeoutService,
                    private accountWebService: sierra.service.IAccountWebService,
                    private $state: angular.ui.IStateService,
                    private popupService: popup.PopupService,
                    private loanModalsService: modal.LoanModalsService,
                    private toastr: toastr.IToastrService) {
                    super($scope);

                    this.username = this.getParent().userName;

                    this.idleTimeoutService.start();
                    $scope.$on('IdleTimeout', () => {
                        this.idleTimeoutService.idleTimeout();
                    });

                    $scope.$on('IdleStart', () => {
                        this.idleTimeoutService.idleStart();
                    });
        }
        public username: string = undefined;

        public onLogoffClick(): void {
            this.accountWebService.Account_LogOff().then((data: any) => {
                let i: number = sessionStorage.length;
                while (i--) {
                    let key: any = sessionStorage.key(i);
                    sessionStorage.removeItem(key);
                }
                //let url = window.location.href;
                //window.history.go(-window.history.length);
                this.$state.go('home');
            }).catch((data: ICatchException) => {
                this.popupService.showInfo('The application has encountered an unknown error.', 'Exception');
            });
        }

        public onChangePasswordClick(): void {
            let changePasswordRequest: sierra.model.ChangePasswordRequest = sierra.model.ModelFactory.createEmptyChangePasswordRequest();
            this.loanModalsService.showChangePassword(changePasswordRequest).then((data: sierra.model.ChangePasswordRequest) => {
                if (this.isChangePasswordValid()) {
                    // server call then message
                    this.toastr.success('Password Changed Succesfully', 'Change Password');
                }
            });
        }
        private isChangePasswordValid(): boolean {
            //validation we have to do here
            return false;
        }
    }
    export const route: IPageState = createLayoutRoute('loanLayout', 'layouts/loan/loan-layout.html');
    registerController(LayoutController, route);
}
