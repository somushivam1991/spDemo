/// <reference path="../../../typings/lib.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

namespace app {
    export const appModule: angular.IModule = angular.module('app', [
        /* App modules */
        //'demo',
        'security',
        'common',
        'ngTemplate.core',

        'toastr',

        /* Angular modules */
        'ngSanitize',
        'ngAnimate',
        'ngMessages',
        'ngAria',

        /* ui-grid modules */
        'ui.grid',
        'ui.grid.selection',
        'ui.grid.pagination',
        'ui.grid.expandable',
        'ui.grid.pinning',
        'ui.grid.resizeColumns',
        'ui.grid.autoResize',
        'ui.grid.exporter',
        'ui.grid.edit',
        'ui.grid.rowEdit',
        'ui.grid.cellNav',
        
        /* Angular-UI modules */
        'ui.router'
    ]);

    // HTTP interceptor
    appModule.factory('interceptor',
        /* @ngInject */
        ($injector: ng.auto.IInjectorService) => {
            return {
                request: (config: ng.IRequestConfig): any => {
                    // if (Boolean(window.sessionStorage.getItem("authenticationtoken"))) {
                    //     config.headers['Authorization'] = JSON.parse(window.sessionStorage.getItem("authenticationtoken"));
                    // }
                    return config;
                }
            };
        }
    );

    // HTTP interceptor registration
    appModule.config(
        /* @ngInject */
        ($httpProvider: ng.IHttpProvider) => {
            $httpProvider.interceptors.push('interceptor');
        }
    );

     appModule.config(
        /* @ngInject */
        (toastrConfig: toastr.IConfigOptions) => {
            toastrConfig.closeButton = true;
            toastrConfig.positionClass = 'toast-top-right';
            toastrConfig.progressBar = false;
            //toastrConfig.timeOut = 0; //If you set it to 0, it will stick
            toastrConfig.tapToDismiss = true;
            // toastrConfig.autoDismiss = false;
            //toastrConfig.onShown = function(){
            //    console.log('shown');
            //}
        }
        );

    export function registerController(controllerConstructor: Function, route: IPageState, ...secondaryRoutes: IPageState[]): angular.IModule {
        return registerControllers(controllerConstructor, route, secondaryRoutes, appModule);
    }
}
