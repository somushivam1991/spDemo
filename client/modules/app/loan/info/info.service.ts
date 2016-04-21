/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace app.loan.info {
    export class LoanInfoServices {
        /* @ngInject */
        constructor(private mastersService: app.masters.service.MastersService) {
        }

        public getMasters(): app.masters.service.Masters {
            return this.mastersService.getMasters([
                masters.service.MasterType.lender
            ]);
        }

        public createEmptyViewModel(): ViewModel {
            return {
                infoHeader: {
                    lenderType: undefined,
                    isBorrowerAssets: undefined,
                    isCoBorrowerAssets: undefined,
                    applicationdate: undefined
                },
                loanInfo: {
                    mortgageAppliedFor: undefined,
                    state: undefined,
                    noOfMonths: undefined,
                    programId: undefined,
                    amortizationType: undefined,
                    mortgageInsuranceType: undefined,
                    isImpounds: undefined,
                    fhaCaseNumber: undefined,
                    loanAmount: undefined,
                    interestRate: undefined,
                    documentType: undefined,
                    loanPurpose: undefined
                },
                propertyInfo: {
                    streetAddress: undefined,
                    city: undefined,
                    legalDescription: undefined,
                    state: undefined,
                    country: undefined,
                    zipCode: undefined,
                    noOfUnits: undefined,
                    yearBuilt: undefined,
                    propertyType: undefined,
                    estClosingDate: undefined,
                    contigencyRemovalDate: undefined,
                    propertyUsageType: undefined,
                    title: {
                        type: undefined,
                        fullName: undefined,
                        mannerOfTitle: undefined,
                        estateHeldIn: undefined
                    }
                }
            };
        }
        
        public createInfoViewModel(loan: sierra.model.SPMLoan): ViewModel{
            return {
                infoHeader: {
                    lenderType: 'undefined',
                    isBorrowerAssets: undefined,
                    isCoBorrowerAssets: undefined,
                    applicationdate: Boolean(loan.applicationDate) ? new Date(loan.applicationDate) : undefined,
                },
                loanInfo: {
                    mortgageAppliedFor: 'undefined',
                    state: 'undefined',
                    noOfMonths: + loan.term,
                    programId: undefined,
                    amortizationType: loan.amortizationType,
                    mortgageInsuranceType: 'undefined',
                    isImpounds: undefined,
                    fhaCaseNumber: undefined,
                    loanAmount: + loan.loanAmount,
                    interestRate: + loan.interestRate,
                    documentType: undefined,
                    loanPurpose: loan.loanPurpose
                },
                propertyInfo: {
                    streetAddress: loan.subjectProperty.streetAddress,
                    city: loan.subjectProperty.city,
                    legalDescription: loan.subjectProperty.legalDescription,
                    state: loan.subjectProperty.state,
                    country: loan.subjectProperty.county,
                    zipCode: loan.subjectProperty.zip,
                    noOfUnits: loan.subjectProperty.numberOfUnits,
                    yearBuilt: loan.subjectProperty.yearBuilt,
                    propertyType: loan.subjectProperty.propertyType,
                    estClosingDate: Boolean(loan.subjectProperty.expirationDate) ? new Date(loan.subjectProperty.expirationDate) : undefined,
                    contigencyRemovalDate: undefined,
                    propertyUsageType: loan.propertyUsageType,
                    title: {
                        type: undefined,
                        fullName: undefined,
                        mannerOfTitle: undefined,
                        estateHeldIn: loan.subjectProperty.estateHeldIn
                    }
                }
            };
        }
    }
    appModule.service('loanInfoServices', LoanInfoServices);
}
