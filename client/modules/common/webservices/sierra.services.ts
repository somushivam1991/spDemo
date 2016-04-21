/// <reference path="../../../../typings/tsd.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace sierra.service {
    export interface IAccountWebService {
        Account_LogOff(): angular.IPromise<sierra.model.ApiResultModelLogOffUserResponse>;
        Account_ChangePassword(userPasswordChangeRequest: sierra.model.ChangePasswordRequest): angular.IPromise<sierra.model.ApiResultModelChangePasswordResponse>;
        Account_ForgotPassword(resetPasswordRequest: sierra.model.ResetPasswordRequest): angular.IPromise<sierra.model.ApiResultModelResetPasswordResponse>;
        Account_GetPipeLineViews(channel: string): angular.IPromise<sierra.model.ApiResultModelGetPipelineViewsResponse>;
    }
    export interface IAlertWebService {
        Alert_PostAsync(alertsRequest: sierra.model.GetAlertsRequest): angular.IPromise<sierra.model.GetAlertsResponse>;
        Alert_PostDismissAlertAsync(dismissAlertRequest: sierra.model.DismissAlertRequest): angular.IPromise<sierra.model.DismissAlertResponse>;
    }
    export interface IAnnouncementWebService {
        Announcement_GetAsync(): angular.IPromise<sierra.model.ApiResultModelIEnumerableAnnouncementResponse>;
    }
    export interface ILoanWebService {
        Loan_GetAsync(channel: string, code: string, pipelineFilter: string, type: string): angular.IPromise<sierra.model.ApiResultModelGetPipelineLoansResponse>;
        Loan_Post(loanRequest: sierra.model.SaveRequest): angular.IPromise<sierra.model.ApiResultModelSaveLoanResponse>;
        Loan_Get(loanNumber: string): angular.IPromise<sierra.model.ApiResultModelGetLoanResponse>;
    }
    export interface IProspectWebService {
        Prospect_GetAllProspects(): angular.IPromise<sierra.model.ApiResultModelGetProspectPipelineResponse>;
        Prospect_SaveProspect(deal: sierra.model.SPMDeal): angular.IPromise<sierra.model.ApiResultModelCreateProspectResponse>;
        Prospect_GetProspect(id: string): angular.IPromise<sierra.model.ApiResultGetProspectResponse>;
        Prospect_ValidateProspect(validateProspectDetail: sierra.model.ValidatePropsectDetails): angular.IPromise<sierra.model.ApiResultModelValidateProspectResponse>;
    }
    export interface IRefDataWebService {
        RefData_Get(types: string): angular.IPromise<sierra.model.ApiResultModelIEnumerableRefData>;
    }
    export interface ISampleWebService {
        Sample_GetAllLoan(): angular.IPromise<sierra.model.ApiResultModelIEnumerableLoan>;
        Sample_Post(loan: sierra.model.Loan): angular.IPromise<sierra.model.Loan>;
        //Sample_GetAllLoanPaged(pageRequest.page?: number, pageRequest.pageSize?: number): angular.IPromise<sierra.model.PagedApiResultModelLoan>;
        Sample_GetLoan(id: number): angular.IPromise<sierra.model.ApiResultModelLoan>;
    }
}
namespace sierra.service {
    export class AccountWebService implements sierra.service.IAccountWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public Account_LogOff(): angular.IPromise<sierra.model.ApiResultModelLogOffUserResponse> {
            let resourceUrl: string = '/api/account/logOff';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelLogOffUserResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelLogOffUserResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelLogOffUserResponse>( {
                        method: 'POST',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelLogOffUserResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Account_ChangePassword(userPasswordChangeRequest: sierra.model.ChangePasswordRequest): angular.IPromise<sierra.model.ApiResultModelChangePasswordResponse> {
            let resourceUrl: string = '/api/account/changePassword';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelChangePasswordResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelChangePasswordResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelChangePasswordResponse>( {
                        method: 'POST',
                        data: userPasswordChangeRequest,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelChangePasswordResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Account_ForgotPassword(resetPasswordRequest: sierra.model.ResetPasswordRequest): angular.IPromise<sierra.model.ApiResultModelResetPasswordResponse> {
            let resourceUrl: string = '/api/account/forgotPassword';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelResetPasswordResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelResetPasswordResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelResetPasswordResponse>( {
                        method: 'POST',
                        data: resetPasswordRequest,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelResetPasswordResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Account_GetPipeLineViews(channel: string): angular.IPromise<sierra.model.ApiResultModelGetPipelineViewsResponse> {
            let resourceUrl: string = '/api/account/pipeLineViews/{channel}'.replace('{channel}', channel.toString());
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelGetPipelineViewsResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelGetPipelineViewsResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelGetPipelineViewsResponse>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelGetPipelineViewsResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('accountWebService', AccountWebService);
    export class AlertWebService implements sierra.service.IAlertWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public Alert_PostAsync(alertsRequest: sierra.model.GetAlertsRequest): angular.IPromise<sierra.model.GetAlertsResponse> {
            let resourceUrl: string = '/api/alerts';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.GetAlertsResponse>(
                (resolve: angular.IQResolveReject<sierra.model.GetAlertsResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.GetAlertsResponse>( {
                        method: 'POST',
                        data: alertsRequest,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.GetAlertsResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Alert_PostDismissAlertAsync(dismissAlertRequest: sierra.model.DismissAlertRequest): angular.IPromise<sierra.model.DismissAlertResponse> {
            let resourceUrl: string = '/api/alerts/dismissAlertAsync';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.DismissAlertResponse>(
                (resolve: angular.IQResolveReject<sierra.model.DismissAlertResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.DismissAlertResponse>( {
                        method: 'POST',
                        data: dismissAlertRequest,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.DismissAlertResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('alertWebService', AlertWebService);
    export class AnnouncementWebService implements sierra.service.IAnnouncementWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public Announcement_GetAsync(): angular.IPromise<sierra.model.ApiResultModelIEnumerableAnnouncementResponse> {
            let resourceUrl: string = '/api/announcement';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelIEnumerableAnnouncementResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelIEnumerableAnnouncementResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelIEnumerableAnnouncementResponse>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelIEnumerableAnnouncementResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('announcementWebService', AnnouncementWebService);
    export class LoanWebService implements sierra.service.ILoanWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public Loan_GetAsync(channel: string, code: string, pipelineFilter: string, type: string): angular.IPromise<sierra.model.ApiResultModelGetPipelineLoansResponse> {
            let resourceUrl: string = '/api/loan';
            let queryParams: any = {
                 channel: channel,
                 code: code,
                 pipelineFilter: pipelineFilter,
                 type: type
            };
            return new this.$q<sierra.model.ApiResultModelGetPipelineLoansResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelGetPipelineLoansResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelGetPipelineLoansResponse>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelGetPipelineLoansResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Loan_Post(loanRequest: sierra.model.SaveRequest): angular.IPromise<sierra.model.ApiResultModelSaveLoanResponse> {
            let resourceUrl: string = '/api/loan';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelSaveLoanResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelSaveLoanResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelSaveLoanResponse>( {
                        method: 'POST',
                        data: loanRequest,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelSaveLoanResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Loan_Get(loanNumber: string): angular.IPromise<sierra.model.ApiResultModelGetLoanResponse> {
            let resourceUrl: string = '/api/loan/{loanNumber}'.replace('{loanNumber}', loanNumber.toString());
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelGetLoanResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelGetLoanResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelGetLoanResponse>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelGetLoanResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('loanWebService', LoanWebService);
    export class ProspectWebService implements sierra.service.IProspectWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public Prospect_GetAllProspects(): angular.IPromise<sierra.model.ApiResultModelGetProspectPipelineResponse> {
            let resourceUrl: string = '/api/prospect';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelGetProspectPipelineResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelGetProspectPipelineResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelGetProspectPipelineResponse>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelGetProspectPipelineResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Prospect_SaveProspect(deal: sierra.model.SPMDeal): angular.IPromise<sierra.model.ApiResultModelCreateProspectResponse> {
            let resourceUrl: string = '/api/prospect';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelCreateProspectResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelCreateProspectResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelCreateProspectResponse>( {
                        method: 'POST',
                        data: deal,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelCreateProspectResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Prospect_GetProspect(id: string): angular.IPromise<sierra.model.ApiResultGetProspectResponse> {
            let resourceUrl: string = '/api/prospect/{id}'.replace('{id}', id.toString());
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultGetProspectResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultGetProspectResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultGetProspectResponse>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultGetProspectResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Prospect_ValidateProspect(validateProspectDetail: sierra.model.ValidatePropsectDetails): angular.IPromise<sierra.model.ApiResultModelValidateProspectResponse> {
            let resourceUrl: string = '/api/prospect/validateProspect';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelValidateProspectResponse>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelValidateProspectResponse>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelValidateProspectResponse>( {
                        method: 'POST',
                        data: validateProspectDetail,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelValidateProspectResponse, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('prospectWebService', ProspectWebService);
    export class RefDataWebService implements sierra.service.IRefDataWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public RefData_Get(types: string): angular.IPromise<sierra.model.ApiResultModelIEnumerableRefData> {
            let resourceUrl: string = '/api/refData';
            let queryParams: any = {
                 types: types
            };
            return new this.$q<sierra.model.ApiResultModelIEnumerableRefData>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelIEnumerableRefData>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelIEnumerableRefData>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelIEnumerableRefData, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('refDataWebService', RefDataWebService);
    export class SampleWebService implements sierra.service.ISampleWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor (private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public Sample_GetAllLoan(): angular.IPromise<sierra.model.ApiResultModelIEnumerableLoan> {
            let resourceUrl: string = '/api/sample';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelIEnumerableLoan>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelIEnumerableLoan>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelIEnumerableLoan>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelIEnumerableLoan, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        public Sample_Post(loan: sierra.model.Loan): angular.IPromise<sierra.model.Loan> {
            let resourceUrl: string = '/api/sample';
            let queryParams: any = {
            };
            return new this.$q<sierra.model.Loan>(
                (resolve: angular.IQResolveReject<sierra.model.Loan>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.Loan>( {
                        method: 'POST',
                        data: loan,
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.Loan, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
        // public Sample_GetAllLoanPaged(pageRequest.page?: number, pageRequest.pageSize?: number): angular.IPromise<sierra.model.PagedApiResultModelLoan> {
        //     let resourceUrl: string = '/api/sample/paged';
        //     let queryParams: any = {
        //          pageRequest.page: pageRequest.page,
        //          pageRequest.pageSize: pageRequest.pageSize
        //     };
        //     return new this.$q<sierra.model.PagedApiResultModelLoan>(
        //         (resolve: angular.IQResolveReject<sierra.model.PagedApiResultModelLoan>, reject: angular.IQResolveReject<any>) => {
        //             this.$http<sierra.model.PagedApiResultModelLoan>( {
        //                 method: 'GET',
        //                 url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
        //             }
        //             ).success((data: sierra.model.PagedApiResultModelLoan, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
        //                 resolve(data);
        //             }
        //             ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
        //                 reject(data);
        //             }
        //             );
        //         }
        //     );
        // }
        public Sample_GetLoan(id: number): angular.IPromise<sierra.model.ApiResultModelLoan> {
            let resourceUrl: string = '/api/sample/{id}'.replace('{id}', id.toString());
            let queryParams: any = {
            };
            return new this.$q<sierra.model.ApiResultModelLoan>(
                (resolve: angular.IQResolveReject<sierra.model.ApiResultModelLoan>, reject: angular.IQResolveReject<any>) => {
                    this.$http<sierra.model.ApiResultModelLoan>( {
                        method: 'GET',
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: sierra.model.ApiResultModelLoan, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        resolve(data);
                    }
                    ).error((data: any, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
                        reject(data);
                    }
                    );
                }
            );
        }
    }
    angular.module('app').service('sampleWebService', SampleWebService);
    function buildServiceUrl(baseUrl: string, resourceUrl: string, queryParams?: any): string {
        let url: string = baseUrl;
        let baseUrlSlash: boolean = url[url.length - 1] === '/';
        let resourceUrlSlash: boolean = resourceUrl[0] === '/';
        if (!baseUrlSlash && !resourceUrlSlash) {
            url += '/';
        }
        else if (baseUrlSlash && resourceUrlSlash) {
            url = url.substr(0, url.length - 1);
        }
        url += resourceUrl;

        if (queryParams) {
            let isFirst: boolean = true;
            for (let p in queryParams) {
                if (queryParams.hasOwnProperty(p) && queryParams[p]) {
                    let separator: string = isFirst ? '?' : '&';
                    url += `${separator}${p}=${encodeURI(queryParams[p])}`;
                    isFirst = false;
                }
            }
        }
        return url;
    }
}
namespace sierra.model {
    export interface AnnouncementResponse {
        url: string;
        title: string;
        pdfName: string;
        createdDate: string;
    }
    export interface ApiResultGetProspectResponse {
        result: GetProspectResponse;
    }
    export interface ApiResultModelChangePasswordResponse {
        items: ChangePasswordResponse;
    }
    export interface ApiResultModelCreateProspectResponse {
        items: CreateProspectResponse;
    }
    export interface ApiResultModelGetLoanResponse {
        items: GetLoanResponse;
    }
    export interface ApiResultModelGetPipelineLoansResponse {
        items: GetPipelineLoansResponse;
    }
    export interface ApiResultModelGetPipelineViewsResponse {
        items: GetPipelineViewsResponse;
    }
    export interface ApiResultModelGetProspectPipelineResponse {
        items: GetProspectPipelineResponse;
    }
    export interface ApiResultModelIEnumerableAnnouncementResponse {
        items: AnnouncementResponse[];
    }
    export interface ApiResultModelIEnumerableLoan {
        items: Loan[];
    }
    export interface ApiResultModelIEnumerableRefData {
        items: RefData[];
    }
    export interface ApiResultModelLoan {
        items: Loan;
    }
    export interface ApiResultModelLogOffUserResponse {
        items: LogOffUserResponse;
    }
    export interface ApiResultModelResetPasswordResponse {
        items: ResetPasswordResponse;
    }
    export interface ApiResultModelSaveLoanResponse {
        items: SaveLoanResponse;
    }
    export interface ApiResultModelValidateProspectResponse {
        items: ValidateProspectResponse;
    }
    export interface ChangePasswordRequest {
        sessionID: string;
        userName: string;
        newPassword: string;
        oldPassword: string;
    }
    export interface ChangePasswordResponse {
        status: boolean;
        message: string;
    }
    export interface CreateProspectResponse {
        status: boolean;
        prospectId: string;
    }
    export interface Customer {
        id: number;
        name: string;
        loans: Loan[];
    }
    export interface DismissAlertRequest {
        sessionID: string;
        userName: string;
        loanNumber: string;
        alertID: string;
    }
    export interface DismissAlertResponse {
        status: boolean;
    }
    export interface GetAlertsRequest {
        sessionID: string;
        userName: string;
        type: string;
        code: string;
    }
    export interface GetAlertsResponse {
        alerts: SPMAlert[];
    }
    export interface GetLoanResponse {
        loan: SPMLoan;
    }
    export interface GetPipelineLoansResponse {
        loans: SPMLoanMetaData[];
    }
    export interface GetPipelineViewsResponse {
        views: SPMPipelineView[];
    }
    export interface GetProspectPipelineResponse {
        deals: SPMDealMeta[];
    }
    export interface GetProspectResponse {
        deal: SPMDeal;
    }
    export interface KeyValuePairStringString {
        key: string;
        value: string;
    }
    export interface Loan {
        id: number;
        descriptor: string;
        customerId: number;
        customer: Customer;
        modified: Date;
    }
    export interface LogOffUserResponse {
        status: boolean;
    }
    export interface PagedApiResultModelLoan {
        pageInfo: PageInfo;
        items: Loan[];
    }
    export interface PageInfo {
        totalCount: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
        prevUrl: string;
        nextUrl: string;
    }
    export interface RefData {
        type: string;
        data: KeyValuePairStringString[];
    }
    export interface ResetPasswordRequest {
        userName: string;
    }
    export interface ResetPasswordResponse {
        status: boolean;
    }
    export interface SaveLoanResponse {
        status: boolean;
    }
    export interface SaveRequest {
        oldBorrowerIndexes: number[];
        loan: SPMLoan;
    }
    export interface SPMAlert {
        id: string;
        loanNumber: string;
        applicationDate: Date;
        lastName: string;
        message: string;
    }
    export interface SPMAsset {
        id: string;
        accountID: string;
        cashValue: string;
        assetType: string;
        automobileMakeDescription: string;
        automobileModelYear: string;
        lifeInsuranceFaceValueAmount: string;
        otherAssetTypeDescription: string;
        holderName: string;
        index: number;
    }
    export interface SPMBorrower {
        firstName: string;
        lastName: string;
        middleName: string;
        suffixName: string;
        ssn: string;
        borrowerID: string;
        internalID: string;
        birthDate: string;
        index: number;
        printPositionType: string;
        ageAtApplication: string;
        homePhone: string;
        cellPhone: string;
        workPhone: string;
        email: string;
        vaTaxableIncomeAmount: string;
        classificationType: string;
        creditReportIdentifier: string;
        dependantCount: string;
        jointAssetReportingType: string;
        jointAssetBorrowerID: string;
        martialStatus: string;
        schoolingYears: string;
        caivrsID: string;
        currentIncomes: SPMCurrentIncome[];
        assets: SPMAsset[];
        employers: SPMEmployer[];
    }
    export interface SPMCurrentIncome {
        internalID: string;
        incomeType: string;
        monthlyAmount: string;
        index: number;
    }
    export interface SPMDeal {
        leadReceivedDate: string;
        howProspectHeardAboutUs: string;
        note: string[];
        assignedLO: string;
        prospects: SPMProspect[];
        occupancyType: string;
        id: string;
        primaryProspect: SPMProspect;
        dateCreated: string;
        loanPurpose: string;
        firstTimeHomeBuyer: boolean;
        leadSource: string;
        leadName: string;
        initialCampaignType: string;
        programCategory: string;
        dateConvertedToPreQual: string;
        dateAddedToLeadManagement: string;
    }
    export interface SPMDealMeta {
        id: string;
        primaryProspect: SPMProspect;
        dateCreated: string;
        loanPurpose: string;
        firstTimeHomeBuyer: boolean;
        leadSource: string;
        leadName: string;
        initialCampaignType: string;
        programCategory: string;
        dateConvertedToPreQual: string;
        dateAddedToLeadManagement: string;
    }
    export interface SPMDownPayment {
        id: number;
        type: string;
        description: string;
        amount: string;
        internalID: string;
    }
    export interface SPMEmployer {
        id: string;
        primaryEmploymentIndicator: boolean;
        currentEmploymentIndicator: boolean;
        name: string;
        streetAddress: string;
        city: string;
        state: string;
        zip: string;
        index: number;
        telephone: string;
        yearsOnJob: string;
        monthsOnJob: string;
        selfEmploymentIndicator: boolean;
        positionDescription: string;
        currentEmploymentTimeInLineOfWork: string;
        monthlyAmount: string;
        previousEmploymentStartDate: string;
        previousEmploymentEndDate: string;
    }
    export interface SPMLiability {
        internalID: string;
        liabilityID: string;
        borrowerID: string;
        type: string;
        accountID: string;
        holderName: string;
        monthlyPaymentAmount: string;
        unpaidBalanceAmount: string;
        balanceAmount: string;
        paymentAmount: string;
        toBePaidIndicator: boolean;
        excludeReasonType: string;
        creditLoanType: string;
        paymentPattern: string;
        exclusionIndicator: boolean;
        originalLiability: boolean;
        liabilityModified: boolean;
        remainingTerm: string;
        index: number;
        reoid: string;
        originalBalance: string;
        originalLiabilityType: string;
        originalPayment: string;
        exclusionReason: string;
        originalCreditLoanType: string;
    }
    export interface SPMLoan {
        lienPosition: string;
        interestRate: string;
        term: string;
        amortizationType: string;
        refiLoanPurpose: string;
        downPayments: SPMDownPayment[];
        propertyUsageType: string;
        purchasePrice: string;
        agencyCaseFile: string;
        costOfImprovements: string;
        improvementType: string;
        appraisedValue: string;
        acquisitionDate: string;
        acquisitionAmount: string;
        agencyCaseID: string;
        spmMortgageType: string;
        borrowers: SPMBorrower[];
        subjectProperty: SPMSubjectProperty;
        liabilities: SPMLiability[];
        reOs: SPMREO[];
        loanNumber: string;
        loanStatus: string;
        workQueueStatus: string;
        loanOfficer: string;
        processor: string;
        originatingOffice: string;
        accountExec: string;
        propertyAddress: string;
        propertyCity: string;
        propertyState: string;
        propertyZip: string;
        borrowerLastName: string;
        loanAmount: string;
        itpDate: string;
        lockExpirationDate: string;
        applicationDate: string;
        auDate: string;
        lockDate: string;
        uploadedDate: string;
        approvedDate: string;
        docDate: string;
        titleDate: string;
        fundingPackageDate: string;
        fundDate: string;
        channel: string;
        division: string;
        loanPurpose: string;
        estimatedClosingDate: string;
        programCategory: string;
        lastStatusDate: string;
    }
    export interface SPMLoanMetaData {
        loanNumber: string;
        loanStatus: string;
        workQueueStatus: string;
        loanOfficer: string;
        processor: string;
        originatingOffice: string;
        accountExec: string;
        propertyAddress: string;
        propertyCity: string;
        propertyState: string;
        propertyZip: string;
        borrowerLastName: string;
        loanAmount: string;
        itpDate: string;
        lockExpirationDate: string;
        applicationDate: string;
        auDate: string;
        lockDate: string;
        uploadedDate: string;
        approvedDate: string;
        docDate: string;
        titleDate: string;
        fundingPackageDate: string;
        fundDate: string;
        channel: string;
        division: string;
        loanPurpose: string;
        estimatedClosingDate: string;
        programCategory: string;
        lastStatusDate: string;
    }
    export interface SPMPipelineView {
        name: string;
        code: string;
        type: string;
    }
    export interface SPMProspect {
        prospectID: string;
        firstName: string;
        lastName: string;
        middleName: string;
        suffixName: string;
        nickName: string;
        email: string;
        homePhone: string;
        workPhone: string;
        cellPhone: string;
        preferredContactMethod: string;
        bestTimeToContact: string;
        nextDateToContact: string;
        dateOfBirth: string;
        alternateEmail: string;
        streetAddress: string;
        city: string;
        state: string;
        zip: string;
        relationship: string;
        borrowerType: string;
        associatedTo: string;
    }
    export interface SPMREO {
        internalID: string;
        borrowerID: string;
        city: string;
        currentResidence: boolean;
        disposition: string;
        propertyType: string;
        liabilityID: string;
        lienInstallmentAmount: string;
        lienUPBAmount: string;
        maintenanceExpenseAmount: string;
        marketValue: string;
        zip: string;
        rentalIncomeGrossAmount: string;
        rentalIncomeNetAmount: string;
        reoid: string;
        state: string;
        streetAddress: string;
        subjectPropertyIndicator: boolean;
        index: number;
    }
    export interface SPMSubjectProperty {
        streetAddress: string;
        city: string;
        state: string;
        zip: string;
        county: string;
        propertyType: string;
        numberOfUnits: number;
        legalDescription: string;
        yearBuilt: string;
        estateHeldIn: string;
        expirationDate: string;
        netCashFlow: string;
    }
    export interface ValidatePropsectDetails {
        email: string;
    }
    export interface ValidateProspectResponse {
        status: boolean;
    }
    export class ModelFactory {
        public static createEmptyApiResultModelLogOffUserResponse(initializer?: (model: ApiResultModelLogOffUserResponse) => void): ApiResultModelLogOffUserResponse {
            let model: ApiResultModelLogOffUserResponse =  {
                items: ModelFactory.createEmptyLogOffUserResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyLogOffUserResponse(initializer?: (model: LogOffUserResponse) => void): LogOffUserResponse {
            let model: LogOffUserResponse =  {
                status: false,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelChangePasswordResponse(initializer?: (model: ApiResultModelChangePasswordResponse) => void): ApiResultModelChangePasswordResponse {
            let model: ApiResultModelChangePasswordResponse =  {
                items: ModelFactory.createEmptyChangePasswordResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyChangePasswordResponse(initializer?: (model: ChangePasswordResponse) => void): ChangePasswordResponse {
            let model: ChangePasswordResponse =  {
                status: false,
                message: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyChangePasswordRequest(initializer?: (model: ChangePasswordRequest) => void): ChangePasswordRequest {
            let model: ChangePasswordRequest =  {
                sessionID: '',
                userName: '',
                newPassword: '',
                oldPassword: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelResetPasswordResponse(initializer?: (model: ApiResultModelResetPasswordResponse) => void): ApiResultModelResetPasswordResponse {
            let model: ApiResultModelResetPasswordResponse =  {
                items: ModelFactory.createEmptyResetPasswordResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyResetPasswordResponse(initializer?: (model: ResetPasswordResponse) => void): ResetPasswordResponse {
            let model: ResetPasswordResponse =  {
                status: false,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyResetPasswordRequest(initializer?: (model: ResetPasswordRequest) => void): ResetPasswordRequest {
            let model: ResetPasswordRequest =  {
                userName: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelGetPipelineViewsResponse(initializer?: (model: ApiResultModelGetPipelineViewsResponse) => void): ApiResultModelGetPipelineViewsResponse {
            let model: ApiResultModelGetPipelineViewsResponse =  {
                items: ModelFactory.createEmptyGetPipelineViewsResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyGetPipelineViewsResponse(initializer?: (model: GetPipelineViewsResponse) => void): GetPipelineViewsResponse {
            let model: GetPipelineViewsResponse =  {
                views: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMPipelineView(initializer?: (model: SPMPipelineView) => void): SPMPipelineView {
            let model: SPMPipelineView =  {
                name: '',
                code: '',
                type: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyGetAlertsResponse(initializer?: (model: GetAlertsResponse) => void): GetAlertsResponse {
            let model: GetAlertsResponse =  {
                alerts: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMAlert(initializer?: (model: SPMAlert) => void): SPMAlert {
            let model: SPMAlert =  {
                id: '',
                loanNumber: '',
                applicationDate: moment().toDate(),
                lastName: '',
                message: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyGetAlertsRequest(initializer?: (model: GetAlertsRequest) => void): GetAlertsRequest {
            let model: GetAlertsRequest =  {
                sessionID: '',
                userName: '',
                type: '',
                code: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyDismissAlertResponse(initializer?: (model: DismissAlertResponse) => void): DismissAlertResponse {
            let model: DismissAlertResponse =  {
                status: false,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyDismissAlertRequest(initializer?: (model: DismissAlertRequest) => void): DismissAlertRequest {
            let model: DismissAlertRequest =  {
                sessionID: '',
                userName: '',
                loanNumber: '',
                alertID: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelIEnumerableAnnouncementResponse(initializer?: (model: ApiResultModelIEnumerableAnnouncementResponse) => void): ApiResultModelIEnumerableAnnouncementResponse {
            let model: ApiResultModelIEnumerableAnnouncementResponse =  {
                items: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyAnnouncementResponse(initializer?: (model: AnnouncementResponse) => void): AnnouncementResponse {
            let model: AnnouncementResponse =  {
                url: '',
                title: '',
                pdfName: '',
                createdDate: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelGetPipelineLoansResponse(initializer?: (model: ApiResultModelGetPipelineLoansResponse) => void): ApiResultModelGetPipelineLoansResponse {
            let model: ApiResultModelGetPipelineLoansResponse =  {
                items: ModelFactory.createEmptyGetPipelineLoansResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyGetPipelineLoansResponse(initializer?: (model: GetPipelineLoansResponse) => void): GetPipelineLoansResponse {
            let model: GetPipelineLoansResponse =  {
                loans: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMLoanMetaData(initializer?: (model: SPMLoanMetaData) => void): SPMLoanMetaData {
            let model: SPMLoanMetaData =  {
                loanNumber: '',
                loanStatus: '',
                workQueueStatus: '',
                loanOfficer: '',
                processor: '',
                originatingOffice: '',
                accountExec: '',
                propertyAddress: '',
                propertyCity: '',
                propertyState: '',
                propertyZip: '',
                borrowerLastName: '',
                loanAmount: '',
                itpDate: '',
                lockExpirationDate: '',
                applicationDate: '',
                auDate: '',
                lockDate: '',
                uploadedDate: '',
                approvedDate: '',
                docDate: '',
                titleDate: '',
                fundingPackageDate: '',
                fundDate: '',
                channel: '',
                division: '',
                loanPurpose: '',
                estimatedClosingDate: '',
                programCategory: '',
                lastStatusDate: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelSaveLoanResponse(initializer?: (model: ApiResultModelSaveLoanResponse) => void): ApiResultModelSaveLoanResponse {
            let model: ApiResultModelSaveLoanResponse =  {
                items: ModelFactory.createEmptySaveLoanResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySaveLoanResponse(initializer?: (model: SaveLoanResponse) => void): SaveLoanResponse {
            let model: SaveLoanResponse =  {
                status: false,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySaveRequest(initializer?: (model: SaveRequest) => void): SaveRequest {
            let model: SaveRequest =  {
                oldBorrowerIndexes: [],
                loan: ModelFactory.createEmptySPMLoan(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMLoan(initializer?: (model: SPMLoan) => void): SPMLoan {
            let model: SPMLoan =  {
                lienPosition: '',
                interestRate: '',
                term: '',
                amortizationType: '',
                refiLoanPurpose: '',
                downPayments: [],
                propertyUsageType: '',
                purchasePrice: '',
                agencyCaseFile: '',
                costOfImprovements: '',
                improvementType: '',
                appraisedValue: '',
                acquisitionDate: '',
                acquisitionAmount: '',
                agencyCaseID: '',
                spmMortgageType: '',
                borrowers: [],
                subjectProperty: ModelFactory.createEmptySPMSubjectProperty(),
                liabilities: [],
                reOs: [],
                loanNumber: '',
                loanStatus: '',
                workQueueStatus: '',
                loanOfficer: '',
                processor: '',
                originatingOffice: '',
                accountExec: '',
                propertyAddress: '',
                propertyCity: '',
                propertyState: '',
                propertyZip: '',
                borrowerLastName: '',
                loanAmount: '',
                itpDate: '',
                lockExpirationDate: '',
                applicationDate: '',
                auDate: '',
                lockDate: '',
                uploadedDate: '',
                approvedDate: '',
                docDate: '',
                titleDate: '',
                fundingPackageDate: '',
                fundDate: '',
                channel: '',
                division: '',
                loanPurpose: '',
                estimatedClosingDate: '',
                programCategory: '',
                lastStatusDate: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMDownPayment(initializer?: (model: SPMDownPayment) => void): SPMDownPayment {
            let model: SPMDownPayment =  {
                id: null,
                type: '',
                description: '',
                amount: '',
                internalID: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMBorrower(initializer?: (model: SPMBorrower) => void): SPMBorrower {
            let model: SPMBorrower =  {
                firstName: '',
                lastName: '',
                middleName: '',
                suffixName: '',
                ssn: '',
                borrowerID: '',
                internalID: '',
                birthDate: '',
                index: null,
                printPositionType: '',
                ageAtApplication: '',
                homePhone: '',
                cellPhone: '',
                workPhone: '',
                email: '',
                vaTaxableIncomeAmount: '',
                classificationType: '',
                creditReportIdentifier: '',
                dependantCount: '',
                jointAssetReportingType: '',
                jointAssetBorrowerID: '',
                martialStatus: '',
                schoolingYears: '',
                caivrsID: '',
                currentIncomes: [],
                assets: [],
                employers: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMCurrentIncome(initializer?: (model: SPMCurrentIncome) => void): SPMCurrentIncome {
            let model: SPMCurrentIncome =  {
                internalID: '',
                incomeType: '',
                monthlyAmount: '',
                index: null,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMAsset(initializer?: (model: SPMAsset) => void): SPMAsset {
            let model: SPMAsset =  {
                id: '',
                accountID: '',
                cashValue: '',
                assetType: '',
                automobileMakeDescription: '',
                automobileModelYear: '',
                lifeInsuranceFaceValueAmount: '',
                otherAssetTypeDescription: '',
                holderName: '',
                index: null,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMEmployer(initializer?: (model: SPMEmployer) => void): SPMEmployer {
            let model: SPMEmployer =  {
                id: '',
                primaryEmploymentIndicator: false,
                currentEmploymentIndicator: false,
                name: '',
                streetAddress: '',
                city: '',
                state: '',
                zip: '',
                index: null,
                telephone: '',
                yearsOnJob: '',
                monthsOnJob: '',
                selfEmploymentIndicator: false,
                positionDescription: '',
                currentEmploymentTimeInLineOfWork: '',
                monthlyAmount: '',
                previousEmploymentStartDate: '',
                previousEmploymentEndDate: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMSubjectProperty(initializer?: (model: SPMSubjectProperty) => void): SPMSubjectProperty {
            let model: SPMSubjectProperty =  {
                streetAddress: '',
                city: '',
                state: '',
                zip: '',
                county: '',
                propertyType: '',
                numberOfUnits: null,
                legalDescription: '',
                yearBuilt: '',
                estateHeldIn: '',
                expirationDate: '',
                netCashFlow: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMLiability(initializer?: (model: SPMLiability) => void): SPMLiability {
            let model: SPMLiability =  {
                internalID: '',
                liabilityID: '',
                borrowerID: '',
                type: '',
                accountID: '',
                holderName: '',
                monthlyPaymentAmount: '',
                unpaidBalanceAmount: '',
                balanceAmount: '',
                paymentAmount: '',
                toBePaidIndicator: false,
                excludeReasonType: '',
                creditLoanType: '',
                paymentPattern: '',
                exclusionIndicator: false,
                originalLiability: false,
                liabilityModified: false,
                remainingTerm: '',
                index: null,
                reoid: '',
                originalBalance: '',
                originalLiabilityType: '',
                originalPayment: '',
                exclusionReason: '',
                originalCreditLoanType: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMREO(initializer?: (model: SPMREO) => void): SPMREO {
            let model: SPMREO =  {
                internalID: '',
                borrowerID: '',
                city: '',
                currentResidence: false,
                disposition: '',
                propertyType: '',
                liabilityID: '',
                lienInstallmentAmount: '',
                lienUPBAmount: '',
                maintenanceExpenseAmount: '',
                marketValue: '',
                zip: '',
                rentalIncomeGrossAmount: '',
                rentalIncomeNetAmount: '',
                reoid: '',
                state: '',
                streetAddress: '',
                subjectPropertyIndicator: false,
                index: null,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelGetLoanResponse(initializer?: (model: ApiResultModelGetLoanResponse) => void): ApiResultModelGetLoanResponse {
            let model: ApiResultModelGetLoanResponse =  {
                items: ModelFactory.createEmptyGetLoanResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyGetLoanResponse(initializer?: (model: GetLoanResponse) => void): GetLoanResponse {
            let model: GetLoanResponse =  {
                loan: ModelFactory.createEmptySPMLoan(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelGetProspectPipelineResponse(initializer?: (model: ApiResultModelGetProspectPipelineResponse) => void): ApiResultModelGetProspectPipelineResponse {
            let model: ApiResultModelGetProspectPipelineResponse =  {
                items: ModelFactory.createEmptyGetProspectPipelineResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyGetProspectPipelineResponse(initializer?: (model: GetProspectPipelineResponse) => void): GetProspectPipelineResponse {
            let model: GetProspectPipelineResponse =  {
                deals: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMDealMeta(initializer?: (model: SPMDealMeta) => void): SPMDealMeta {
            let model: SPMDealMeta =  {
                id: '',
                primaryProspect: ModelFactory.createEmptySPMProspect(),
                dateCreated: '',
                loanPurpose: '',
                firstTimeHomeBuyer: false,
                leadSource: '',
                leadName: '',
                initialCampaignType: '',
                programCategory: '',
                dateConvertedToPreQual: '',
                dateAddedToLeadManagement: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMProspect(initializer?: (model: SPMProspect) => void): SPMProspect {
            let model: SPMProspect =  {
                prospectID: '',
                firstName: '',
                lastName: '',
                middleName: '',
                suffixName: '',
                nickName: '',
                email: '',
                homePhone: '',
                workPhone: '',
                cellPhone: '',
                preferredContactMethod: '',
                bestTimeToContact: '',
                nextDateToContact: '',
                dateOfBirth: '',
                alternateEmail: '',
                streetAddress: '',
                city: '',
                state: '',
                zip: '',
                relationship: '',
                borrowerType: '',
                associatedTo: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelCreateProspectResponse(initializer?: (model: ApiResultModelCreateProspectResponse) => void): ApiResultModelCreateProspectResponse {
            let model: ApiResultModelCreateProspectResponse =  {
                items: ModelFactory.createEmptyCreateProspectResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyCreateProspectResponse(initializer?: (model: CreateProspectResponse) => void): CreateProspectResponse {
            let model: CreateProspectResponse =  {
                status: false,
                prospectId: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptySPMDeal(initializer?: (model: SPMDeal) => void): SPMDeal {
            let model: SPMDeal =  {
                leadReceivedDate: '',
                howProspectHeardAboutUs: '',
                note: [],
                assignedLO: '',
                prospects: [],
                occupancyType: '',
                id: '',
                primaryProspect: ModelFactory.createEmptySPMProspect(),
                dateCreated: '',
                loanPurpose: '',
                firstTimeHomeBuyer: false,
                leadSource: '',
                leadName: '',
                initialCampaignType: '',
                programCategory: '',
                dateConvertedToPreQual: '',
                dateAddedToLeadManagement: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultGetProspectResponse(initializer?: (model: ApiResultGetProspectResponse) => void): ApiResultGetProspectResponse {
            let model: ApiResultGetProspectResponse =  {
                result: ModelFactory.createEmptyGetProspectResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyGetProspectResponse(initializer?: (model: GetProspectResponse) => void): GetProspectResponse {
            let model: GetProspectResponse =  {
                deal: ModelFactory.createEmptySPMDeal(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelValidateProspectResponse(initializer?: (model: ApiResultModelValidateProspectResponse) => void): ApiResultModelValidateProspectResponse {
            let model: ApiResultModelValidateProspectResponse =  {
                items: ModelFactory.createEmptyValidateProspectResponse(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyValidateProspectResponse(initializer?: (model: ValidateProspectResponse) => void): ValidateProspectResponse {
            let model: ValidateProspectResponse =  {
                status: false,
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyValidatePropsectDetails(initializer?: (model: ValidatePropsectDetails) => void): ValidatePropsectDetails {
            let model: ValidatePropsectDetails =  {
                email: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelIEnumerableRefData(initializer?: (model: ApiResultModelIEnumerableRefData) => void): ApiResultModelIEnumerableRefData {
            let model: ApiResultModelIEnumerableRefData =  {
                items: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyRefData(initializer?: (model: RefData) => void): RefData {
            let model: RefData =  {
                type: '',
                data: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyKeyValuePairStringString(initializer?: (model: KeyValuePairStringString) => void): KeyValuePairStringString {
            let model: KeyValuePairStringString =  {
                key: '',
                value: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelIEnumerableLoan(initializer?: (model: ApiResultModelIEnumerableLoan) => void): ApiResultModelIEnumerableLoan {
            let model: ApiResultModelIEnumerableLoan =  {
                items: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyLoan(initializer?: (model: Loan) => void): Loan {
            let model: Loan =  {
                id: null,
                descriptor: '',
                customerId: null,
                customer: ModelFactory.createEmptyCustomer(),
                modified: moment().toDate(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyCustomer(initializer?: (model: Customer) => void): Customer {
            let model: Customer =  {
                id: null,
                name: '',
                loans: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyPagedApiResultModelLoan(initializer?: (model: PagedApiResultModelLoan) => void): PagedApiResultModelLoan {
            let model: PagedApiResultModelLoan =  {
                pageInfo: ModelFactory.createEmptyPageInfo(),
                items: [],
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyPageInfo(initializer?: (model: PageInfo) => void): PageInfo {
            let model: PageInfo =  {
                totalCount: null,
                totalPages: null,
                currentPage: null,
                pageSize: null,
                prevUrl: '',
                nextUrl: '',
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
        public static createEmptyApiResultModelLoan(initializer?: (model: ApiResultModelLoan) => void): ApiResultModelLoan {
            let model: ApiResultModelLoan =  {
                items: ModelFactory.createEmptyLoan(),
            };
            if (!!initializer) {
                initializer(model);
            }
            return model;
        }
    }
}
