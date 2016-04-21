/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.prospect {
    export class ProspectServices {
        /* @ngInject */
        constructor(private mastersService: app.masters.service.MastersService) {

        }
        public masters: app.masters.service.Masters;

        public getMasters(): app.masters.service.Masters {
            return this.mastersService.getMasters([
                masters.service.MasterType.suffix,
                masters.service.MasterType.preferredContact,
                masters.service.MasterType.occupancyType
            ]);
        }

        public updateServerModel(vm: ViewModel, vo: sierra.model.SPMDeal, userEmail: string): sierra.model.SPMDeal {
            let spmDeal: sierra.model.SPMDeal = vo;
            let prospects: any = $.map(vm.prospects, ((prospect: SPMProspectVM, index: string) => {
                if (!!prospect) {
                    prospect.prospectID = (+index + 1).toString();
                    prospect.borrowerType = +index === 0 ? '0' : +index === 1 ? '1' : +index === 2 ? '2' : +index === 3 ? '3'
                        : +index === 4 ? '2' : +index === 5 ? '3' : undefined;
                    prospect.associatedTo = +index === 0 ? undefined : +index === 1 ? '1' : +index === 2 ? '1' : +index === 3 ? '3'
                        : +index === 4 ? '1' : +index === 5 ? '5' : undefined;
                    return [prospect];
                }
            }));
            spmDeal = <sierra.model.SPMDeal>{
                leadReceivedDate: vm.leadReceivedDate,
                howProspectHeardAboutUs: vm.howProspectHeardAboutUs,
                occupancyType: vm.occupancyType,
                bestDateToContact: undefined,
                bestTimeToContact: undefined,
                note: vm.newNotes,
                assignedLO: userEmail,
                prospects: (prospects || []).map((item: SPMProspectVM) => this.createSPMProspectVO(item)),
                id: vm.id,
                primaryProspect: undefined,
                dateCreated: new Date().toString(),
                loanPurpose: vm.loanPurpose,
                firstTimeHomeBuyer: vm.firstTimeHomeBuyer,
                leadSource: vm.leadSource,
                leadName: vm.leadName,
                initialCampaignType: vm.initialCampaignType,
                programCategory: undefined,
                dateConvertedToPreQual: undefined,
                dateAddedToLeadManagement: undefined
            };
            return spmDeal;
        }

        public createViewModel(vo: sierra.model.SPMDeal): ViewModel {
            let vm: ViewModel;
            vm = <ViewModel>{
                leadReceivedDate: vo.leadReceivedDate,
                howProspectHeardAboutUs: vo.howProspectHeardAboutUs,
                notes: vo.note,
                assignedLO: vo.assignedLO,
                prospects: this.createProspectsVM(vo.prospects),
                id: vo.id,
                primaryProspect: this.createSPMProspectVM(vo.primaryProspect),
                dateCreated: vo.dateCreated,
                loanPurpose: vo.loanPurpose,
                firstTimeHomeBuyer: vo.firstTimeHomeBuyer,
                leadSource: vo.leadSource,
                leadName: vo.leadName,
                initialCampaignType: vo.initialCampaignType,
                programCategory: vo.programCategory,
                dateConvertedToPreQual: vo.dateConvertedToPreQual,
                dateAddedToLeadManagement: vo.dateAddedToLeadManagement,
                noteHistory: this.createNoteHistoryVM(vo.note)
            };
            return vm;
        }

        public createSPMProspectVM(prospect: any): any {
            if (!prospect) {
                return undefined;
            }
            return <any>{
                prospectID: prospect.prospectID,
                firstName: prospect.firstName,
                lastName: prospect.lastName,
                middleName: prospect.middleName,
                suffixName: prospect.suffixName,
                nickName: prospect.nickName,
                email: prospect.email,
                homePhone: prospect.homePhone,
                workPhone: prospect.workPhone,
                cellPhone: prospect.cellPhone,
                preferredContactMethod: prospect.preferredContactMethod,
                bestTimeToContact: prospect.bestTimeToContact,
                bestTime: prospect.bestTimeToContact,
                nextDateToContact: prospect.nextDateToContact,
                dateOfBirth: prospect.dateOfBirth,
                alternateEmail: prospect.alternateEmail,
                streetAddress: prospect.streetAddress,
                city: prospect.city,
                state: prospect.state,
                zip: prospect.zip,
                relationship: prospect.relationship,
                borrowerType: prospect.borrowerType,
                associatedTo: undefined
            };
        }

        public createProspectsVM(prospects: sierra.model.SPMProspect[]): SPMProspectVM[] {
            let returnprospectsvm: SPMProspectVM[] = [];
            let prospectsvm: SPMProspectVM[] = (prospects || []).map((item: sierra.model.SPMProspect) => this.createSPMProspectVM(item));
            let prospectIDs: number[] = prospects.reduce((results: number[], item: sierra.model.SPMProspect) => {
                results.push(parseInt(item.prospectID));
                return results;
            }, []);
            let prospectLength: number = Math.max.apply(Math, prospectIDs);
            for (let index: number = 1; index <= prospectLength; index++) {
                let prosIndex: number = prospectsvm.findIndex((item: SPMProspectVM) => parseInt(item.prospectID) === index);
                if (prosIndex > -1) {
                    returnprospectsvm.push(prospectsvm[prosIndex]);
                } else {
                    returnprospectsvm.push(undefined);
                }
            }
            return returnprospectsvm;
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

        public createSPMProspectVO(prospect: SPMProspectVM): sierra.model.SPMProspect {
             return <sierra.model.SPMProspect> {
                prospectID: prospect.prospectID,
                firstName: prospect.firstName,
                lastName: prospect.lastName,
                middleName: prospect.middleName,
                suffixName: prospect.suffixName,
                nickName: prospect.nickName,
                email: prospect.email,
                homePhone: prospect.homePhone,
                workPhone: prospect.workPhone,
                cellPhone: prospect.cellPhone,
                preferredContactMethod: prospect.preferredContactMethod,
                nextDateToContact: prospect.nextDateToContact,
                dateOfBirth: prospect.dateOfBirth,
                alternateEmail: prospect.alternateEmail,
                streetAddress: prospect.streetAddress,
                city: prospect.city,
                state: prospect.state,
                zip: prospect.zip,
                relationship: prospect.relationship,
                borrowerType: prospect.borrowerType,
                associatedTo: prospect.associatedTo,
                bestTimeToContact: this.convertDateTime(prospect.bestTimeToContact, prospect.bestTime)
            };
        }

        public convertDateTime(date: Date, time: Date): string {
            if (!date) {
                return undefined;
            }
            if (!time) {
                time = moment().toDate();
            }
            date = moment(date).toDate();
            time = moment(time).toDate();
            let hours: number = +time.getHours();
            let min: number = +time.getMinutes();
            date.setHours(hours);
            date.setMinutes(min);
            return moment(date).format('MM/DD/YYYY hh:mm A');
        }

        public createNoteHistoryVM(notes: string[]): NoteHistory[] {
            let history: NoteHistory[] = [];
            if (Boolean(notes)) {
                for (let index: number = 0; index < notes.length; index++) {
                    if (index % 2 === 0) {
                        history.push({
                            date: notes[index],
                            content: undefined
                        });
                    } else {
                        history.push({
                            date: undefined,
                            content: notes[index]
                        });
                    }
                }
            }
            return history;
        }
    }

    appModule.service('prospectServices', ProspectServices);
}
