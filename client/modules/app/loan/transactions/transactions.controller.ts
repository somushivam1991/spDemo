/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.loan {
    export class TransactionsController extends ngTemplate.core.bases.NestedPageController<LoanController> {
       /* @ngInject */
        constructor($scope: ngTemplate.core.bases.INestedPageControllerScope<LoanController>) {
            super($scope, 'loan');
        }
    }
    appModule.controller('transactionsController', TransactionsController);
}