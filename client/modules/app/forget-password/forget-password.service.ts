/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.forgetpassword {

    export class ForgetPasswordServices {
        /* @ngInject */
        constructor() {
            //some data
        }

        public createViewModel(): ViewModel {
            return {
                email: undefined,
                emailRequired: false,
                emailSuccess: false,
                incorrectEmail: false
            };
        }
    }
    appModule.service('forgetPasswordServices', ForgetPasswordServices);
}
