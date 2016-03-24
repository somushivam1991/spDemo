/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.home {
    import layout = common.layouts.home;

    export class HomeController extends ngTemplate.core.bases.PageController<layout.LayoutHomeController> {
        public vm: ViewModel;
        /* @ngInject */
        constructor($scope: IHomeControllerScope,
                    private $state: angular.ui.IStateService,
                    private homeServices: HomeServices,
                    private toastr: toastr.IToastrService) {
            super($scope);
            this.vm = this.homeServices.createViewModel();
            
        }

        public onSubmitClick(): void {
            if (Boolean(this.vm.username) && Boolean(this.vm.password)) {
                this.$state.go('dashboard');

            } else {
                this.$state.go('dashboard');
            }

        }
    }

    interface IHomeControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutHomeController> {
    }

    export const route: IPageState = {
        name: 'home',
        layout: layout.homeRoute,
        templateUrl: 'home/home.html',
        url: '/'
    };

    registerController(HomeController, route);
}
