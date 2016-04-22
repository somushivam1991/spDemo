/// <reference path="../../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../../typings/app.d.ts" />

namespace app.loan.liability {
    import layout = common.layouts.loan;

    export const editliabilityroute: IPageState = {
        name: 'edit-liability',
        layout: layout.route,
        templateUrl: 'loan1/1003/liability/liability.html',
        url: '/1003/liability/{loanNumber}',
        resolve: {
            loanNumber:
            /* @ngInject */
            ($stateParams: angular.ui.IStateParamsService): string => {
                let id: string = $stateParams['loanNumber'];
                return id;
            }
        }
    };

    export class LiabilityController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        /* @ngInject */
        constructor($scope: ILiabilityControllerScope) {
            super($scope);
        }

        public get liabilityForm(): IliabilityForm {
            return (<ILiabilityControllerScope>this.$scope).liabilityForm;
        }
    }

    interface ILiabilityControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
        liabilityForm: IliabilityForm;
    }

    export interface IliabilityForm extends ng.IFormController {
    }
    registerController(LiabilityController, editliabilityroute);
}
