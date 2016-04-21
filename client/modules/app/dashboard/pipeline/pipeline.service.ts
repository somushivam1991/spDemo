/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.dashboard.pipeline {
    export class PipelineService {
        /* @ngInject */
        constructor() {
            //some data
        }

        public createEmptyViewModel(): ViewModel {
            return {
                search: {
                    pipelineView: undefined,
                    pipelineLastName: undefined
                },
                pipeline: [],
                filter: {
                    page: 1,
                    pageSize: 10,
                    sortOrder: undefined,
                    sortField: undefined
                },
                pipelineDropDown: [],
                alert: {
                    id: undefined,
                    loanNumber: undefined,
                    borrowerName: undefined,
                    applicationDate: undefined,
                    message: undefined
                },
                alerts: [],
                isPipelineShowAlert: true
            };
        }

        public createClientViewModel(item: sierra.model.SPMLoanMetaData[]): Pipelines {
            return (item || []).map((i: sierra.model.SPMLoanMetaData) => <PipelineVM>{
                loanNumber: +i.loanNumber,
                borrowerName: i.borrowerLastName,
                appDate: Boolean(i.applicationDate) ? new Date(i.applicationDate) : undefined,
                status: i.loanStatus,
                statusLastUpdated: Boolean(i.lastStatusDate) ? new Date(i.lastStatusDate) : undefined,
                loanProgram: i.programCategory,
                lockExpiryDate: Boolean(i.lockExpirationDate) ? new Date(i.lockExpirationDate) : undefined,
                estCOE: Boolean(i.estimatedClosingDate) ? new Date(i.estimatedClosingDate) : undefined,
                loanOfficer: i.loanOfficer,
                estimatedClosingDate: Boolean(i.estimatedClosingDate) ? new Date(i.estimatedClosingDate) : undefined,
                fundDate: Boolean(i.fundDate) ? new Date(i.fundDate) : undefined,
                Processor: i.processor,
                loanPurpose: i.loanPurpose + ''
            });
        }

        public createClientDropDownModel(item: sierra.model.SPMPipelineView[]): PipelineDropDown[] {
            return (item || []).map((i: sierra.model.SPMPipelineView) => <PipelineDropDown>{
                name: i.name,
                code: i.code,
                type: i.type
            });
        }

        public createClientTextPair(data: PipelineDropDown[]): TextPair[] {
            return (data || []).reduce((filter: TextPair[], item: PipelineDropDown) => {
                let name: string = item.name;
                let code: string = item.code;
                if (!filter.some((pair: TextPair) => pair.value === name) ||
                    !filter.some((pair: TextPair) => pair.text === code)) {
                    filter.push(<TextPair>{
                        text: this.getPipelineHeader(item.name),
                        value: item.code
                    });
                }
                return filter;
            }, []);
        }

public getPipelineHeader(item: string): string {
            if (item.split(':').length > 1) {
                return item.split(':')[1].split('(')[0];
            }
            return item.split('(')[0];
        }
        public createAlertsViewModel(alert: sierra.model.SPMAlert[]): Alert[] {
            return (alert || []).map((item: sierra.model.SPMAlert) => <Alert>{
                id: item.id,
                loanNumber: item.loanNumber,
                borrowerName: item.lastName,
                applicationDate: item.applicationDate,
                message: item.message
            });
        }

        public getDefaultPipelineView(views: sierra.model.SPMPipelineView[], defaultView: string): PipelineDropDown {
            if (defaultView) {
                for (let index: number = 0; index < views.length; index++) {
                    let element: sierra.model.SPMPipelineView = views[index];
                    if (element.code === defaultView) {
                        return {
                            name: element.name,
                            code: element.code,
                            type: element.type
                        };
                    }
                }
            }
            return {
                name: views[0].name,
                code: views[0].code,
                type: views[0].type
            };
        }
    }
    appModule.service('pipelineService', PipelineService);
}
