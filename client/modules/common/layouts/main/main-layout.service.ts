/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace common.layouts.main {
    export class MainServices {
        /* @ngInject */
        constructor() {
            //some data
        }

        public createEmptyViewModel(): ViewModel {
            return {
                announce: {
                    title: undefined,
                    url: undefined,
                    pdfName: undefined,
                    createdDate: undefined
                },
                announces: []
            };
        }

        public createViewModel(announce: sierra.model.AnnouncementResponse[]): Announcement[] {
            return (announce || []).map((item: sierra.model.AnnouncementResponse) => <Announcement>{
                url: item.url,
                pdfName: item.pdfName,
                title: item.title,
                createdDate: item.createdDate
            });
        };
    }
    common.commonModule.service('mainServices', MainServices);
}
