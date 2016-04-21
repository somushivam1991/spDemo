/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.home {
    export interface ViewModel {
        login: LoginVM;
        error: LoginErrorVM;
    }

    export interface LoginVM {
        username: string;
        password: string;
    }

    export interface LoginErrorVM {
        usernameRequired: boolean;
        passwordRequired: boolean;
        invalidCredential: boolean;
    }

    export interface LoginModel {
        access_token: string;
        token_type: string;
        expires_in: number;
        userName: string;
        firstName: string;
        lastName: string;
        nmlsId: string;
        roles: string;
        defaultPipeLineView: string;
    }
}
