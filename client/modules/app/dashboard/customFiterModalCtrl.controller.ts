/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.dashboard {

    export class CustomFilterModalCtrl {
        /* @ngInject */
        constructor($scope: any, $compile: any, $timeout: any) {
            this.$compile = $compile;
            this.$scope = $scope;
            this.$timeout = $timeout;
            this.parameter = this.$scope.filterColumnProperty;
        }
        private $compile: any;
        private $scope: any;
        private $timeout: any;

        private $el: any;

        private listOfValues: any;
        private gridApi: any;
        private gridOptions: any;

        private parameter: string;

        public showCustomModal(): void {
            this.listOfValues = [];

            let self: any = this;

            this.gridOptions = {
                data: [],
                enableColumnMenus: false,
                onRegisterApi(gridApi: uiGrid.IGridApi): void {
                    self.gridApi = gridApi;

                    // if (self.$scope.colFilter && self.$scope.colFilter.listTerm) {
                    //     self.$timeout(() => {
                    //         self.$scope.colFilter.listTerm.forEach((val: any) => {
                    //             var entities = self.gridOptions.data.filter(function(row) {
                    //                 return row[self.parameter] === val;
                    //             });

                    //             if (entities.length > 0) {
                    //                 self.gridApi.selection.selectRow(entities[0]);
                    //             }
                    //         });
                    //     });
                    // }
                }
            };

            this.$scope.$parent.col.grid.options.data.forEach((row: any) => {
                if (this.listOfValues.indexOf(row[this.parameter]) === -1) {
                    this.listOfValues.push(row[this.parameter]);
                }
            });
            this.listOfValues.sort();

            this.listOfValues.forEach((val: any) => {
                this.gridOptions.data.push({ value: val });
            });

            let html: any = `<div class="modal" ng-style="{display: 'block'}"><div class="modal-dialog modal-sm">
            <div class="modal-content"><div class="modal-header">Filter</div><div class="modal-body">
            <div id="grid1" ui-grid="ctrl.gridOptions" ui-grid-selection class="modalGrid"></div></div>
            <div class="modal-footer">
            <button id="buttonClose" class="btn btn-primary" ng-click="ctrl.close()">Filter</button>
            </div></div></div></div>`;
            this.$el = angular.element(html);
            angular.element(document.body).prepend(this.$el);

            this.$compile(this.$el)(this.$scope);

        };

        public close(): void {
            let values: any = this.gridApi.selection.getSelectedRows();
            this.$scope.$parent.colFilter.listTerm = [];

            values.forEach((val: any) => {
                this.$scope.$parent.colFilter.listTerm.push(val.value);
            });

            this.$scope.$parent.colFilter.term = this.$scope.$parent.colFilter.listTerm.join(', ');
            this.$scope.$parent.colFilter.condition = new RegExp(this.$scope.$parent.colFilter.listTerm.join('|'));

            if (this.$el) {
                this.$el.remove();
            }
        };

    }
    appModule.controller('customFilterModalCtrl', CustomFilterModalCtrl);
}
