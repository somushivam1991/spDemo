/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace modal {
    export class LoanModalsService extends modal.bases.BaseModalService {
        /* @ngInject */
        constructor($modal: ng.ui.bootstrap.IModalService, private constants: app.IConstants) {
            super($modal);
        }

         public showChangePassword(info: sierra.model.ChangePasswordRequest): ng.IPromise<sierra.model.ChangePasswordRequest> {
            let modalSettings: ng.ui.bootstrap.IModalSettings = this.getModalSettings('change-password', {
                title: 'Change Password',
                okTitle: 'Change Password',
                cancelTitle: 'Cancel',
                size: modal.bases.ModalSize.Large,
                info: info || []
            });
            return this.$modal.open(modalSettings).result;
        }

        protected getTemplateUrl(modalName: string): string {
            return `/client/modules/common/modals/${modalName}/${modalName}-modal.html`;
        }
    }
    common.commonModule.service('loanModalsService', LoanModalsService);
}
