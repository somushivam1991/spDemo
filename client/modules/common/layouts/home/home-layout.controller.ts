/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace common.layouts.home {
    /* @ngInject */
    export class LayoutHomeController extends ngTemplate.core.bases.LayoutController<shell.ShellController> {
        constructor($scope: ngTemplate.core.bases.ILayoutControllerScope<shell.ShellController>) {
            super($scope);
        }
    }

    export const homeRoute: IPageState = createLayoutRoute('homeLayout', 'layouts/home/home-layout.html');
    registerController(LayoutHomeController, homeRoute);
}
