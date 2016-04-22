/// <reference path="../../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../../typings/app.d.ts" />

namespace app.loan.info {
    export class LoanInfoServices {
        /* @ngInject */
        constructor(private mastersService: app.masters.service.MastersService) {
            //do something
        }

        public getMasters(): app.masters.service.Masters {
            return this.mastersService.getMasters([
                masters.service.MasterType.lender, //Lender Types
                masters.service.MasterType.loanInfoNoOfMonths, //Loan Info No of Months
                masters.service.MasterType.loanInfoDocumentType, //Loan Info Document Type
                masters.service.MasterType.loanInfoNoOfUnits, //Loan Info No of Units
                masters.service.MasterType.loanInfoPropertyTypes, //Loan Info Property types
                masters.service.MasterType.loanInfoTitleTypes, //Loan Info Title Types
                masters.service.MasterType.loanInfoTitleManner //Loan Info Title Manner
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
                    amortizationTypeValue: undefined,
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
                    county: undefined,
                    zipCode: undefined,
                    noOfUnits: undefined,
                    yearBuilt: undefined,
                    propertyType: undefined,
                    estClosingDate: undefined,
                    contigencyRemovalDate: undefined,
                    propertyUsageType: undefined,
                    sourceOfPayment: undefined,
                    title: {
                        type: undefined,
                        fullName: undefined,
                        mannerOfTitle: undefined,
                        estateHeldIn: undefined
                    }
                }
            };
        }

        public createInfoViewModel(loan: sierra.model.SPMLoan): ViewModel {
            return {
                infoHeader: {
                    lenderType: 'undefined',
                    isBorrowerAssets: undefined,
                    isCoBorrowerAssets: undefined,
                    applicationdate: Boolean(loan.applicationDate) ? new Date(loan.applicationDate) : undefined
                },
                loanInfo: {
                    mortgageAppliedFor: 'undefined',
                    state: loan.propertyState,
                    noOfMonths: + loan.term,
                    programId: undefined,
                    amortizationType: loan.amortizationType,
                    amortizationTypeValue: undefined,
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
                    county: loan.subjectProperty.county,
                    zipCode: loan.subjectProperty.zip,
                    noOfUnits: loan.subjectProperty.numberOfUnits,
                    yearBuilt: loan.subjectProperty.yearBuilt,
                    propertyType: loan.subjectProperty.propertyType,
                    estClosingDate: Boolean(loan.subjectProperty.expirationDate) ? new Date(loan.subjectProperty.expirationDate) : undefined,
                    contigencyRemovalDate: undefined,
                    propertyUsageType: loan.propertyUsageType,
                    sourceOfPayment: undefined,
                    title: {
                        type: undefined,
                        fullName: undefined,
                        mannerOfTitle: undefined,
                        estateHeldIn: loan.subjectProperty.estateHeldIn
                    }
                }
            };
        }

        public createClientTextPair(data: sierra.model.KeyValuePairStringString[]): TextPair[] {
            let firstTime: boolean = false;
            return (data || []).reduce((filter: TextPair[], item: sierra.model.KeyValuePairStringString) => {
                let name: string = item.key;
                let code: string = item.value;
                if (!filter.some((pair: TextPair) => pair.value === name) ||
                    !filter.some((pair: TextPair) => pair.text === code)) {
                    if (!firstTime) {
                        filter.push(<TextPair>{
                            text: 'Select',
                            value: undefined
                        });
                        firstTime = true;
                    }
                    filter.push(<TextPair>{
                        text: item.key,
                        value: item.value
                    });
                }
                return filter;
            }, []);
        }
    }
    appModule.service('loanInfoServices', LoanInfoServices);
}
