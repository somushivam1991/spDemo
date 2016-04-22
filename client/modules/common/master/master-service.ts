/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace app.masters.service {

    let localMasters: Masters = {
        suffix: [
            { text: 'Sr', value: 'Sr' },
            { text: 'Jr', value: 'Jr' },
            { text: 'MD', value: 'MD' },
            { text: 'II', value: 'II' },
            { text: 'III', value: 'III' },
            { text: 'IV', value: 'IV' }
        ],
        prospectView: [
            { text: 'View', value: 'Default_view' },
            { text: 'Lead Source', value: 'Lead_source' }
        ],
        preferredContact: [
            { text: 'Select', value: undefined },
            { text: 'Home Phone', value: 'Home_phone' },
            { text: 'Work Phone', value: 'Work_phone' },
            { text: 'Cell Phone', value: 'Cell_phone' },
            { text: 'Email', value: 'email' }
        ],
        occupancyType: [
            { text: 'Select', value: undefined },
            { text: 'Owner Occupied', value: 'Owner_occupied' },
            { text: 'Second Home', value: 'Second_home' },
            { text: 'Investment Property', value: 'Investment_property' }
        ],
        lender: [
            { text: 'Select', value: undefined },
            { text: 'SPM', value: 'SPM' },
            { text: 'Brokerred', value: 'Brokerred' }
        ],
        loanInfoNoOfMonths: [
            { text: '360', value: '360' },
            { text: '300', value: '300' },
            { text: '240', value: '240' },
            { text: '180', value: '180' },
            { text: '120', value: '120' }
        ],
        loanInfoDocumentType: [
            { text: 'Full Documentation', value: 'Full_Documentation' },
            { text: 'Streamline with Appraisal', value: 'Streamline_with_Appraisal' },
            { text: 'Streamline without Appraisal', value: 'Streamline_without_Appraisal' }
        ],
        loanInfoNoOfUnits: [
            { text: 'Select', value: undefined },
            { text: '1', value: '1' },
            { text: '2', value: '2' },
            { text: '3', value: '3' },
            { text: '4', value: '4' }
        ],
        loanInfoPropertyTypes: [
            { text: 'Select', value: undefined },
            { text: 'Property 1', value: '1' },
            { text: 'Property 2', value: '2' }
        ],
        loanInfoTitleTypes: [
            { text: 'Select', value: undefined },
            { text: 'Trust', value: 'Trust' },
            { text: 'XYZ', value: 'XYZ' }
        ],
        loanInfoTitleManner: [
            { text: 'Select', value: undefined },
            { text: 'Separate', value: 'Separate' },
            { text: 'XYZ', value: 'XYZ' }
        ]
    };

    export class MastersService {
        /* @ngInject */
        constructor() {
            //some data
        }

        public getMasters(requiredMasters: MasterType[]): Masters {
            let result: Masters = {};
            if (!requiredMasters) {
                return result;
            }
            for (let i: number = 0; i < requiredMasters.length; i++) {
                let name: string = MasterType[requiredMasters[i]];
                result[name] = localMasters[name];
                if (!result[name]) {
                    console.error(`Cannot find master named ${name}`);
                }
            }
            return result;
        }
    }
    appModule.service('mastersService', MastersService);
}
