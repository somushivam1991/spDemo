/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.loan {
    import layout = common.layouts.loan;

    export class LoanController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        /* @ngInject */
        constructor($scope: any) {
            super($scope);
        }
    }
    appModule.controller('loanController', LoanController);
}
