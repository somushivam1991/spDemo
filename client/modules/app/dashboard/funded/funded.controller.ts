/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.dashboard.funded {
    export class FundedController extends ngTemplate.core.bases.NestedPageController<DashBoardController> {
        public fundedGrid: uiGrid.IGridOptions;
        public fundedAlert: uiGrid.IGridOptions;
        public vm: ViewModel;
        public fundedViews: TextPair[];
        public masterFundedCalues: sierra.model.SPMPipelineView[] = undefined;
        public fundedHeader: string;

        /* @ngInject */
        constructor($scope: ngTemplate.core.bases.INestedPageControllerScope<DashBoardController>,
                    private fundedService: FundedService,
                    private $timeout: ng.ITimeoutService,
                    private fundedView: sierra.model.ApiResultModelGetPipelineLoansResponse,
                    private fundedDp: sierra.model.ApiResultModelGetPipelineViewsResponse,
                    private loanWebService: sierra.service.ILoanWebService,
                    private alerts: sierra.model.GetAlertsResponse,
                    private popupService: popup.PopupService,
                    private alertWebService: sierra.service.IAlertWebService,
                    private homeState: app.home.HomeState) {
                    super($scope, 'dashboard');

                    this.vm = this.fundedService.createEmptyViewModel();
                    this.initializeFundedGrid();
                    this.initializePipelineAlert();

                    //binding dropdown values
                    if (Boolean(fundedDp)) {
                        this.masterFundedCalues = fundedDp.items.views;
                        this.vm.fundedDropDown = this.fundedService.createClientDropDownModel(fundedDp.items.views);
                        this.fundedViews = this.fundedService.createClientTextPair(this.vm.fundedDropDown);
                        this.vm.search.fundedView = this.fundedViews[0].value;
                        this.fundedHeader = this.fundedViews[0].text;

                        for (let i: number = 0; i < this.fundedViews.length; i++) {
                           if (this.fundedViews[i].value === this.fundedService.getDefaultFundedView(fundedDp.items.views, this.getParent().layout.shell.defaultPipeLineView).code) {
                            this.vm.search.fundedView = this.fundedViews[i].value;
                            this.fundedHeader = this.fundedService.getFundedHeader(this.fundedViews[i].text);
                           }
                        }
                    }

                    //binding Grid Values
                    if (Boolean(fundedView)) {
                        this.vm.funded = this.fundedService.createClientViewModel(fundedView.items.loans);
                        this.vm.filter = {
                            page: 1,
                            pageSize: this.vm.funded.length
                        };
                        this.bindFundedGrid(this.vm.filter, this.vm.search.fundedLastName);
                    }

                    if (Boolean(alerts)) {
                       this.vm.alerts = this.fundedService.createAlertsViewModel(alerts.alerts);
                       this.fundedAlert.data = this.vm.alerts;
                       this.setalertDynamicHeight(this.fundedAlert.data.length, '.fundedAlertDynamicHeightGrid');
                    }

                    //watching Grid always
                    this.$scope.$watch(() => this.fundedGrid.data, (newValue: FundedLoanVM[], oldValue: FundedLoanVM[]) => {
                        this.setGridDynamicHeight(newValue.length);
                    }, true);
        }

         private setalertDynamicHeight(newValue: number, gridId: string): void {
            let len: number = newValue;
            if (len > 2) {
                len = 2;
            } else if (len === 0) {
                len = 1;
            }
            this.$timeout(function(): void {
                $(gridId + 'div.ui-grid-viewport').height((len * 30) + 20);
                $(gridId).height((len * 30) + 85);
                $(gridId).trigger('resize');
            }, 400);
        }
        //on pipelineView Chnages
        public onViewChange(): void {
            //let index: number = this.pipelineViews.findIndex((item: PipelineDropDown) => item.name === this.vm.search.pipelineView.text && item.code === this.vm.search.pipelineView.value);
            this.vm.search.fundedLastName = undefined;
            let index: number = undefined;
            for (let i: number = 0; i < this.fundedViews.length; i++) {
                if (this.fundedViews[i].value === this.vm.search.fundedView) {
                    index = i;
                    this.fundedHeader = this.fundedService.getFundedHeader(this.fundedViews[i].text);
                }
            }
            let masterValues: sierra.model.SPMPipelineView = this.masterFundedCalues[index];
            this.getParent().isBusy = true;
            this.loanWebService.Loan_GetAsync('R', masterValues.code, 'FUNDED', masterValues.type).then((data: sierra.model.ApiResultModelGetPipelineLoansResponse) => {
                this.getParent().isBusy = false;
                this.vm.funded = this.fundedService.createClientViewModel(data.items.loans);
                this.vm.filter = {
                    page: 1,
                    pageSize: this.vm.funded.length
                };
                this.bindFundedGrid(this.vm.filter, undefined);
            });

            let alertRequest: sierra.model.GetAlertsRequest = sierra.model.ModelFactory.createEmptyGetAlertsRequest((m: sierra.model.GetAlertsRequest) => {
                m.code = masterValues.code;
                m.type = masterValues.type;
            });
            this.getParent().isBusy = true;
            this.alertWebService.Alert_PostAsync(alertRequest).then((result: sierra.model.GetAlertsResponse) => {
                this.getParent().isBusy =  false;
                this.vm.alerts = this.fundedService.createAlertsViewModel(result.alerts);
            });
        }

        public onExpandClick(): void {
            this.vm.isFundedShowAlert = false;
        }

        public onCollapseClick(): void {
            this.vm.isFundedShowAlert = true;
        }

        //on Go click
        public onGoClick(): void {
            this.vm.filter = {
                page: 1,
                pageSize: this.vm.funded.length
            };
            this.bindFundedGrid(this.vm.filter, this.vm.search.fundedLastName);
        }

             //alert Remove
        public onRemoveClick(item: sierra.model.SPMAlert): void {
            this.popupService.showConfirmation('Are you sure, want to Dismiss Alert?', 'Dismiss Alert', 'Yes', 'No').then(() => {
                let dismissAlertRequest: sierra.model.DismissAlertRequest = sierra.model.ModelFactory.createEmptyDismissAlertRequest((m: sierra.model.DismissAlertRequest) => {
                    m.loanNumber = item.loanNumber;
                    m.alertID = item.id;
                });
                this.getParent().isBusy = true;
                this.alertWebService.Alert_PostDismissAlertAsync(dismissAlertRequest).then((result: sierra.model.DismissAlertResponse) => {
                    if (result.status) {
                        let removeAlert: Alert = undefined;
                        for (let i: number = 0; i < this.vm.alerts.length; i++) {
                            if (this.vm.alerts[i].id === item.id && this.vm.alerts[i].loanNumber === item.loanNumber) {
                                removeAlert = this.vm.alerts[i];
                            }
                        }
                        this.vm.alerts.remove(removeAlert);
                        this.fundedAlert.data = this.vm.alerts;
                        this.setalertDynamicHeight(this.fundedAlert.data.length, '.fundedAlertDynamicHeightGrid');
                    } else {
                        this.popupService.showInfo('The application has encountered an unknown error.', 'Exception');
                    }
                    this.getParent().isBusy = false;
                });

            });
        }

        private bindFundedGrid(filter: SearchCriteria, lastName: string): void {
            if (Boolean(lastName)) {
                let filterGridData: FundedLoanVM[] = [];
                for (let j: number = 0; j < this.vm.funded.length; j++) {
                    if (Boolean(this.vm.funded[j].borrowerName)) {
                        if ((this.vm.funded[j].borrowerName.split(',')[0].slice().toLowerCase().indexOf(lastName.toLowerCase())) > -1
                        || (this.vm.funded[j].loanNumber.toString().indexOf(lastName.toLowerCase())) > -1) {
                            filterGridData.push(this.vm.funded[j]);
                        }
                    }
                }
                this.fundedGrid.data = filterGridData.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);
            } else {
                this.fundedGrid.data = this.vm.funded.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);
            }
            this.fundedGrid.paginationPageSize = this.vm.filter.pageSize;
            this.fundedGrid.paginationCurrentPage = this.vm.filter.page;
            this.fundedGrid.totalItems = this.vm.funded.length;
        }

        private initializeFundedGrid(): void {
            this.fundedGrid = <uiGrid.IGridOptions>{
                columnDefs: [
                    { field: 'loanNumber', displayName: 'Loan Number', enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 140 , enableFiltering: false  },
                    { field: 'borrowerName', displayName: 'Borrower Name', enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 160, enableFiltering: false },

                    { field: 'appDate', displayName: 'App Date', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 110, enableFiltering: false,
                        cellFilter: 'date:\'MM/dd/yyyy\''},
                    { field: 'status', displayName: 'Status', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 100,
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="status"></div></div>' },

                    { field: 'statusLastUpdated', displayName: 'Status Last Updated',  enableHiding: false,
                      cellTooltip: true, headerTooltip: true, minWidth: 190, enableFiltering: false,
                        cellFilter: 'date:\'MM/dd/yyyy\''},

                    { field: 'loanProgram', displayName: 'Loan Program',  enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 150,
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanProgram"></div></div>' },
                    { field: 'lockExpiryDate', displayName: 'Lock Expire Date',  enableHiding: false, cellFilter: 'date:\'MM/dd/yyyy\'',
                      cellTooltip: true, headerTooltip: true, minWidth: 160, enableFiltering: false },

                    { field: 'estCOE', displayName: 'Est. COE', enableHiding: false,
                      cellTooltip: true, headerTooltip: true,  minWidth: 120, enableFiltering: false },
                    { field: 'loanPurpose', displayName: 'Loan Purpose', enableHiding: false,  cellTooltip: true, headerTooltip: true,  minWidth: 170,
                     cellTemplate:
                      `<span class="pur_dprosTab" ng-show="row.entity.loanPurpose == 'Purchase'" ><span class=" glyphicon glyphicon-home"></span>&nbsp{{row.entity.loanPurpose}}</span>` +
                        `<span ng-show="row.entity.loanPurpose == 'Refinance'" class="refin_dprosTab"><span class="glyphicon glyphicon-usd"></span>&nbsp{{row.entity.loanPurpose}}</span>` +
                        `<span ng-show="row.entity.loanPurpose != 'Purchase' && row.entity.loanPurpose != 'Refinance'">&nbsp{{row.entity.loanPurpose}}</span>`,
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanPurpose"></div></div>' },
                    { field: 'closedDate', displayName: 'Closed Date', enableHiding: false,  cellTooltip: true, headerTooltip: true, width: 150, enableFiltering: false,
                    cellFilter: 'date:\'MM/dd/yyyy\''},
                    { field: 'fundedDate', displayName: 'Funded Date', enableHiding: false,  cellTooltip: true, headerTooltip: true, width: 150, enableFiltering: false,
                    cellFilter: 'date:\'MM/dd/yyyy\''}
                   //{ field: 'loanOfficer', displayName: 'Loan Officer', enableHiding: false,  cellTooltip: true, headerTooltip: true, width: '15%',
                   // filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanOfficer"></div></div>' },
                   // { field: 'Processor', displayName: 'Processor', enableHiding: false, cellTooltip: true, headerTooltip: true, width: '15%',  visible : false,
                   // filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="Processor"></div></div>' },
                   //{ field: 'loanPurpose', displayName: 'Loan Purpose', enableHiding: false, cellTooltip: true, headerTooltip: true, width: '15%',
                   // filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanPurpose"></div></div>' }
                ],
                enableFiltering: true,
                //useExternalSorting: true,
                enableSorting: true,
                onRegisterApi: undefined,
                enableRowSelection: true,
                expandableRowHeight: 50,
                enablePaginationControls: false,
                data: []
            };
        }

        private initializePipelineAlert(): void {
            this.fundedAlert = <uiGrid.IGridOptions>{
                columnDefs: [
                    { field: 'id', displayName: '', enableHiding: false, visible: false },
                    { field: 'applicationDate', displayName: 'Application Date', enableHiding: false, cellTooltip: true, headerTooltip: true,
                      minWidth: 150, enableFiltering: false, cellFilter: 'date:\'MM/dd/yyyy\''  },
                    { field: 'loanNumber', displayName: 'Loan Number', enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 150, enableFiltering: false },
                    { field: 'borrowerName', displayName: 'Borrower Name', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 150, enableFiltering: false },
                    { field: 'message', displayName: 'Alert Notification', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 150, enableFiltering: false },
                    {
                        field: 'loanNumber', enableSorting: false,
                        displayName: '',
                        enableHiding: false,
                        cellTemplate: `<div><a href="javascript:void(0);" ` +
                        `ng-click="grid.appScope.fundedTab.onRemoveClick(row.entity)"><span class="glyphicon glyphicon-trash">` +
                        `</span></a></div>`
                    }
                ],
                enableFiltering: false,
                enableSorting: true,
                enablePagination: false,
                onRegisterApi: undefined,
                enableRowSelection: true,
                data: []
            };
        }

        private setGridDynamicHeight(newValue: number): void {
            let length: number = newValue;
            if (length > 10) {
                length = 10;
            } else if (length === 0) {
                length = 1;
            }
            $('.pipelineGridDynamicHeightGrid div.ui-grid-viewport').height((length * 30) + 20);
            $('.pipelineGridDynamicHeightGrid').height((length * 30) + 70);

            this.$timeout(function(): void {
                $('.pipelineGridDynamicHeightGrid').trigger('resize');
            }, 400);
        }
    }
    appModule.controller('fundedController', FundedController);
}
