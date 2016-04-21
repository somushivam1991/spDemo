/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace modal {
    export class ChangePasswordModalController extends modal.bases.BaseModalController<IChangePasswordModalController, sierra.model.ChangePasswordRequest> {
        /* @ngInject */
        //public properites
        public isCurrentEmpty: boolean = false;
        public isIncorrectCurrentPassword: boolean = false;
        public isPasswordLength: boolean = false;
        public isNewPasswordSameAsCurrent: boolean = false;
        public isConfirmPasswordMatching: boolean = false;
        public disableTagButton: boolean = false;
        public isBusy: boolean = false;
        public isCancelCurrentPwdError: boolean = false;
        public isCancelnewPwdError: boolean = false;
        public isCancelConfirmnewPwdError: boolean = false;
        public isNewPwdEmpty: boolean = false;
        public isNewConfirmPwdEmpty: boolean = false;
        public isPasswordHaveSpecialChar: boolean = false;
        public isNewPasswordExceed: boolean = false;
        //model declaration
        public currentPassword: string = undefined;
        public newPassword: string = undefined;
        public confirmPassword: string = undefined;
        //Constructor initialization     
        constructor($modalInstance: ng.ui.bootstrap.IModalServiceInstance, data: IChangePasswordModalController,
                    private accountWebService: sierra.service.IAccountWebService,
                    private toastr: toastr.IToastrService,
                    private popupService: popup.PopupService,
                    private $state: angular.ui.IStateService) {
                    super($modalInstance, data);
        }
        //Button click event
        public onChangePasswordClick(): void {
            if (this.ischangePasswordValid()) {
                this.isBusy = true;
                let changePasswordRequest: sierra.model.ChangePasswordRequest = sierra.model.ModelFactory.createEmptyChangePasswordRequest((m: sierra.model.ChangePasswordRequest) => {
                    m.oldPassword = this.currentPassword;
                    m.newPassword = this.newPassword;
                });
                this.accountWebService.Account_ChangePassword(changePasswordRequest).then((data: sierra.model.ApiResultModelChangePasswordResponse) => {
                    if (data.items.status === true) {
                        this.ok();
                        this.toastr.success('Password changed succesfully', 'Password change');
                    } else {
                        this.isIncorrectCurrentPassword = true;
                        this.isCancelCurrentPwdError = true;
                    }
                    this.isBusy = false;
                }).catch((data: common.ICatchException) => {
                    this.isBusy = false;
                    this.popupService.showInfo('The application has encountered an unknown error.', 'Exception');
                });
            }
        }

        public search(): void {
            //var charCode = (e.which) ? e.which : e.keyCode;     
            this.isCurrentEmpty = true;

        }
        //On clear button click
        public onClearClick(clearOption: string): void {
            if (clearOption === 'currentPassword') {
                this.currentPassword = undefined;
                this.isCurrentEmpty = false;
                this.isIncorrectCurrentPassword = false;
                this.isCancelCurrentPwdError = false;
            } else if (clearOption === 'newPassword') {
                this.newPassword = undefined;
                this.isPasswordHaveSpecialChar = false;
                this.isNewPasswordSameAsCurrent = false;
                this.isCancelnewPwdError = false;
                this.isNewPwdEmpty = false;
                this.isPasswordLength = false;
                this.isNewPasswordExceed = false;
            } else if (clearOption === 'confirmNewPassword') {
                this.confirmPassword = undefined;
                this.isConfirmPasswordMatching = false;
                this.isCancelConfirmnewPwdError = false;
                this.isNewConfirmPwdEmpty = false;
            }
        }
        private ischangePasswordValid(): boolean {
            this.isCurrentEmpty = false;
            this.isPasswordLength = false;
            this.isNewPasswordSameAsCurrent = false;
            this.isConfirmPasswordMatching = false;
            this.isNewPwdEmpty = false;
            this.isNewConfirmPwdEmpty = false;
            this.isCancelCurrentPwdError = false;
            this.isCancelnewPwdError = false;
            this.isCancelConfirmnewPwdError = false;
            this.isPasswordHaveSpecialChar = false;
            this.isNewPasswordExceed = false;
            // Validation Part
            if (!Boolean(this.currentPassword)) {
                this.isCurrentEmpty = true;
                this.isCancelCurrentPwdError = true;
                return false;
            } else if (!Boolean(this.newPassword)) {
                this.isNewPwdEmpty = true;
                this.isCancelnewPwdError = true;
                return false;
            } else if (/^[a-zA-Z0-9- ]*$/.test(this.newPassword) === false) {
                this.isPasswordHaveSpecialChar = true;
                this.isCancelnewPwdError = true;
                return false;
            } else if (this.newPassword.length < 6) {
                this.isPasswordLength = true;
                this.isCancelnewPwdError = true;
                return false;
            } else if (this.newPassword.length > 50) {
                this.isNewPasswordExceed = true;
                this.isCancelnewPwdError = true;
                return false;
            } else if (!Boolean(this.confirmPassword)) {
                this.isNewConfirmPwdEmpty = true;
                this.isCancelConfirmnewPwdError = true;
                return false;
            } else if (this.newPassword === this.currentPassword) {
                this.isNewPasswordSameAsCurrent = true;
                this.isCancelnewPwdError = true;
                return false;
            } else if (this.newPassword !== this.confirmPassword) {
                this.isConfirmPasswordMatching = true;
                this.isCancelConfirmnewPwdError = true;
                return false;
            }
            return true;
        }
    }

    export interface IChangePasswordModalController extends modal.bases.IModalData {
        info: sierra.model.ChangePasswordRequest;
    }
    common.commonModule.controller('changePasswordModalController', ChangePasswordModalController);
}
