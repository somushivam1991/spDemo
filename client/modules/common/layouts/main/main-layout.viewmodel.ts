/// <reference path="../../../../../typings/lib.d.ts" />
/// <reference path="../../../../../typings/app.d.ts" />

namespace common.layouts.main {
    export interface ViewModel {
        announce: Announcement;
        announces: Announcements;
    }

    export interface Announcement {
        url: string;
        title: string;
        pdfName: string;
        createdDate: string;
    }

    export type Announcements = Announcement[];
}
