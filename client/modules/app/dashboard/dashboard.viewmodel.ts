/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.dashboard {
    export interface ViewModel {
        loanNumber: number;
        name: string;
        companyName: string;
    }

    export type ViewModels = ViewModel[];
    
    
}
