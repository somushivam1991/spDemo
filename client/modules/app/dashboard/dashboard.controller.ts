/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.dashboard {
    import layout = common.layouts.main;

    export class DashBoardController extends ngTemplate.core.bases.PageController<layout.LayoutController> {

        public dashBoardGrid: uiGrid.IGridOptions;
        public ageList: number[];
        public message: string;
        /* @ngInject */
        constructor($scope: IDashBoardControllerScope,
            private toastr: toastr.IToastrService,
            private dashBoardServices: DashBoardServices) { 
            super($scope);
            this.initializeDashBoardGrid();
            this.dashBoardGrid.data = this.dashBoardServices.createViewModel();
            this.dashBoardGrid.totalItems = 1000;
            this.message="Initialized!!! This is static message from dashboard controller.";
            this.ageList=[10,20,30,40,50]; 
        }
        
        /**
         * showAgeModal
         */
        public showAgeModal():void {
            this.ageList=[60,70,80,90,100]; 
            this.message="This is static message from dashboard controller.";
        }
        
        public clrDashBoardGrid():void{
            this.dashBoardGrid.data=[];
        }
        
        public initializeDashBoardGrid(): void {

            this.dashBoardGrid = <uiGrid.IGridOptions>{
                columnDefs: [
                    { field: 'loanNumber', displayName: 'LoanNumber', enableHiding: false, enableSorting: true, suppressRemoveSort: true, cellTooltip: true, headerTooltip: true },
                    { field: 'name', displayName: 'UserName', enableSorting: true, suppressRemoveSort: true, cellTooltip: true, headerTooltip: true },
                    { field: 'companyName', displayName: 'CompanyName', enableSorting: true, suppressRemoveSort: true, cellTooltip: true, headerTooltip: true },
                    {
                        field: 'loanNumber', enableSorting: false,
                        displayName: 'Action', enableHiding: false,
                        cellTemplate: `<div ng-show="row.entity.loanNumber"><a ui-sref="edit-user({ssoid:row.entity.ssoId})"> `
                        + `<span title="View And Edit" class="glyphicon glyphicon-pencil"></span></a></div>`
                    },
                    {
                        field: 'loanNumber', displayName: 'Loan',
                        filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in dashboard.ageList"><div my-custom-modal></div></div>', 
                    },
                ],
                //useExternalPagination: true,
                //useExternalSorting: true,
                enableSorting: true,
                enablePagination: true,
                enableFiltering: true,
                paginationPageSizes: [100],
                paginationPageSize: 100,
                expandableRowHeight: 100,
                enableGridMenu: true,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                data: this.dashBoardServices.createViewModel()
            };
            
            this.dashBoardGrid.onRegisterApi = (gridApi: uiGrid.IGridApi) => {
                gridApi.core.on['sortChanged'](this.$scope, (grid: uiGrid.IGridInstance, sortColumns: uiGrid.IColumnDef[]) => {
                    //do sorting
                });
                gridApi.pagination.on.paginationChanged(this.$scope, (newPage: number, pageSize: number) => {
                    //do pagination
                });
            };
        }
    }


    interface IDashBoardControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
    }

    export const dashBoardroute: IPageState = {
        name: 'dashboard',
        layout: layout.route,
        templateUrl: 'dashboard/dashboard.html',
        url: '/dashboard',
        title: 'DashBoard'
    };

    registerController(DashBoardController, dashBoardroute);

    module dashboard.Directives {
        export function myCustomModal(): ng.IDirective {
            return {
                template: '<label>{{colFilter.term}}</label><button ng-click="showAgeModal()">...</button>',
                controller: 'DashBoard'
            };
        }
    }
}
