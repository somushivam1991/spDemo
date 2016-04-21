/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace modal.bases {
    export class BaseModalService {
        /* @ngInject */
        constructor(public $modal: ng.ui.bootstrap.IModalService) {
        }

        protected getTemplateUrl(modalName: string): string {
            throw new Error('Must override the BaseModalService.getTemplateUrl() method.');
        }

        protected getModalSettings<TModalData extends IModalData>(modalName: string, modalData: TModalData): ng.ui.bootstrap.IModalSettings {
            let size: string = modalData.size ? ModalSize[modalData.size] : ModalSize[ModalSize.Large];
            return {
                templateUrl: this.getTemplateUrl(modalName),
                controller: `${modalName.snakeCaseToCamelCase()}ModalController`,
                controllerAs: 'modal',
                backdrop: 'static',
                size: size,
                keyboard: false,
                resolve: {
                    data: (): TModalData => modalData
                }
            };
        }
    }
}
