/// <reference path="../../../typings/lib.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

namespace security {
    export class IdleTimeoutService {
        /* @ngInject */
        constructor(
            private Idle: ngIdle.IIdle,
            private Keepalive: ngIdle.IKeepalive,
            private toastr: toastr.IToastrService,
            private $state: angular.ui.IStateService,
            private popupService: popup.PopupService) {
        }

        private started: boolean = false;
        //private warning: angular.IPromise<boolean>;

        public idleTimeout(): void {
            let i: number = sessionStorage.length;
            while (i--) {
                let key: any = sessionStorage.key(i);
                sessionStorage.removeItem(key);
            }
             this.popupService.showNavigation('Your Session has expired !', 'Session Timeout', 'Sign In').then(
                () => {
                    this.stop();
                    this.$state.go('home');
                }
            );
        }

        public idleStart(): void {
            this.toastr.warning('Your session is about to expire! \n You will be logged out in 2 minutes'); // warning message before system logout.
        }

        public start(): void {
            this.Idle.watch();
            this.started = true;
        }

        public stop(): void {
            this.Idle.unwatch();
            this.started = false;
        }
    }
    securityModule.service('idleTimeoutService', IdleTimeoutService);
}
