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
        'ngIdle',
        'ui.mask',

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
        
         /* smart-table modules */
         'smart-table',

        /* Angular-UI modules */
        'ui.router',
        'ui.bootstrap',
        'ui.select',
        'toggle-switch',
        'uiSwitch'
    ]);

    // HTTP interceptor
    appModule.factory('interceptor',
        /* @ngInject */
        ($injector: ng.auto.IInjectorService, homeState: app.home.HomeState) => {
            return {
                request: (config: ng.IRequestConfig): any => {
                    if (Boolean(homeState)) {
                        if (Boolean(homeState.authentication)) {
                            config.headers['Authorization'] = homeState.authentication;
                            config.headers['Content-Type'] = 'application/json';
                            //eval(homeState.authentication);
                            //JSON.parse(homeState.authentication);
                            //homeState.authentication.replace('"','');
                        }
                        if(config.url.indexOf('forgotPassword') > -1) {
                             config.headers['Content-Type'] = 'application/json;charset=UTF-8';
                        }
                    }
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
            $httpProvider.defaults.headers.common = "";
            $httpProvider.defaults.headers.post = "";
            $httpProvider.defaults.headers.put = "";
            $httpProvider.defaults.headers.patch = "";
            $httpProvider.defaults.headers.get = "";

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

    appModule.config(
        /* @ngInject */
        (IdleProvider: ngIdle.IIdleProvider) => {
            let sessionTotalTime: number = 20, warningTime: number = 10; // both have to be same units
            let multiplier: number = 60; //for converting to sec

            IdleProvider.idle((sessionTotalTime - warningTime) * multiplier);
            IdleProvider.timeout(warningTime * multiplier);
            // IdleProvider.timeout(warningTime * multiplier);
        }
    );

    // appModule.run(
    //     /* @ngInject */
    //     ($rootScope: angular.IRootScopeService, $state: angular.ui.IStateService) => {
    //         $rootScope.$on("$routeChangeStart", function(event, next, current) {
    //             if (!(next.templateUrl == "views/login.html")) {
    //                 $state.go('home');
    //             }
    //         })
    //     });

    // Global constants

    export interface IConstants {
        // Root of template URLs
        templateUrlRoot: string;

        // Number of milliseconds to wait before displaying the loading animation
        loadingAnimationDelay: number;

        // Prefix for all local and session storage items
        storagePrefix: string;
    }

    appModule.constant('constants', <IConstants>{
        templateUrlRoot: '/client/modules/app/',
        loadingAnimationDelay: 500,
        storagePrefix: 'ngStorage-'
    });

    export function registerController(controllerConstructor: Function, route: IPageState, ...secondaryRoutes: IPageState[]): angular.IModule {
        return registerControllers(controllerConstructor, route, secondaryRoutes, appModule);
    }
}
