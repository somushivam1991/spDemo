/// <reference path='../../../../../typings/app.d.ts' />
namespace app.dashboard.prospect {
    export class ProspectService {

        /* @ngInject */
        constructor(private mastersService: app.masters.service.MastersService) {
            //some data
        }

        public masters: app.masters.service.Masters;

        public getMasters(): app.masters.service.Masters {
            return this.mastersService.getMasters([
                masters.service.MasterType.prospectView
            ]);
        }

        public createEmptyViewModel(): ViewModel {
            return {
                prospects: [],
                filter: {
                    page: 1,
                    pageSize: 50,
                    sortOrder: undefined,
                    sortField: undefined,
                    searchCriteria: {
                        lastName: undefined
                    }
                },
                prospectSource: {
                    name: undefined
                },
                showGridColumns: {
                    isLeadSource: false
                }
            };
        }

        public createClientViewModel(prospects: sierra.model.SPMDealMeta[]): ProspectVM[] {
               return (prospects || []).map((item: sierra.model.SPMDealMeta) => <ProspectVM>{
               prospectID: item.primaryProspect.prospectID,
               firstName: item.primaryProspect.firstName,
               lastName: item.primaryProspect.lastName,
               middleName: item.primaryProspect.middleName,
               suffixName: item.primaryProspect.suffixName,
               nickName: item.primaryProspect.nickName,
               email: item.primaryProspect.email,
               homePhone: item.primaryProspect.homePhone,
               workPhone: item.primaryProspect.workPhone,
               cellPhone: item.primaryProspect.cellPhone,
               preferredContactMethod: item.primaryProspect.preferredContactMethod,
               bestTimeToContact: Boolean(item.primaryProspect.bestTimeToContact) ? new Date(item.primaryProspect.bestTimeToContact) : undefined,
               nextDateToContact: Boolean(item.primaryProspect.nextDateToContact) ? new Date(item.primaryProspect.nextDateToContact) : undefined,
               dateOfBirth: Boolean(item.primaryProspect.dateOfBirth) ? new Date(item.primaryProspect.dateOfBirth) : undefined,
               alternateEmail: item.primaryProspect.alternateEmail,
               streetAddress: item.primaryProspect.streetAddress,
               city: item.primaryProspect.city,
               state: item.primaryProspect.state,
               zip: item.primaryProspect.zip,
               relationship: item.primaryProspect.relationship,
               borrowerType: item.primaryProspect.borrowerType,
               associatedTo: item.primaryProspect.associatedTo,
               id: item.id,
               dateCreated: Boolean(item.dateCreated) ? new Date(item.dateCreated) : undefined,
               loanPurpose: item.loanPurpose,
               firstTimeHomeBuyer: item.firstTimeHomeBuyer,
               leadSource: item.leadSource,
               leadName: item.leadName,
               initialCampaignType: item.initialCampaignType,
               programCategory: item.programCategory,
               dateConvertedToPreQual: Boolean(item.dateConvertedToPreQual) ? new Date(item.dateConvertedToPreQual) : undefined,
               dateAddedToLeadManagement: Boolean(item.dateAddedToLeadManagement) ? new Date(item.dateAddedToLeadManagement) : undefined
            });
        };
    }
    appModule.service('prospectService', ProspectService);
}
