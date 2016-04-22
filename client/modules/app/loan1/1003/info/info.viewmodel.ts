/// <reference path="../../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../../typings/app.d.ts" />

namespace app.loan.info {
    export interface ViewModel {
        infoHeader: LoanInfoHeaderVM;
        loanInfo: LoanInformationVM;
        propertyInfo: PropertyInformationVM;
    }

    export interface LoanInfoHeaderVM {
        lenderType: string;
        isBorrowerAssets?: boolean;
        isCoBorrowerAssets?: boolean;
        applicationdate: Date;
    }

    export interface LoanInformationVM {
        mortgageAppliedFor: string;
        state: string;
        noOfMonths: number;
        programId: string;
        amortizationType: string;
        amortizationTypeValue: string;
        mortgageInsuranceType: string;
        isImpounds: string;
        fhaCaseNumber: string;
        loanAmount: number;
        interestRate: number;
        documentType: string;
        loanPurpose: string;
    }

    export interface PropertyInformationVM {
        streetAddress: string;
        city: string;
        legalDescription: string;
        state: string;
        county: string;
        zipCode: string;
        noOfUnits: number;
        yearBuilt: string;
        propertyType: string;
        estClosingDate: Date;
        contigencyRemovalDate: Date;
        propertyUsageType: string;
        title: PropertyInfoTitleVM;
        sourceOfPayment: string;
    }

    export interface PropertyInfoTitleVM {
        type: string;
        fullName: string;
        mannerOfTitle: string;
        estateHeldIn: string;
    }
}
