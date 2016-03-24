/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace common.directives {
    class NumberFormatDirective implements ng.IDirective {
        public restrict: string = 'A';
        public require: string = 'ngModel';
        /* @ngInject */
        constructor(private $filter: ng.IFilterService, private $locale: ng.ILocaleService) {
        }

        public link: ng.IDirectiveLinkFn = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModelCtrl: ng.INgModelController) => {
            let hasMoneyMask: boolean = false;
            let isValuePasted: boolean = false;
            element.bind('paste', function(e: any): void {
                isValuePasted = true;
            });
            let format: string = attrs['saNumberFormat'];
            let fraction: number = parseInt(format.split(',')[1]);
            function fromUser(text: string): string {
                if (text) {
                    text = typeof text === 'number' ? text.toString() : text;
                    text = isValuePasted ? (Math.round(parseFloat(text) * 100) / 100).toString() : text;
                    hasMoneyMask = attrs['moneyMask'] !== undefined;
                    let allowNegative: string = attrs['saAllowNegative'];
                    let transformedInput: string;
                    //let maxValue: number = (Math.pow(10, parseInt(format.split(',')[0]) - parseInt(format.split(',')[1]))) - 1;
                    //let maxDecimalValue: number = Math.pow(10, parseInt(format.split(',')[1])) - 1;
                    let decimalValue: string = text.split('.')[1];
                    let value: string = text.split('.')[0];
                    let dotCount: number = text.split('.').length - 1;
                    let dashCount: number = text.split('-').length - 1;

                    if (allowNegative !== 'true') {
                        if (dotCount === 1) {
                            if (decimalValue.length > parseInt(format.split(',')[1])) {
                                transformedInput = text.substring(0, text.length - 1);
                            } else {
                                transformedInput = text.replace(/[^0-9.]/g, '');
                            }
                        } else if (dotCount === 2) {
                            transformedInput = text.substring(0, text.length - 1);
                        } else {
                            transformedInput = text.replace(/[^0-9]/g, '');
                        }
                        if (value.length > (parseInt(format.split(',')[0]) - parseInt(format.split(',')[1]))) {
                            transformedInput = text.substring(0, text.length - 1);
                        }
                    } else {
                        if (text[text.length - 1] === '-' && text.length === 1) {
                            transformedInput = text;
                        } else {
                            if (dotCount === 1) {
                                if (text[0] !== '-') {
                                    transformedInput = text.replace(/[^0-9.]/g, '');
                                } else {
                                    if (dashCount === 2) {
                                        transformedInput = text.substring(0, text.length - 1);
                                    } else {
                                        transformedInput = text.replace(/[^0-9.-]/g, '');
                                    }
                                }
                                if (decimalValue.length > parseInt(format.split(',')[1])) {
                                    transformedInput = text.substring(0, text.length - 1);
                                } else {
                                    if (dotCount === 2 || dashCount === 2) {
                                        transformedInput = text.substring(0, text.length - 1);
                                    } else {
                                        transformedInput = text.replace(/[^0-9.-]/g, '');
                                    }

                                }
                            } else if (dotCount === 2 || dashCount === 2) {
                                transformedInput = text.substring(0, text.length - 1);
                            } else {
                                if (text[0] !== '-') {
                                    transformedInput = text.replace(/[^0-9]/g, '');
                                    if (text.length > 8) {
                                        transformedInput = text.substring(0, text.length - 1);
                                    }

                                } else {
                                    if (dashCount === 2) {
                                        transformedInput = text.substring(0, text.length - 1);
                                    } else {
                                        transformedInput = text.replace(/[^0-9.-]/g, '');
                                        if (text.length > 9) {
                                            transformedInput = text.substring(0, text.length - 1);
                                        }
                                    }
                                }
                            }
                        }

                    }
                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    } else if (isValuePasted) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;

                }
                // return undefined;
            }
            ngModelCtrl.$parsers.push(fromUser);
            let replaceRegex: RegExp = new RegExp(this.$locale.NUMBER_FORMATS.GROUP_SEP, 'g');
            let listener: () => void = (() => {
                let value: string = element.val().replace(replaceRegex, '');
                if (value !== '') {
                    element.val(this.$filter('number')(value, fraction));
                } else {
                     element.val(this.$filter('number')(0, fraction));
                }
            });
            // This runs when we focus out  the text field
            element.bind('blur', listener);
        };
    }
    commonModule.directive('saNumberFormat', ['$filter', '$locale',
        ($filter: ng.IFilterService, $locale: ng.ILocaleService) => new NumberFormatDirective($filter, $locale)
    ]);
}
