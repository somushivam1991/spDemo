/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace common.directives {
     class ZipFormatDirective implements ng.IDirective {
        public restrict: string = 'A';
        public require: string = 'ngModel';

        /* @ngInject */
        constructor(private $filter: ng.IFilterService, private $locale: ng.ILocaleService) {
        }

        public link: ng.IDirectiveLinkFn = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController) => {
            function fromUser(text: string): string {
                if (text) {
                    let transformedInput: string;
                    if (text.length > 5) {
                        let x: number = text.indexOf('-');
                        if (x > -1) {
                            let zips: string[] = text.split('-');
                            transformedInput = zips[0] + '-' + zips[1];
                            element.val(transformedInput);
                        } else {
                            transformedInput = text.substr(0, 5) + '-' + text.substr(5);
                            element.val(transformedInput);
                        }
                    } else {
                        transformedInput = text;
                    }
                    return transformedInput;
                }
                return undefined;
            }

            controller.$parsers.push(fromUser);
        };
    }
    commonModule.directive('zipFormatDirective', ['$filter', '$locale',
        ($filter: ng.IFilterService, $locale: ng.ILocaleService) => new ZipFormatDirective($filter, $locale)
    ]);
}
