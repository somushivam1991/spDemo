/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace common.shell {
    export class ShellController extends ngTemplate.core.bases.BaseShellController {
        /* @ngInject */
        constructor($injector: angular.auto.IInjectorService) {
            super($injector);
        }
        public userName: string = undefined;
        public userEmail: string = undefined;
        public defaultPipeLineView: string = undefined;
    }

    commonModule.controller('shellController', ShellController);
}
