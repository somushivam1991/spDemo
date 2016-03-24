/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace common.directives {
   commonModule.directive('saAllowOnly', () => {
        return <ng.IDirective>{
            restrict: 'A',
            require: 'ngModel',
            link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController): void => {
                function getRange(start: number, end: number): number[] {
                    let range: number[] = [];
                    for (let i: number = start; i <= end; i++) {
                        range.push(i);
                    }
                    return range;
                }

                function getAllowedCodes(allowed: string): number[] {
                    switch (allowed) {
                        case 'numbers': return getRange(48, 57);
                        case 'characters': return getRange(65, 90).concat(getRange(97, 122));
                        case 'uppercase': return getRange(65, 90);
                        case 'lowercase': return getRange(97, 122);
                        case 'spaces': return [32];
                        case 'dots': return [46];
                        case 'dashes': return [45];
                        case 'commas': return [44];
                        default: return [];
                    }
                }

                function getPastedText(e: Event): string {
                    let clipboardData: any = e['clipboardData'];
                    if (!clipboardData || !clipboardData.getData) {
                        return undefined;
                    }
                    if (/text\/html/.test(clipboardData.types)) {
                        return clipboardData.getData('text/html');
                    }
                    if (/text\/plain/.test(clipboardData.types)) {
                        return clipboardData.getData('text/plain');
                    }
                    return undefined;
                }

                function textContainsOnlyValidCodes(text: string, codes: number[]): boolean {
                    let code: number;
                    for (let i: number = 0; i < text.length; i++) {
                        code = text.charCodeAt(i);
                        if (!codes.some((c: number) => c === code)) {
                            return false;
                        }
                    }
                    return true;
                }

                let parts: string[] = attrs['saAllowOnly'].split(' ')
                    .filter((part: string): boolean => Boolean(part));
                let allowedCodes: number[] = parts.reduce(
                    (codes: number[], part: string) => codes.concat(getAllowedCodes(part)), [13]);
                element.keypress((event: JQueryKeyEventObject) => {
                    if (!allowedCodes.some((code: number) => code === event.which)) {
                        if (event.which === 8 || event.which === 0) {
                             event.defaultPrevented = false;
                        } else {
                            event.preventDefault();
                        }
                    }
                });
                element.on('paste', (event: JQueryEventObject) => {
                    let pastedText: string = getPastedText(event.originalEvent);
                    if (Boolean(pastedText) && !textContainsOnlyValidCodes(pastedText, allowedCodes)) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                });
                scope.$on('$destroy', () => {
                    element.off('keypress');
                    element.off('paste');
                });
            }
        };
    });
}
