/// <reference path="../../../typings/lib.d.ts" />
/// <reference path="../../../typings/app.d.ts" />

namespace security.baseState {

    export class BaseState {
        private _storage: any = {};

        /* @ngInject */
        constructor(private $localStorage: ngStorage.ILocalStorage,
                    private $sessionStorage: ngStorage.ISessionStorage,
                    storage: StorageDescriptor[]) {
            (storage || []).forEach((descriptor: StorageDescriptor) => {
                this._storage[descriptor.name] = { type: descriptor.type };
            });
            this.initialize();
        }

        /**
         * Clears all properties in the object by setting them to undefined.
         */
        public clear(): void {
            for (let item in this._storage) {
                if (this._storage.hasOwnProperty(item)) {
                    this.setState(item, undefined);
                }
            }
        }

        /**
         * Clears all properties in the object and sets them to their initial values.
         */
        public reset(): void {
            this.clear();
            this.initialize();
        }

        /**
         * Initializes property values to their defaults.
         * Derived classes should override this method to provide their own defaults.
         */
        protected initialize(): void {
            //To be overridden in derived class.
        }

        protected setState<T>(name: string, value: T): void {
            let storage: StateStorage = this._storage[name];
            if (!storage) {
                throw new Error(`Cannot find storage item named ${name}`);
            }
            switch (storage.type) {
                case StateType.inMemory:
                    storage.value = value;
                    break;
                case StateType.session:
                    if (Boolean(value)) {
                        this.$sessionStorage[name] = value;
                    } else {
                        delete this.$sessionStorage[name];
                    }
                    break;
                case StateType.persisted:
                    if (Boolean(value)) {
                        this.$localStorage[name] = value;
                    } else {
                        delete this.$localStorage[name];
                    }
                    break;
                default:
                    console.error(`Don't know how to handle storage type ${storage.type}`);
                    break;
            }
        }

        protected getState<T>(name: string): T {
            let storage: StateStorage = this._storage[name];
            if (!storage) {
                throw new Error(`Cannot find storage item named ${name}`);
            }
            switch (storage.type) {
                case StateType.inMemory:
                    return storage.value;
                case StateType.session:
                    return this.$sessionStorage[name];
                case StateType.persisted:
                    return this.$localStorage[name];
                default:
                    console.error(`Don't know how to handle storage type ${storage.type}`);
                    return storage.value;
            }
        }
    }

    interface StorageDescriptor {
        name: string;
        type: StateType;
    }

    interface StateStorage {
        type: StateType;
        value?: any;
    }

    export enum StateType {
        inMemory,
        session,
        persisted
    }
}
