/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />
namespace common.directives {
    commonModule.directive('siDatepicker', ['$parse', '$compile',
        ($parse: ng.IParseService, $compile: ng.ICompileService): ng.IDirective => {

            return <ng.IDirective>{
                require: 'ngModel',
                restrict: 'A',
                terminal: true,

                link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController): void => {
                    controller.$formatters.unshift(function(modelValue: any): string {
                        let viewValue: ViewModelDate = common.utils.ViewModelHelpers.dateToViewModelDate(modelValue);
                        controller.$setViewValue(viewValue);
                        return viewValue;
                    });

                    controller.$parsers.unshift(function(viewValue: any): string {
                        if (!viewValue) {
                            return viewValue;
                        }
                        let result: moment.Moment = moment(viewValue);
                        return result.isValid() ? result.format('MM/DD/YYYY') : viewValue;
                    });

                    let expr: string = attrs['siDatepicker'];
                    let dtp: DatePicker = $parse(expr)(scope);

                    element.attr('si-mask', 'date')
                        .attr('ng-model-options', `{ updateOn: 'blur', allowInvalid: ${dtp.allowInvalid} }`)
                        .removeAttr('si-datepicker');
                    $compile(element)(scope);

                    let invisibleSpan: JQuery = $(`<span></span>`)
                        .attr('ng-model', element.attr('ng-model'))
                        .attr('datepicker-popup', 'MM/dd/yyyy')
                        .attr('is-open', `${expr}.opened`)
                        .attr('close-text', dtp.closeText)
                        .attr('datepicker-options', `${expr}.options`);
                    if (Boolean(dtp.minDate)) {
                        invisibleSpan.attr('min-date', `${expr}.minDate`);
                    }
                    if (Boolean(dtp.maxDate)) {
                        invisibleSpan.attr('max-date', `${expr}.maxDate`);
                    }
                    element.closest('.input-group').after(invisibleSpan);
                    $compile(invisibleSpan)(scope);

                    let icon: JQuery = $(`<i></i>`)
                        .addClass('glyphicon glyphicon-calendar');
                    let button: JQuery = $(`<span></span>`)
                        .addClass('input-group-addon')
                        .attr('ng-click', `${expr}.open($event , ${expr}.disableCalenderIcon)`)
                        .prepend(icon);
                    element.after(button);
                    $compile(button)(scope);
                }
            };
        }
    ]);

    // commonModule.directive('gwDateIncomplete', (): ng.IDirective => {
    //     return {
    //         require: 'ngModel',
    //         restrict: 'A',
    //         link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController): void => {
    //             controller.$validators['dateIncomplete'] = (value: ViewModelDate) => {
    //                 if (!value) {
    //                     return true;
    //                 }
    //                 let date: moment.Moment = moment(value);
    //                 return moment.isMoment(date) && date.isValid();
    //             };
    //         }
    //     };
    // });

    // commonModule.directive('gwMinDate', ['dateTimeValidationService', (dateTimeValidationService: validations.DateTimeValidationService): ng.IDirective => {
    //     return {
    //         require: 'ngModel',
    //         restrict: 'A',
    //         link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController): void => {
    //             let minDate: moment.Moment = moment(attrs['gwMinDate']);
    //             controller.$validators['minDate'] = (value: ViewModelDate) => {
    //                 let date: moment.Moment = moment(value);
    //                 if (!moment.isMoment(date)) {
    //                     return true;
    //                 }
    //                 return dateTimeValidationService.compareDates(minDate, date) <= 0;
    //             };
    //         }
    //     };
    // }]);

    // commonModule.directive('gwMaxDate', ['dateTimeValidationService', (dateTimeValidationService: validations.DateTimeValidationService): ng.IDirective => {
    //     return {
    //         require: 'ngModel',
    //         restrict: 'A',
    //         link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController): void => {
    //             let minDate: moment.Moment = moment(attrs['gwMaxDate']);
    //             controller.$validators['maxDate'] = (value: ViewModelDate) => {
    //                 if (!value) {
    //                     return true;
    //                 }
    //                 let date: moment.Moment = moment(value);
    //                 if (!moment.isMoment(date) || !date.isValid()) {
    //                     return true;
    //                 }
    //                 return dateTimeValidationService.compareDates(minDate, date) >= 0;
    //             };
    //         }
    //     };
    // }]);

    export class DatePicker {
        constructor(initializer?: (picker: DatePicker) => void) {
            if (Boolean(initializer)) {
                initializer(this);
            }
        }

        public closeText: string = 'Close';
        public disableCalenderIcon: boolean = false;
        public opened: boolean = false;
        public minDate: Date;
        public maxDate: Date;
        public options: ng.ui.bootstrap.IDatepickerConfig = {
            showWeeks: false
        };
        public allowInvalid: boolean = false;
        public open($event: ng.IAngularEvent, disableCalenderIcon?: boolean): void {
            if (!disableCalenderIcon) {
                if (!this.opened) {
                    this.opened = true;
                } else {
                    $event.preventDefault();
                    $event.stopPropagation();
                    this.opened = false;
                }
            }
        }
    }

}
