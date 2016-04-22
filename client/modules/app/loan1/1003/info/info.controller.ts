/// <reference path="../../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../../typings/app.d.ts" />

namespace app.loan.info {
    import layout = common.layouts.loan;

    export const editInforoute: IPageState = {
        name: 'edit-info',
        layout: layout.route,
        templateUrl: 'loan1/1003/info/info.html',
        url: '/1003/info/{loanNumber}',
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
                loanWebService.Loan_Get(loanNumber),
            refType:
            /* @ngInject */
            (refDataWebService: sierra.service.IRefDataWebService): ng.IPromise<sierra.model.ApiResultModelIEnumerableRefData> =>
                refDataWebService.RefData_Get('states')
        }
    };

    export class InfoController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        public masters: app.masters.service.Masters;
        public vm: ViewModel;
        public states: TextPair[];
        public armTypes: TextPair[];
        public counties: TextPair[];
        public amortizationArmSelected: boolean;
        public amortizationOtherSelected: boolean;
        public loanPurposeOtherSelected: boolean;
        public estClosingDate: common.directives.DatePicker;
        public contigencyRemovalDate: common.directives.DatePicker;
        /* @ngInject */
        constructor($scope: IInfoControllerScope,
                    private loanInfoServices: LoanInfoServices,
                    private loanInfo: sierra.model.ApiResultModelGetLoanResponse,
                    private refType: sierra.model.ApiResultModelIEnumerableRefData) {
            super($scope);

            this.masters = this.loanInfoServices.getMasters();
            this.armTypes = [{ text: 'ARM 1', value: '1' }, { text: 'ARM 2', value: '2' }, { text: 'ARM 3', value: '3' }];
            this.counties = [{ text: 'County 1', value: 'County_1' }, { text: 'County 2', value: 'County_2' }, { text: 'County 3', value: 'County_3' }];

            this.estClosingDate = new common.directives.DatePicker();
            this.estClosingDate.minDate = moment().toDate();

            this.contigencyRemovalDate = new common.directives.DatePicker();
            this.contigencyRemovalDate.minDate = moment().toDate();

            this.vm = this.loanInfoServices.createEmptyViewModel();

            //Masters default value
            this.vm.loanInfo.noOfMonths = + this.masters.loanInfoNoOfMonths[0].text;

            if (Boolean(refType)) {
                this.states = this.loanInfoServices.createClientTextPair(this.refType.items[0].data);
            }

            this.vm = this.loanInfoServices.createInfoViewModel(loanInfo.items.loan);

            console.log(this.vm.loanInfo.state);
        }

        public get infoForm(): IInfoForm {
            return (<IInfoControllerScope>this.$scope).infoForm;
        }

        public onAmortizationChange(): void {

            this.amortizationArmSelected = false;
            this.amortizationOtherSelected = false;
            this.vm.loanInfo.amortizationTypeValue = this.vm.loanInfo.amortizationType;

            switch (this.vm.loanInfo.amortizationType) {
                case 'ARM':
                    this.amortizationArmSelected = true;
                    break;
                case 'Other':
                    this.amortizationOtherSelected = true;
                    break;
                default :
            }
        }

        public onLoanPurposeChange(): void {
            this.loanPurposeOtherSelected = false;
            switch (this.vm.loanInfo.loanPurpose) {
                case 'Other':
                    this.loanPurposeOtherSelected = true;
                    break;
                default :
            }
        }
        public saveLoanInfo(): void {
            alert(this.vm);
        }
    }

    interface IInfoControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
        infoForm: IInfoForm;
    }

    export interface IInfoForm extends ng.IFormController {
    }
    registerController(InfoController, editInforoute);
}
