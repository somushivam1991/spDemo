/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.home {
    export class HomeState extends ngTemplate.core.bases.BaseState {
        /* @ngInject */
        constructor() {
            super([
                { type: ngTemplate.core.bases.StateType.session, name: 'authenticationtoken' },
                { type: ngTemplate.core.bases.StateType.session, name: 'userName' },
                { type: ngTemplate.core.bases.StateType.session, name: 'userEmail' },
                { type: ngTemplate.core.bases.StateType.session, name: 'defaultPipeLineView' }
            ]);
        }

        public get authentication(): string {
            return this.getState<string>('authenticationtoken');
        }

        public set authentication(value: string) {
            this.setState('authenticationtoken', value);
        }

        public get defaultPipeLineView(): string {
            return this.getState<string>('defaultPipeLineView');
        }

        public set defaultPipeLineView(value: string) {
            this.setState('defaultPipeLineView', value);
        }

        public clear(): void {
            this.clear();
        }
    }
    appModule.service('homeState', HomeState);
}
