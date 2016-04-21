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
