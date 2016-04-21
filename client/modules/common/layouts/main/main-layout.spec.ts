// /// <reference path="../../../../../typings/lib.d.ts" />
// /// <reference path="../../../../../typings/app.d.ts" />

// describe('Main Layout Test', () => {
//     let service: common.layouts.main.MainServices;
//     beforeEach(() => {
//         service = new common.layouts.main.MainServices();
//     });
//     it('test main', () => {
//         expect(true).toEqual(true);
//     })
//     it('announement count should be greater then zero', () => {
//         let array1: sierra.model.AnnouncementResponse[] = [];
//         let x: sierra.model.AnnouncementResponse = sierra.model.ModelFactory.createEmptyAnnouncementResponse((m: sierra.model.AnnouncementResponse) => {
//             m.url = 'https://www.google.co.in/';
//             m.title = 'Announcement Test';
//             m.createdDate = '';
//         });
//         let y: sierra.model.AnnouncementResponse = sierra.model.ModelFactory.createEmptyAnnouncementResponse((m: sierra.model.AnnouncementResponse) => {
//             m.url = 'https://www.google.co.in/';
//             m.title = 'Announcement Test1';
//             m.createdDate = '';
//         });
//         array1.push(x);
//         array1.push(y);
//         expect(service.createViewModel(array1).length).toEqual(2);
//     });

//     it('announement count should be zero', () => {
//         let array1: sierra.model.AnnouncementResponse[] = [];
//         expect(service.createViewModel(array1).length).toEqual(0);
//     });

//     it('announement should be undefined', () => {
//         let array1: sierra.model.AnnouncementResponse[] = undefined;
//         expect(service.createViewModel(array1)).toBeDefined();
//     });

//     it('announement should to be same', () => {
//         let array1: sierra.model.AnnouncementResponse[] = [];
//         let x: sierra.model.AnnouncementResponse = sierra.model.ModelFactory.createEmptyAnnouncementResponse((m: sierra.model.AnnouncementResponse) => {
//             m.url = 'https://www.google.co.in/';
//             m.title = 'Announcement Test';
//             m.createdDate = '';
//         });
//         let y: sierra.model.AnnouncementResponse = sierra.model.ModelFactory.createEmptyAnnouncementResponse((m: sierra.model.AnnouncementResponse) => {
//             m.url = 'https://www.google.co.in/';
//             m.title = 'Announcement Test1';
//             m.createdDate = '';
//         });
//         array1.push(x);
//         array1.push(y);
//         expect(service.createViewModel(array1)).toEqual(array1);
//     });

//     it('announement should to be equal', () => {
//         let array1: sierra.model.AnnouncementResponse[] = [];
//         let x: sierra.model.AnnouncementResponse = sierra.model.ModelFactory.createEmptyAnnouncementResponse((m: sierra.model.AnnouncementResponse) => {
//             m.url = 'https://www.google.co.in/';
//             m.title = 'Announcement Test';
//             m.createdDate = '';
//         });
//         let y: sierra.model.AnnouncementResponse = sierra.model.ModelFactory.createEmptyAnnouncementResponse((m: sierra.model.AnnouncementResponse) => {
//             m.url = 'https://www.google.co.in/';
//             m.title = 'Announcement Test1';
//             m.createdDate = '';
//         });
//         array1.push(x);
//         array1.push(y);
//         expect(service.createViewModel(array1)).toEqual(array1);
//     });
// });
