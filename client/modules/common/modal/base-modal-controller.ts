/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace modal.bases {
  export class BaseModalController<TModalData extends IModalData, TSuccess> {
         /* @ngInject */
        constructor(public $modalInstance: ng.ui.bootstrap.IModalServiceInstance,
                    public data: TModalData) {
        }

        public ok(): void {
            let result: TSuccess = this.getSuccessResult();
            if (result) {
                this.$modalInstance.close(result);
            } else {
                this.$modalInstance.close();
            }
        }

        public cancel(): void {
            this.$modalInstance.dismiss();
        }

        protected getSuccessResult(): TSuccess {
            return undefined;
        }
    }

    export interface IModalData {
        title: string;
        okTitle?: string;
        cancelTitle?: string;
        size?: ModalSize;
    }

    export enum ModalSize {
        Small,
        Large
    }
}
