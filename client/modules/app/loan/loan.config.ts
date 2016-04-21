/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.loan {
    import layout = common.layouts.loan;
    appModule.config(
        /* @ngInject */
        ($stateProvider: ng.ui.IStateProvider, constants: IConstants) => {
            $stateProvider.state('loan', {
                parent: layout.route,
                url: '/loan',
                templateUrl: `${constants.templateUrlRoot}loan/loan.html`,
                controller: 'loanController',
                controllerAs: 'loan',
                abstract: true
            });

            $stateProvider.state('loan.assert', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/assert/assert.html`,
                        controller: 'assertController',
                        controllerAs: 'assertTab'
                    }
                }
            });

            $stateProvider.state('loan.borrower', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/borrower/borrower.html`,
                        controller: 'borrowerController',
                        controllerAs: 'borrowerTab'
                    }
                }
            });

            $stateProvider.state('loan.declarations', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/declarations/declarations.html`,
                        controller: 'declarationsController',
                        controllerAs: 'declarationsTab'
                    }
                }
            });

            $stateProvider.state('loan.employment', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/employment/employment.html`,
                        controller: 'employmentController',
                        controllerAs: 'employmentTab'
                    }
                }
            });

            $stateProvider.state('loan.governmentMonitoring', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/governmentMonitoring/governmentMonitoring.html`,
                        controller: 'governmentMonitoringController',
                        controllerAs: 'governmentMonitoringTab'
                    }
                }
            });

            $stateProvider.state('loan.info', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/info/info.html`,
                        controller: 'infoController',
                        controllerAs: 'infoTab',
                         resolve: {
                            loanNumber:
                            /* @ngInject */
                            ($stateParams: angular.ui.IStateParamsService): string => {
                                let id: string = $stateParams['loanNumber'];
                                return id;
                            },
                            loanInfo:
                            /* @ngInject */
                            (loanWebService: sierra.service.ILoanWebService, loanNumber: string): ng.IPromise<sierra.model.ApiResultModelGetLoanResponse> =>
                                loanWebService.Loan_Get(loanNumber)
                        }
                    }
                }
            });

            $stateProvider.state('loan.liabilities', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/liabilities/liabilities.html`,
                        controller: 'liabilitiesController',
                        controllerAs: 'liabilitiesTab'
                    }
                }
            });

            $stateProvider.state('loan.REO', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/REO/REO.html`,
                        controller: 'REOController',
                        controllerAs: 'REOTab'
                    }
                }
            });

            $stateProvider.state('loan.transactions', {
                url: '/App/{loanNumber}',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}loan/transactions/transactions.html`,
                        controller: 'transactionsController',
                        controllerAs: 'transactionsTab'
                    }
                }
            });
        });
}
