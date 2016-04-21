/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.prospect {
    export interface ViewModel {
        leadReceivedDate?: string;
        howProspectHeardAboutUs?: string;
        note?: string;
        assignedLO?: string;
        prospects?: SPMProspectVM[];
        id?: string;
        primaryProspect?: SPMProspectVM;
        dateCreated?: string;
        loanPurpose?: string;
        refinace?: string;
        estimatedLoanAmount?: number;
        firstTimeHomeBuyer?: boolean;
        leadSource?: string;
        leadName?: string;
        initialCampaignType?: string;
        programCategory?: string;
        dateConvertedToPreQual?: string;
        dateAddedToLeadManagement?: string;
        nextTimetoContact?: string;
        noteHistory?: NoteHistory[];
        isCoborrower?: boolean[];
        notes?: string[];
        newNotes?: string[];
        occupancyType?: string;
    }

    export interface SPMProspectVM {
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
        bestTime: Date;
        nextDateToContact: string;
        dateOfBirth: string;
        alternateEmail: string;
        streetAddress: string;
        city: string;
        state: string;
        zip: string;
        relationship: string;
        borrowerType: string;
        associatedTo: string;
    }

    export interface NoteHistory {
        date: string;
        content: string;
    }

    export interface PreferredContactVM {
        text?: string;
        value?: string;
        disabled?: boolean;
    }
}
