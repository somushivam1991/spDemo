/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />
namespace app.dashboard.prospect {
    export interface ViewModel {
        prospects: ProspectVM[];
        filter: FilterCriteria;
        prospectSource: ProspectSource;
        showGridColumns: ShowGridColumns;
    }

    export interface ProspectSource {
        name: TextPair;
    }

    export interface ProspectVM {
        prospectID: string;
        firstName: string;
        lastName: string;
        middleName: string;
        suffixName: string;
        nickName: string;
        email: string;
        homePhone: string;
        workPhone: string;
        cellPhone: string;
        preferredContactMethod: string;
        bestTimeToContact: Date;
        nextDateToContact: Date;
        dateOfBirth: Date;
        alternateEmail: string;
        streetAddress: string;
        city: string;
        state: string;
        zip: string;
        relationship: string;
        borrowerType: string;
        associatedTo: string;
        id: string;
        dateCreated: Date;
        loanPurpose: string;
        firstTimeHomeBuyer: boolean;
        leadSource: string;
        leadName: string;
        initialCampaignType: string;
        programCategory: string;
        dateConvertedToPreQual: Date;
        dateAddedToLeadManagement: Date;
    };

    export interface SearchCriteria {
        lastName: string;
    }

    export interface FilterCriteria {
        page?: number;
        pageSize?: number;
        sortOrder?: string;
        sortField?: string;
        searchCriteria?: SearchCriteria;
    }

    export interface ShowGridColumns {
        isLeadSource: boolean;
    }
}
