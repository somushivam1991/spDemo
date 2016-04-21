/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.dashboard.prospect {

    export class ProspectController extends ngTemplate.core.bases.NestedPageController<DashBoardController> {

        public prospectGrid: uiGrid.IGridOptions;
        public prospectGridData: ProspectVM[];
        public vm: ViewModel;
        public viewTemplates: TextPair[];
        public masters: app.masters.service.Masters;

        /* @ngInject */
        constructor($scope: ngTemplate.core.bases.INestedPageControllerScope<DashBoardController>,
                    private prospectService: ProspectService,
                    private $timeout: ng.ITimeoutService,
                    private prospectView: sierra.model.ApiResultModelGetProspectPipelineResponse,
                    private $state: angular.ui.IStateService) {
                    super($scope, 'dashboard');
                    this.masters = this.prospectService.getMasters();
                    this.vm = this.prospectService.createEmptyViewModel();
                    this.initializeProspectGrid();
                    this.vm.prospectSource.name = this.masters.prospectView[0];
                    if (Boolean(prospectView)) {
                        this.vm.prospects = this.prospectService.createClientViewModel(prospectView.items.deals);
                        this.vm.filter = {
                            page: 1,
                            pageSize: this.vm.prospects.length
                        };
                        this.bindProspectGrid(this.vm.filter);
                    }

                    //watching Grid always
                    this.$scope.$watch(() => this.prospectGrid.data, (newValue: ProspectVM[], oldValue: ProspectVM[]) => {
                        this.setGridDynamicHeight(newValue.length);
                    }, true);
        }

        public onChangeClick(): void {
            if (this.vm.prospectSource.name.value === 'Lead_source') {
                this.vm.showGridColumns.isLeadSource = true;
            } else {
                this.vm.showGridColumns.isLeadSource = false;
            }
            this.initializeProspectGrid();
            this.bindProspectGrid(this.vm.filter);

        }

        private initializeProspectGrid(): void {
            this.prospectGrid = <uiGrid.IGridOptions>{
                columnDefs: [
                    { field: 'id', displayName: '', visible: false},
                    { field: 'lastName', displayName: 'Last name', enableHiding: false, cellTooltip: true, headerTooltip: true, enableFiltering: false, minWidth: 150 },
                    { field: 'firstName', displayName: 'First Name', enableHiding: false, cellTooltip: true, headerTooltip: true, enableFiltering: false, minWidth: 150 },
                    { field: 'nickName', displayName: 'Nick name', enableHiding: false, cellTooltip: true, headerTooltip: true, enableFiltering: false, minWidth: 150 },
                    { field: 'preferredContactMethod', displayName: 'Preferred Contact', enableHiding: false, cellTooltip: true, headerTooltip: true, enableFiltering: false, minWidth: 150 },
                    { field: 'bestTimeToContact', displayName: 'Best Time To Contact', enableHiding: false, cellTooltip: true, headerTooltip: true,
                    cellFilter: 'date:\'MM/dd/yyyy h:mm a\'',

                    visible: !this.vm.showGridColumns.isLeadSource, enableFiltering: false, minWidth: 150 },
                    { field: 'leadSource', displayName: 'Lead Source', enableHiding: false, cellTooltip: true, headerTooltip: true,
                    visible: this.vm.showGridColumns.isLeadSource, enableFiltering: false, minWidth: 150 },

                    { field: 'nextDateToContact', displayName: 'Next Time to Contact', enableHiding: false, cellTooltip: true, headerTooltip: true,
                      cellFilter: 'date:\'MM/dd/yyyy\'',

                    visible: !this.vm.showGridColumns.isLeadSource, enableFiltering: false, minWidth: 150 },
                    { field: 'leadName', displayName: 'Lead Name', enableHiding: false, cellTooltip: true, headerTooltip: true,
                    visible: this.vm.showGridColumns.isLeadSource, enableFiltering: false, minWidth: 150 },

                    { field: 'dateCreated', displayName: 'Date Created', enableHiding: false, cellTooltip: true, headerTooltip: true,
                      cellFilter: 'date:\'MM/dd/yyyy\'',
                        visible: !this.vm.showGridColumns.isLeadSource, enableFiltering: false, minWidth: 150 },

                    { field: 'initialCampaignType', displayName: 'Initial Campaign', enableHiding: false, cellTooltip: true, headerTooltip: true,
                    visible: this.vm.showGridColumns.isLeadSource, enableFiltering: false, minWidth: 150 },

                    { field: 'loanPurpose', displayName: 'Loan Purpose', enableHiding: false, cellTooltip: true, headerTooltip: true, enableFiltering: true, minWidth: 150,
                        cellTemplate:
                        `<span class="pur_dprosTab" ng-show="row.entity.loanPurpose == 'Purchase'" ><span class=" glyphicon glyphicon-home"></span>&nbsp{{row.entity.loanPurpose}}</span>` +
                        `<span ng-show="row.entity.loanPurpose == 'Refinance'" class="refin_dprosTab"><span class="glyphicon glyphicon-usd"></span>&nbsp{{row.entity.loanPurpose}}</span>` +
                        `<span ng-show="row.entity.loanPurpose != 'Purchase' && row.entity.loanPurpose != 'Refinance'">&nbsp{{row.entity.loanPurpose}}</span>`,
                      filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="loanPurpose"></div></div>' },
                    { field: 'programCategory', displayName: 'Loan Program', enableHiding: false, cellTooltip: true, headerTooltip: true, enableFiltering: true, minWidth: 150,
                      filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div custom-loan-filter filter-column-name="programCategory"></div></div>' },
                    { field: 'firstTimeHomeBuyer', displayName: 'First Time Home Buyer', enableHiding: false, cellTooltip: true, headerTooltip: true, enableFiltering: false, minWidth: 150,
                        cellTemplate:
                        `<span class="checkMark_dprosTab"><span ng-show="row.entity.firstTimeHomeBuyer == true" class="fa fa-check-circle"></span></span>` +
                        `<span class="noCheckMark_dprosTab" ng-show="row.entity.firstTimeHomeBuyer == false">-</span>` }
                ],
                enableFiltering: true,
                useExternalSorting: false,
                enableSorting: true,
                multiSelect: false,
                onRegisterApi: undefined,
                enableRowSelection: true,
                enableFullRowSelection: true,
                enableRowHeaderSelection: false,
                expandableRowHeight: 50,
                enablePaginationControls: false,
                selectedIndex: undefined,
                noUnselect: true,
                data: []
            };

            this.prospectGrid.onRegisterApi = (gridApi: uiGrid.IGridApi) => {
                gridApi.pagination.on.paginationChanged(this.$scope, (newPage: number, pageSize: number) => {
                    this.vm.filter.page = newPage;
                    this.vm.filter.pageSize = pageSize;
                    this.bindProspectGrid(this.vm.filter);
                });

                gridApi.selection.on.rowSelectionChanged(this.$scope, (row: uiGrid.IGridRow) => {
                    this.$state.go('edit-prospect', { prospectId: row.entity.id });
                });
            };
        }

        private bindProspectGrid(filter: FilterCriteria): void {
            if (Boolean(filter.searchCriteria)) {
                if (Boolean(filter.searchCriteria.lastName)) {
                    let filterGridData: ProspectVM[] = [];
                    for (let j: number = 0; j < this.vm.prospects.length; j++) {
                        if (this.vm.prospects[j].lastName.toLowerCase().indexOf(filter.searchCriteria.lastName.toLowerCase()) > -1) {
                            filterGridData.push(this.vm.prospects[j]);
                        }
                    }
                    this.prospectGrid.data = filterGridData.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);

                } else {
                    this.vm.filter.pageSize = 15;
                    this.prospectGrid.data = this.vm.prospects.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);
                }
            } else {
                this.prospectGrid.data = this.vm.prospects.slice((this.vm.filter.page - 1) * this.vm.filter.pageSize, this.vm.filter.page * this.vm.filter.pageSize);
            }
            this.prospectGrid.paginationPageSize = this.vm.filter.pageSize;
            this.prospectGrid.paginationCurrentPage = this.vm.filter.page;
            this.prospectGrid.totalItems = this.vm.prospects.length;
        }

        private setGridDynamicHeight(newValue: number): void {
            let length: number = newValue;
            if (length > 15) {
                length = 15;
            } else if (length === 0) {
                length = 1;
            }
            $('.prospectGridDynamicHeightGrid div.ui-grid-viewport').height((length * 30) + 20);
            $('.prospectGridDynamicHeightGrid').height((length * 30) + 85);

            this.$timeout(function(): void {
                $('.prospectGridDynamicHeightGrid').trigger('resize');
            }, 400);
        }

        //on Go click
        public onGoClick(): void {
            this.vm.filter = {
                page: 1,
                pageSize: this.vm.prospects.length,
                searchCriteria: {
                    lastName: this.vm.filter.searchCriteria.lastName
                }
            };
            this.bindProspectGrid(this.vm.filter);
        }
    }
    appModule.controller('prospectController', ProspectController);
}
