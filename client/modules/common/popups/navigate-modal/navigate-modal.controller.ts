/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace popup.navigateType {
    export class NavigateModalController extends bases.BaseModalPopupController<INavigateModalData, boolean> {
        /* @ngInject */
        constructor($modalInstance: angular.ui.bootstrap.IModalServiceInstance,
                    data: INavigateModalData) {
                    super($modalInstance, data);
        }

        protected getSuccessResult(): boolean {
            return true;
        }
    }

    export interface INavigateModalData extends bases.IHtmlPopupData {
        messages: string[];
    }

    common.commonModule.controller('navigateModalController', NavigateModalController);
}
