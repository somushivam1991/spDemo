// /// <reference path="../../../../../typings/lib.d.ts" />
// /// <reference path="../../../../../typings/app.d.ts" />
// describe('Prospect pipeline Test', () => {
//     let service: app.dashboard.prospect.ProspectService;
//     let testProspectsData: sierra.model.SPMDealMeta[] = [];
//     beforeEach(() => {
//         //Arrange
//         service = new app.dashboard.prospect.ProspectService();
//         let count: number = 5;
//         testProspectsData = [];
//         for (let index: number = 0; index < count; index++) {
//             testProspectsData.push({
//                 id: '',
//                 primaryProspect: {
//                     lastName: 'Solley',
//                     firstName: 'Allen',
//                     nickName: 'Allen',
//                     alternateEmail: '',
//                     bestTimeToContact: '12AM',
//                     associatedTo: '',
//                     cellPhone: '',
//                     borrowerType: '',
//                     dateOfBirth: '',
//                     city: '',
//                     email: '',
//                     homePhone: '',
//                     middleName: '',
//                     nextDateToContact: '',
//                     preferredContactMethod: '',
//                     prospectID: index + ' Prospect',
//                     relationship: '',
//                     state: '',
//                     streetAddress: '',
//                     suffixName: '',
//                     workPhone: '',
//                     zip: ''
//                 },
//                 dateCreated: new Date().getUTCDate() + '',
//                 loanPurpose: 'Home Loan',
//                 firstTimeHomeBuyer: true,
//                 leadSource: 'Phone',
//                 leadName: 'Allen Solley',
//                 initialCampaignType: 'Advertisement',
//                 programCategory: 'Home Loan',
//                 dateConvertedToPreQual: new Date().getUTCDate() + '',
//                 dateAddedToLeadManagement: new Date().getUTCDate() + ''
//             });
//         }
//     });

//     it('Main Test - Prospect pipeline', () => {
//         expect(true).toEqual(true);
//     });

//     it('Positive Test 1 - Prospect count should be greater then zero', () => {
//         //Arrange : Test data arranged befire each test case.
//         //Act & Assert
//         expect(service.createProspectsVM(testProspectsData).length).toBeGreaterThan(0);
//     });

//     it('Positive Test 2 - Prospect count should be equal to five', () => {
//         //Arrange : Test data arranged befire each test case.
//         //Act & Assert
//         expect(service.createProspectsVM(testProspectsData).length).toEqual(5);
//     });

//     it('Negative Test 1 - Prospect count should not be greater then zero', () => {
//         //Arrange : Test data arranged befire each test case.
//         testProspectsData = [];
//         //Act & Assert
//         expect(service.createProspectsVM(testProspectsData).length).toEqual(0);
//     });

// });
