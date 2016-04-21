/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.dashboard {
    import layout = common.layouts.main;
    appModule.config(
        /* @ngInject */
        ($stateProvider: ng.ui.IStateProvider, constants: IConstants) => {
            $stateProvider.state('dashboard', {
                parent: layout.route,
                url: '/dashboard',
                templateUrl: `${constants.templateUrlRoot}dashboard/dashboard.html`,
                controller: 'dashBoardController',
                controllerAs: 'dashboard',
                abstract: true
            });
            $stateProvider.state('dashboard.pipelineTab', {
                url: '/pipeline',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}dashboard/pipeline/pipeline.html`,
                        controller: 'pipleLineController',
                        controllerAs: 'pipelineTab',
                        resolve: {
                            pipelineDp:
                            /* @ngInject */
                            (accountWebService: sierra.service.IAccountWebService): ng.IPromise<sierra.model.ApiResultModelGetPipelineViewsResponse> =>
                                accountWebService.Account_GetPipeLineViews('R'),
                            pipelineView:
                            /* @ngInject */
                            (loanWebService: sierra.service.ILoanWebService, pipelineDp: sierra.model.ApiResultModelGetPipelineViewsResponse,
                                pipelineService: app.dashboard.pipeline.PipelineService,
                                homeState: app.home.HomeState):
                                ng.IPromise<sierra.model.ApiResultModelGetPipelineLoansResponse> =>
                                loanWebService.Loan_GetAsync('R', pipelineService.getDefaultPipelineView(pipelineDp.items.views, homeState.defaultPipeLineView).code,
                                    'ACTIVE', pipelineService.getDefaultPipelineView(pipelineDp.items.views, homeState.defaultPipeLineView).type),
                            alerts:
                            /* @ngInject */

                            (alertWebService: sierra.service.IAlertWebService, pipelineDp: sierra.model.ApiResultModelGetPipelineViewsResponse,
                                pipelineService: app.dashboard.pipeline.PipelineService,
                                homeState: app.home.HomeState): ng.IPromise<sierra.model.GetAlertsResponse> =>
                                alertWebService.Alert_PostAsync(sierra.model.ModelFactory.createEmptyGetAlertsRequest((m: sierra.model.GetAlertsRequest) => {
                                    m.code = pipelineService.getDefaultPipelineView(pipelineDp.items.views, homeState.defaultPipeLineView).code;
                                    m.type = pipelineService.getDefaultPipelineView(pipelineDp.items.views, homeState.defaultPipeLineView).type;
                                }))

                        }
                    }
                }
            });
            $stateProvider.state('dashboard.fundedTab', {
                url: '/funded',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}dashboard/funded/funded.html`,
                        controller: 'fundedController',
                        controllerAs: 'fundedTab',
                        resolve: {
                            fundedDp:
                            /* @ngInject */
                            (accountWebService: sierra.service.IAccountWebService): ng.IPromise<sierra.model.ApiResultModelGetPipelineViewsResponse> =>
                                accountWebService.Account_GetPipeLineViews('R'),
                            fundedView:
                            /* @ngInject */
                            (loanWebService: sierra.service.ILoanWebService, fundedDp: sierra.model.ApiResultModelGetPipelineViewsResponse,
                                fundedService: app.dashboard.funded.FundedService,
                                homeState: app.home.HomeState):
                                ng.IPromise<sierra.model.ApiResultModelGetPipelineLoansResponse> =>
                                loanWebService.Loan_GetAsync('R', fundedService.getDefaultFundedView(fundedDp.items.views, homeState.defaultPipeLineView).code, 'FUNDED',
                                    fundedService.getDefaultFundedView(fundedDp.items.views, homeState.defaultPipeLineView).type),
                            alerts:
                            /* @ngInject */
                            (alertWebService: sierra.service.IAlertWebService, fundedDp: sierra.model.ApiResultModelGetPipelineViewsResponse,
                                fundedService: app.dashboard.funded.FundedService,
                                homeState: app.home.HomeState): ng.IPromise<sierra.model.GetAlertsResponse> =>
                                alertWebService.Alert_PostAsync(sierra.model.ModelFactory.createEmptyGetAlertsRequest((m: sierra.model.GetAlertsRequest) => {
                                    m.code = fundedService.getDefaultFundedView(fundedDp.items.views, homeState.defaultPipeLineView).code;
                                    m.type = fundedService.getDefaultFundedView(fundedDp.items.views, homeState.defaultPipeLineView).type;
                                }))
                        }
                    }
                }
            });

            $stateProvider.state('dashboard.prospectTab', {
                url: '/prospect',
                views: {
                    'tabContent': {
                        templateUrl: `${constants.templateUrlRoot}dashboard/prospect/prospect.html`,
                        controller: 'prospectController',
                        controllerAs: 'prospectTab',
                        resolve: {
                            prospectView:
                            /* @ngInject */
                            (prospectWebService: sierra.service.IProspectWebService): ng.IPromise<sierra.model.ApiResultModelGetProspectPipelineResponse> =>
                                prospectWebService.Prospect_GetAllProspects()
                        }

                    }
                }
            });
        });
}
