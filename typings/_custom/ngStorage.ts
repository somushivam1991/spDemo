declare module ngStorage {
    interface ILocalStorage {
        [index: string]: any;
    }

    interface ISessionStorage {
        [index: string]: any;
    }
}
