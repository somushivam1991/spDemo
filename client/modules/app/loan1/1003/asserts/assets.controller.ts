/// <reference path="../../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../../typings/app.d.ts" />

namespace app.loan.assets {
    import layout = common.layouts.loan;

    export const editAssetsroute: IPageState = {
        name: 'edit-assets',
        layout: layout.route,
        templateUrl: 'loan1/1003/asserts/assets.html',
        url: '/1003/assets/{loanNumber}',
        resolve: {
            loanNumber:
            /* @ngInject */
            ($stateParams: angular.ui.IStateParamsService): string => {
                let id: string = $stateParams['loanNumber'];
                return id;
            }
        }
    };

    export class AssetsController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        /* @ngInject */
        constructor($scope: IAssetsControllerScope) {
            super($scope);
        }

        public get assetsForm(): IAssetsForm {
            return (<IAssetsControllerScope>this.$scope).assetsForm;
        }
    }

    interface IAssetsControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
        assetsForm: IAssetsForm;
    }

    export interface IAssetsForm extends ng.IFormController {
    }
    registerController(AssetsController, editAssetsroute);
}
