/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.loan.info {
    export class LoanInfoController extends ngTemplate.core.bases.NestedPageController<LoanController> {
        public masters: app.masters.service.Masters;
        public vm: ViewModel;

        /* @ngInject */
        constructor($scope: ngTemplate.core.bases.INestedPageControllerScope<LoanController>,
            private loanInfoServices: LoanInfoServices,
            private loanInfo: sierra.model.ApiResultModelGetLoanResponse) {
            super($scope, 'loan');
            this.masters = this.loanInfoServices.getMasters();
            this.vm = this.loanInfoServices.createEmptyViewModel();

            this.vm = this.loanInfoServices.createInfoViewModel(loanInfo.items.loan);
            
            console.log(this.vm);
        }

        public saveLoanInfo(): void {
            alert(this.vm);
        }
    }
    appModule.controller('infoController', LoanInfoController);
}
