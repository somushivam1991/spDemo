/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace common.utils {
    export interface Alert {
        id: string;
        type: AlertType;
        message: string;
    }

    export type Alerts = Alert[];

    export enum AlertType {
        success,
        danger
    }

    export function addAlert(alerts: Alerts, id: string, type: AlertType, message: string): void {
        if (!alerts || !id || !message) {
            return;
        }
        let index: number = alerts.findIndex((alert: Alert) => alert.id === id);
        if (!!index || index === 0) {
            alerts.splice(index, 1);
        }
        let alert: Alert = {
            id: id,
            type: type,
            message: message
        };
        alerts.unshift(alert);
    }

    export function removeAlert(alerts: Alerts, id: string): Alert {
        if (!alerts || !id) {
            return undefined;
        }
        let index: number = alerts.findIndex((alert: Alert) => alert.id === id);
        if (!!index) {
            alerts.splice(index, 1);
        }
    }
}
