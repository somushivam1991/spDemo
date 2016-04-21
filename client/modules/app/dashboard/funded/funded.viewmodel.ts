/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.dashboard.funded {
    export interface ViewModel {
        search: SearchVM;
        funded: FundedLoans;
        filter: SearchCriteria;
        fundedDropDown: FundedDropDown[];
        alert: Alert;
        alerts: Alerts;
        isFundedShowAlert: boolean;
    }

    export interface SearchVM {
        fundedView: string;
        fundedLastName: string;
    }

    export interface FundedLoanVM {
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
    }

    export interface SearchCriteria {
        page?: number;
        pageSize?: number;
        sortOrder?: string;
        sortField?: string;
    }

    export interface FundedDropDown {
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

    export type FundedLoans = FundedLoanVM[];
    export type Alerts = Alert[];
}
