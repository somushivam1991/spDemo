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
                login: {
                    username: undefined,
                    password: undefined
                },
                error: {
                    usernameRequired: false,
                    passwordRequired: false,
                    invalidCredential: false
                }
            };
        }
    }
    appModule.service('homeServices', HomeServices);
}
