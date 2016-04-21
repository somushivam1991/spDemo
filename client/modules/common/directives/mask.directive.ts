/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace common.directives {

    commonModule.directive('siMask', () => {
        return <ng.IDirective>{
            restrict: 'A',
            require: 'ngModel',
            link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController): void => {
                function getMask(alias: string): [string, string] {
                    switch (alias) {
                        case 'zip': return ['mask', '99999[-9999]'];
                        case 'zip-long': return ['mask', '99999-9999'];
                        case 'zip-short': return ['mask', '99999'];
                        case 'date': return ['alias', 'mm/dd/yyyy'];
                        default: return undefined;
                    }
                }

                function onValidMask(): void {
                    if (Boolean(controller.$viewValue)) {
                        controller.$setValidity('mask', true);
                    }
                }

                function onInvalidMask(): void {
                    if (Boolean(controller.$viewValue)) {
                        controller.$setValidity('mask', false);
                    }
                }

                let alias: string = attrs['siMask'];
                let mask: [string, string];
                if (!alias) {
                    mask = attrs['customMask'];
                    if (!mask) {
                        throw new Error('Need to specify a custom mask.');
                    }
                } else {
                    mask = getMask(alias);
                }
                element['inputmask']({
                    [mask[0]]: mask[1],
                    clearMaskOnLostFocus: true,
                    greedy: false,
                    oncomplete: onValidMask,
                    onincomplete: onInvalidMask
                });

                // controller.$validators['mask'] = (value: string) => $.inputmask.isValid(value, { mask: mask });
            }
        };
    });

}
