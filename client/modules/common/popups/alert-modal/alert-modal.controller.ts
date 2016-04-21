/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace popup.alertModal {
    export class AlertModalController extends bases.BaseModalPopupController<IAlertModalData, boolean> {
        /* @ngInject */
        constructor($modalInstance: angular.ui.bootstrap.IModalServiceInstance,
                    data: IAlertModalData) {
            super($modalInstance, data);
        }

        protected getSuccessResult(): boolean {
            return true;
        }
    }

    export interface IAlertModalData extends bases.IHtmlPopupData {
        messages: string[];
        alertType: AlertType;
    }

    export enum AlertType {
        info,
        warning,
        danger
    }

    common.commonModule.controller('alertModalController', AlertModalController);
}
