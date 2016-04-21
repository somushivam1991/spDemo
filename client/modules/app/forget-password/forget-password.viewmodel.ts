/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.forgetpassword {
    export interface ViewModel {
        email: string;
        emailRequired: boolean;
        emailSuccess: boolean;
        incorrectEmail: boolean;
    }
}
