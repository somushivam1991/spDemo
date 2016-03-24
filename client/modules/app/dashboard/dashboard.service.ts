/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.dashboard {
    export class DashBoardServices {
        /* @ngInject */
        constructor() {
            //some data
        }

        public createViewModel(): ViewModels {
            let array1: ViewModel[] = [];
            let i: number = undefined;
            let obj: ViewModel = {
                name: undefined,
                companyName: undefined,
                loanNumber: undefined
            };
            for (i = 0; i < 5000; i++) {
                obj = {
                    name: 'my name ' + i,
                    companyName: 'my company ' + i,
                    loanNumber: parseInt('000' + i)
                };
                array1.push(obj);
            }
            return array1;
        }
    }
    appModule.service('dashBoardServices', DashBoardServices);
}
