/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.dashboard.pipeline {
    export interface ViewModel {
        search: SearchVM;
        pipeline: Pipelines;
        filter: SearchCriteria;
        pipelineDropDown: PipelineDropDown[];
        alert: Alert;
        alerts: Alerts;
        isPipelineShowAlert: boolean;
    }

    export interface SearchVM {
        pipelineView: string;
        pipelineLastName: string;
    }

    export interface PipelineVM {
        loanNumber: number;
        borrowerName: string;
        appDate: Date;
        status: string;
        statusLastUpdated: Date;
        loanProgram: string;
        lockExpiryDate: Date;
        estCOE: Date;
        loanOfficer: string;
        Processor: string;
        loanPurpose: string;
        estimatedClosingDate: Date;
        fundDate: Date;
    }

    export interface SearchCriteria {
        page?: number;
        pageSize?: number;
        sortOrder?: string;
        sortField?: string;
    }

    export interface PipelineDropDown {
        name: string;
        code: string;
        type: string;
    }

    export interface Alert {
        id: string;
        loanNumber: string;
        borrowerName: string;
        applicationDate: Date;
        message: string;
    }

    export type Pipelines = PipelineVM[];
    export type Alerts = Alert[];
}
