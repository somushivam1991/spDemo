/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.home {
    export class AuthWebService {
        public static $inject: string[] = ['$http', '$q', 'config'];
        constructor(private $http: angular.IHttpService, private $q: angular.IQService, private config: common.config.IConfig) {
        }
        public Login_Post(item: any): angular.IPromise<LoginModel> {
            let resourceUrl: string = '/api/signin';
            let queryParams: any = {
            };
            return new this.$q<any>(
                (resolve: angular.IQResolveReject<any>, reject: angular.IQResolveReject<any>) => {
                    this.$http<any>({
                        method: 'POST',
                        data: item,
                        // headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                        url: buildServiceUrl(this.config.apiBaseUrl, resourceUrl, queryParams)
                    }
                    ).success((data: LoginModel, status: number, headers: angular.IHttpHeadersGetter, config: angular.IRequestConfig) => {
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
    function buildServiceUrl(baseUrl: string, resourceUrl: string, queryParams?: any): string {
        let url: string = baseUrl;
        let baseUrlSlash: boolean = url[url.length - 1] === '/';
        let resourceUrlSlash: boolean = resourceUrl[0] === '/';
        if (!baseUrlSlash && !resourceUrlSlash) {
            url += '/';
        } else if (baseUrlSlash && resourceUrlSlash) {
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
    appModule.service('authWebService', AuthWebService);
}
