/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.home {
    export class HomeServices {
        /* @ngInject */
        constructor() {
            //some data
        }

        public createViewModel(): ViewModel {
            return {
                username: undefined,
                password: undefined
            };
        }
    }
    appModule.service('homeServices', HomeServices);
}
