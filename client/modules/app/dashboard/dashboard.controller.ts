/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.dashboard {
    import layout = common.layouts.main;

    export class DashBoardController extends ngTemplate.core.bases.PageController<layout.LayoutController> {
        /* @ngInject */
        constructor($scope: any) {
            super($scope);
        }
        public isBusy: boolean;
    }
    appModule.controller('dashBoardController', DashBoardController);
}
