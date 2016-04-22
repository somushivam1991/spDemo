/// <reference path="../../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../../typings/app.d.ts" />

namespace app.loan.borrower {
    import layout = common.layouts.loan;

    export const createBorrowerroute: IPageState = {
        name: 'create-borrower',
        layout: layout.route,
        templateUrl: 'loan1/1003/borrower/borrower.html',
        url: '/1003/borrower/create',
        resolve: {
            loanNumber:
            /* @ngInject */
            (): string => undefined,
            loanInfo:
            /* @ngInject */
            (): sierra.model.ApiResultModelGetLoanResponse => undefined
        }
    };

    export const editBorrowerroute: IPageState = {
        name: 'edit-borrower',
        layout: layout.route,
        templateUrl: 'loan1/1003/borrower/borrower.html',
        url: '/1003/borrower/{loanNumber}',
        resolve: {
            loanNumber:
            /* @ngInject */
            ($stateParams: angular.ui.IStateParamsService): string => {
                let id: string = $stateParams['loanNumber'];
                return id;
            },
            loanInfo:
            /* @ngInject */
            (loanWebService: sierra.service.ILoanWebService, loanNumber: string): ng.IPromise<sierra.model.ApiResultModelGetLoanResponse> =>
                loanWebService.Loan_Get(loanNumber)
        }
    };

    export class BorrowerController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        /* @ngInject */
        constructor($scope: IBorrowerControllerScope,
                    private loanInfo: sierra.model.ApiResultModelGetLoanResponse) {
                    super($scope);
                    if (Boolean(loanInfo)) {
                        this.getParent().loan = loanInfo;
                    }
        }

        public get borrowerForm(): IBorrowerForm {
            return (<IBorrowerControllerScope>this.$scope).borrowerForm;
        }
    }

    interface IBorrowerControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
        borrowerForm: IBorrowerForm;
    }

    export interface IBorrowerForm extends ng.IFormController {
    }
    registerController(BorrowerController, createBorrowerroute, editBorrowerroute);
}
