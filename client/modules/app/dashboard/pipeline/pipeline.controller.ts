/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.dashboard.pipeline {
    export class PipleLineController extends ngTemplate.core.bases.NestedPageController<DashBoardController> {
        public pipelineGrid: uiGrid.IGridOptions;
        public pipelineAlert: uiGrid.IGridOptions;
        public vm: ViewModel;
        public pipelineViews: TextPair[];
        public masterPipeLineCalues: sierra.model.SPMPipelineView[] = undefined;
        public pipelineHeader: string;

        /* @ngInject */
        constructor($scope: ngTemplate.core.bases.INestedPageControllerScope<DashBoardController>,
                    private pipelineService: PipelineService,
                    private $timeout: ng.ITimeoutService,
                    private pipelineView: sierra.model.ApiResultModelGetPipelineLoansResponse,
                    private pipelineDp: sierra.model.ApiResultModelGetPipelineViewsResponse,
                    private loanWebService: sierra.service.ILoanWebService,
                    private alerts: sierra.model.GetAlertsResponse,
                    private popupService: popup.PopupService,
                    private alertWebService: sierra.service.IAlertWebService,
                    private homeState: app.home.HomeState
                    ) {
                    super($scope, 'dashboard');
                    this.vm = this.pipelineService.createEmptyViewModel();
                    this.initializePipelineGrid();
                    this.initializePipelineAlert();
                    //binding dropdown values
                    if (Boolean(pipelineDp)) {
                        this.masterPipeLineCalues = pipelineDp.items.views;
                        this.vm.pipelineDropDown = this.pipelineService.createClientDropDownModel(pipelineDp.items.views);
                        this.pipelineViews = this.pipelineService.createClientTextPair(this.vm.pipelineDropDown);

                        this.vm.search.pipelineView = this.pipelineViews[0].value;
                        this.pipelineHeader = this.pipelineViews[0].text;

                        for (let i: number = 0; i < this.pipelineViews.length; i++) {
                           if (this.pipelineViews[i].value  === this.pipelineService.getDefaultPipelineView(pipelineDp.items.views, this.getParent().layout.shell.defaultPipeLineView).code) {
                            this.vm.search.pipelineView = this.pipelineViews[i].value;
                            this.pipelineHeader = this.pipelineService.getPipelineHeader(this.pipelineViews[i].text);
                           }
                        }
                    }

                    //binding Grid Values
                    if (Boolean(pipelineView)) {
                        this.vm.pipeline = this.pipelineService.createClientViewModel(pipelineView.items.loans);
                        this.vm.filter = {
                            page: 1,
                            pageSize: this.vm.pipeline.length
                        };
                        this.bindPipleLineGrid(this.vm.filter, undefined);
                    }

                    if (Boolean(alerts)) {
                       this.vm.alerts = this.pipelineService.createAlertsViewModel(alerts.alerts);
                       this.pipelineAlert.data = this.vm.alerts;
                       this.setalertDynamicHeight(this.pipelineAlert.data.length, '.pipelineAlertDynamicHeightGrid');
                    }

                    //watching Grid always
                    this.$scope.$watch(() => this.pipelineGrid.data, (newValue: PipelineVM[], oldValue: PipelineVM[]) => {
                        this.setGridDynamicHeight(newValue.length, true, this.vm.pipeline.length);
                    }, true);
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
                        this.getParent().isBusy = false;
                        let removeAlert: Alert = undefined;
                        for (let i: number = 0; i < this.vm.alerts.length; i++) {
                            if (this.vm.alerts[i].id === item.id && this.vm.alerts[i].loanNumber === item.loanNumber) {
                                removeAlert = this.vm.alerts[i];
                            }
                        }
                        this.vm.alerts.remove(removeAlert);
                        this.pipelineAlert.data = this.vm.alerts;
                        this.setalertDynamicHeight(this.pipelineAlert.data.length, '.pipelineAlertDynamicHeightGrid');
                    } else {
                        this.getParent().isBusy = false;
                        this.popupService.showInfo('The application has encountered an unknown error.', 'Exception');
                    }
                });
            });
        }
       //on pipelineView Chnages
        public onViewChange(): void {
            //let index: number = this.pipelineViews.findIndex((item: PipelineDropDown) => item.name === this.vm.search.pipelineView.text && item.code === this.vm.search.pipelineView.value);
            this.vm.search.pipelineLastName = undefined;
            let index: number = undefined;
            for (let i: number = 0; i < this.pipelineViews.length; i++) {
                if (this.pipelineViews[i].value === this.vm.search.pipelineView) {
                    index = i;
                    this.pipelineHeader = this.pipelineService.getPipelineHeader(this.pipelineViews[i].text);
                }
            }
            let masterValues: sierra.model.SPMPipelineView = this.masterPipeLineCalues[index];
            this.getParent().isBusy = true;
            this.loanWebService.Loan_GetAsync('R', masterValues.code, 'ACTIVE', masterValues.type).then((data: sierra.model.ApiResultModelGetPipelineLoansResponse) => {
                this.getParent().isBusy = false;
                this.vm.pipeline = this.pipelineService.createClientViewModel(data.items.loans);
                this.vm.filter = {
                    page: 1,
                    pageSize: this.vm.pipeline.length
                };
                this.bindPipleLineGrid(this.vm.filter, undefined);
            });

            let alertRequest: sierra.model.GetAlertsRequest = sierra.model.ModelFactory.createEmptyGetAlertsRequest((m: sierra.model.GetAlertsRequest) => {
                m.code = masterValues.code;
                m.type = masterValues.type;
            });
            this.getParent().isBusy = true;
            this.alertWebService.Alert_PostAsync(alertRequest).then((result: sierra.model.GetAlertsResponse) => {
                this.getParent().isBusy = false;
                this.vm.alerts = this.pipelineService.createAlertsViewModel(result.alerts);
                this.pipelineAlert.data = this.vm.alerts;
                this.setalertDynamicHeight(this.pipelineAlert.data.length, '.pipelineAlertDynamicHeightGrid');
            });
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

        //on Expand Click
        public onExpandClick(): void {
          this.vm.isPipelineShowAlert = false;
            // this.vm.filter.pageSize = this.vm.pipeline.length + 1;
            // this.vm.filter.page = this.vm.filter.page;
            // this.pipelineGrid.data = this.vm.pipeline.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);
            // this.pipelineGrid.paginationPageSize = this.vm.filter.pageSize;
            // this.pipelineGrid.paginationCurrentPage = this.vm.filter.page;
            // this.pipelineGrid.totalItems = this.vm.pipeline.length;
            // this.setGridDynamicHeight(this.pipelineGrid.data.length, true, this.vm.pipeline.length);
        }

        //on Collapse Click
        public onCollapseClick(): void {
            this.vm.isPipelineShowAlert = true;
            if (this.pipelineGrid.data.length > 0) {
                this.setGridDynamicHeight(10, true, this.vm.pipeline.length);
            } else {
                this.setGridDynamicHeight(0, true, this.vm.pipeline.length);
            }
        }

        //on Go click
        public onGoClick(): void {
            this.vm.filter = {
                page: 1,
                pageSize: this.vm.pipeline.length
            };
            this.bindPipleLineGrid(this.vm.filter, this.vm.search.pipelineLastName);
        }

        // binding Grid
        private bindPipleLineGrid(filter: SearchCriteria, lastName: string): void {
            if (Boolean(lastName)) {
                let filterGridData: PipelineVM[] = [];
                //
                for (let j: number = 0; j < this.vm.pipeline.length; j++) {
                    if (Boolean(this.vm.pipeline[j].borrowerName)) {
                        if ((this.vm.pipeline[j].borrowerName.split(',')[0].slice().toLowerCase().indexOf(lastName.toLowerCase())) > -1
                            || (this.vm.pipeline[j].loanNumber.toString().indexOf(lastName.toLowerCase())) > -1) {
                            filterGridData.push(this.vm.pipeline[j]);
                        }
                    }
                }
                this.pipelineGrid.data = filterGridData.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);
            } else {
                this.pipelineGrid.data = this.vm.pipeline.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);
            }
            this.pipelineGrid.paginationPageSize = this.vm.filter.pageSize;
            this.pipelineGrid.paginationCurrentPage = this.vm.filter.page;
            this.pipelineGrid.totalItems = this.vm.pipeline.length;
        }

        // initialize Grid
        private initializePipelineGrid(): void {
            this.pipelineGrid = <uiGrid.IGridOptions>{
                columnDefs: [
                    { field: 'loanNumber', displayName: 'Loan Number', enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 140, enableFiltering: false },
                    { field: 'borrowerName', displayName: 'Borrower Name', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 160, enableFiltering: false },
                    { field: 'appDate', displayName: 'App Date', enableHiding: false, cellTooltip: true,
                    headerTooltip: true,  minWidth: 110, enableFiltering: false, cellFilter: 'date:\'MM/dd/yyyy\'' },
                    { field: 'status', displayName: 'Status', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 100,
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="status"></div></div>' },

                     { field: 'statusLastUpdated', displayName: 'Status Last Updated',  enableHiding: false, cellFilter: 'date:\'MM/dd/yyyy\'',
                      cellTooltip: true, headerTooltip: true,  minWidth: 190, enableFiltering: false },

                    { field: 'loanProgram', displayName: 'Loan Program',  enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 150,
                      filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanProgram"></div></div>' },

                    { field: 'lockExpiryDate', displayName: 'Lock Expire Date',  enableHiding: false,
                      cellTooltip: true, headerTooltip: true,  minWidth: 160, enableFiltering: false,
                      cellFilter: 'date:\'MM/dd/yyyy\''},

                    { field: 'estCOE', displayName: 'Est. COE', enableHiding: false,
                      cellTooltip: true, headerTooltip: true,  minWidth: 120, enableFiltering: false ,  cellFilter: 'date:\'MM/dd/yyyy\''},

                    { field: 'loanOfficer', displayName: 'Loan Officer', enableHiding: false,  cellTooltip: true, headerTooltip: true, minWidth: 150,
                      filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanOfficer"></div></div>' },
                    { field: 'Processor', displayName: 'Processor', enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 150,
                      filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="Processor"></div></div>'  },
                    { field: 'loanPurpose', displayName: 'Loan Purpose', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 170,
                       cellTemplate:
                        `<span class="pur_dprosTab" ng-show="row.entity.loanPurpose == 'Purchase'" ><span class=" glyphicon glyphicon-home"></span>&nbsp{{row.entity.loanPurpose}}</span>` +
                        `<span ng-show="row.entity.loanPurpose == 'Refinance'" class="refin_dprosTab"><span class="glyphicon glyphicon-usd"></span>&nbsp{{row.entity.loanPurpose}}</span>` +
                        `<span ng-show="row.entity.loanPurpose != 'Purchase' && row.entity.loanPurpose != 'Refinance'">&nbsp{{row.entity.loanPurpose}}</span>`,
                    filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanPurpose"></div></div>'   }
                ],
                enableFiltering: true,
                enableSorting: true,
                onRegisterApi: undefined,
                enableRowSelection: true,
                expandableRowHeight: 50,
                enablePaginationControls: false,
                data: []
            };
            this.pipelineGrid.onRegisterApi = (gridApi: uiGrid.IGridApi) => {
                gridApi.pagination.on.paginationChanged(this.$scope, (newPage: number, pageSize: number) => {
                    this.vm.filter.page = newPage;
                    this.vm.filter.pageSize = pageSize;
                    this.bindPipleLineGrid(this.vm.filter, undefined);
                });
            };
        }

        private initializePipelineAlert(): void {
            this.pipelineAlert = <uiGrid.IGridOptions>{
                columnDefs: [
                    { field: 'id', displayName: '', enableHiding: false, visible: false },
                     { field: 'applicationDate', displayName: 'Application Date', enableHiding: false, cellTooltip: true, headerTooltip: true,
                      minWidth: 150, enableFiltering: false, cellFilter: 'date:\'MM/dd/yyyy\''  },
                    { field: 'loanNumber', displayName: 'Loan Number', enableHiding: false, cellTooltip: true, headerTooltip: true, minWidth: 150, enableFiltering: false },
                    { field: 'lastName', displayName: 'Borrower Name', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 150, enableFiltering: false },
                    { field: 'message', displayName: 'Alert Notification', enableHiding: false, cellTooltip: true, headerTooltip: true,  minWidth: 150, enableFiltering: false },
                    {
                        field: 'loanNumber',  enableSorting: false,
                        displayName: '',
                        enableHiding: false,
                        cellTemplate: `<div><a href="javascript:void(0);" ` +
                        `ng-click="grid.appScope.pipelineTab.onRemoveClick(row.entity)"><span class="glyphicon glyphicon-trash">` +
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

        //setting Grid Height Based on condition
        private setGridDynamicHeight(newValue: number, filterShown: Boolean, totalRecords: number): void {
            let length: number = newValue;
            if (length === 0) {
                length = 3;
            } else if (length > totalRecords) {
                length = totalRecords;
            }

           // let gridHeaderHeight: number = filterShown ? 95 : 65;
            $('.pipelineGridDynamicHeightGrid div.ui-grid-viewport').height((length * 30) + 20);
            $('.pipelineGridDynamicHeightGrid').height((length * 30) + 50 ); // 20+ gridHeaderHeight
            this.$timeout(function(): void {
                $('.pipelineGridDynamicHeightGrid').trigger('resize');
            }, 400);
        }
    }
    appModule.controller('pipleLineController', PipleLineController);
}
