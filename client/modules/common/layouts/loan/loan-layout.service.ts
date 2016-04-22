/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace common.layouts.loan {
    export class LoanServices {
        /* @ngInject */
        constructor(private mastersService: app.masters.service.MastersService) {
            // do something
        }

        public createClientTextPair(data: sierra.model.SPMBorrower[]): TextPair[] {
            return (data || []).reduce((filter: TextPair[], item: sierra.model.SPMBorrower) => {
                let name: string = item.firstName + ' ' + item.lastName;
                let code: string = item.borrowerID;
                if (!filter.some((pair: TextPair) => pair.value === name) ||
                    !filter.some((pair: TextPair) => pair.text === code)) {
                    filter.push(<TextPair>{
                        text: item.firstName + ' ' + item.lastName,
                        value: item.borrowerID
                    });
                }
                return filter;
            }, []);
        }
    }
    commonModule.service('loanServices', LoanServices);
}
