/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace common.directives {
   commonModule.directive('customLoanFilter', () => {
        return <ng.IDirective>{
            restrict: 'A',
            template: `<label>{{colFilter.term}}</label><button ng-click="ctrl.showCustomModal()"><span class='glyphicon glyphicon-filter'></span></button>`,
            controller: 'customFilterModalCtrl',
            controllerAs: 'ctrl',
            scope: {
                filterColumnProperty: '@filterColumnName'
            }
        };
    });
}
