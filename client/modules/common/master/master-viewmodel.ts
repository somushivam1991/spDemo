/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace app.masters.service {
    export interface Masters {
        suffix?: TextPair[];
        prospectView?: TextPair[];
        preferredContact?: TextPair[];
        occupancyType?: TextPair[];

        //Loan and property Info master data
        lender?: TextPair[];
        loanInfoNoOfMonths?: TextPair[];
        loanInfoDocumentType?: TextPair[];
        loanInfoNoOfUnits?: TextPair[];
        loanInfoPropertyTypes?: TextPair[];
        loanInfoTitleTypes?: TextPair[];
        loanInfoTitleManner?: TextPair[];
    }
}
