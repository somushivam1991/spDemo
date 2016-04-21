declare module ngIdle {
    interface IIdle {
        watch: () => void;
        unwatch: () => void;
    }

    interface IKeepalive {
        [index: string]: any;
    }

    interface IKeepaliveProvider {
        interval?: number;
    }

    interface IIdleProvider {
        timeout: (t: number) => void;
        idle: (t: number) => void;
    }
}
