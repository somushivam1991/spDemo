/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace app.prospect {
    import layout = common.layouts.main;

    export const createroute: IPageState = {
        name: 'create-prospect',
        layout: layout.route,
        templateUrl: 'prospect/prospect.html',
        url: '/prospect/create',
        resolve: {
            prospectId:
            /* @ngInject */
            (): string => undefined,
            refType:
            /* @ngInject */
            (refDataWebService: sierra.service.IRefDataWebService): ng.IPromise<sierra.model.ApiResultModelIEnumerableRefData> =>
                refDataWebService.RefData_Get('states,LeadSource,CampaignType'),
            prospect:
            /* @ngInject */
            (): ng.IPromise<sierra.model.ApiResultGetProspectResponse> => undefined
        }
    };

    export const editroute: IPageState = {
        name: 'edit-prospect',
        layout: layout.route,
        templateUrl: 'prospect/prospect.html',
        url: '/prospect/{prospectId}',
        resolve: {
            prospectId:
            /* @ngInject */
            ($stateParams: angular.ui.IStateParamsService): string => {
                let id: string = $stateParams['prospectId'];
                return id;
            },
            refType:
            /* @ngInject */
            (refDataWebService: sierra.service.IRefDataWebService): ng.IPromise<sierra.model.ApiResultModelIEnumerableRefData> =>
                refDataWebService.RefData_Get('states,LeadSource,CampaignType'),
            prospect:
            /* @ngInject */
            (prospectWebService: sierra.service.IProspectWebService, prospectId: string): ng.IPromise<sierra.model.ApiResultGetProspectResponse> =>
                prospectWebService.Prospect_GetProspect(prospectId)

        }
    };

    export class ProspectController extends ngTemplate.core.bases.PageController<layout.LayoutController> {

        public headerProspect: string = undefined;
        public isBusy: boolean = false;
        public primaryContact: PreferredContactVM[] = [];
        public coBorContact: PreferredContactVM[] = [];
        public applicantOneShow: boolean = false;
        public applicantTwoShow: boolean = false;
        public vm: ViewModel = {};
        public states: TextPair[];
        public leadSource: TextPair[];
        public campaignType: TextPair[];
        public masters: app.masters.service.Masters;
        public prospectsDatePicker: common.directives.DatePicker[] = [
            new common.directives.DatePicker(),
            new common.directives.DatePicker(),
            new common.directives.DatePicker(),
            new common.directives.DatePicker(),
            new common.directives.DatePicker(),
            new common.directives.DatePicker()
        ];
        public leadReceivedDatePicker: common.directives.DatePicker;
        public primaryProspectDatePicker: common.directives.DatePicker;
        public nextToTimeDatePicker: common.directives.DatePicker;
        public bestTimeDatePicker: common.directives.DatePicker[] = [
            new common.directives.DatePicker(),
            new common.directives.DatePicker()
        ];
        public applicantHeader: string = undefined;
        public isPrimaryEmail: string = undefined;

        /* @ngInject */
        constructor($scope: IProspectControllerScope,
                    private prospectServices: ProspectServices,
                    private refType: sierra.model.ApiResultModelIEnumerableRefData,
                    private popupService: popup.PopupService,
                    private $timeout: ng.ITimeoutService,
                    private prospectWebService: sierra.service.IProspectWebService,
                    private toastr: toastr.IToastrService,
                    private prospect: any,
                    private $state: angular.ui.IStateService) {
                    super($scope);
                    this.masters = this.prospectServices.getMasters();
                    if (Boolean(refType)) {
                        this.states = this.prospectServices.createClientTextPair(this.refType.items[1].data);
                        this.leadSource = this.prospectServices.createClientTextPair(this.refType.items[2].data);
                        this.campaignType = this.prospectServices.createClientTextPair(this.refType.items[0].data);
                    }
                    this.vm.isCoborrower = [];
                    //this.vm.loanPurpose = 'Refinance';
                    this.primaryProspectDatePicker = new common.directives.DatePicker();
                    // this.initializeDatePicker();
                    this.leadReceivedDatePicker = new common.directives.DatePicker();
                    this.nextToTimeDatePicker = new common.directives.DatePicker();
                    this.primaryContact = this.masters.preferredContact.map((item: TextPair) => <PreferredContactVM>{
                        value: item.value,
                        text: item.text,
                        disabled: true
                    });
                    this.coBorContact = this.masters.preferredContact.map((item: TextPair) => <PreferredContactVM>{
                        value: item.value,
                        text: item.text,
                        disabled: true
                    });

                    if (Boolean(prospect)) {
                        this.headerProspect = 'Edit Prospect : ' + prospect.items.deal.primaryProspect.firstName + ' ' + prospect.items.deal.primaryProspect.lastName;
                        this.createVm(prospect.items.deal);
                    } else {
                        this.headerProspect = 'Create New Prospect';
                    }
                    let currentDate: Date = new Date();
                    let dobDate: any = currentDate.getFullYear() - 18;
                    this.prospectsDatePicker[0].maxDate = moment([dobDate, currentDate.getMonth(), currentDate.getDate()]).toDate();
                    this.prospectsDatePicker[1].maxDate = moment([dobDate, currentDate.getMonth(), currentDate.getDate()]).toDate();
                    this.prospectsDatePicker[2].maxDate = moment([dobDate, currentDate.getMonth(), currentDate.getDate()]).toDate();
                    this.prospectsDatePicker[3].maxDate = moment([dobDate, currentDate.getMonth(), currentDate.getDate()]).toDate();
                    this.prospectsDatePicker[4].maxDate = moment([dobDate, currentDate.getMonth(), currentDate.getDate()]).toDate();
                    this.prospectsDatePicker[5].maxDate = moment([dobDate, currentDate.getMonth(), currentDate.getDate()]).toDate();
                    this.bestTimeDatePicker[0].minDate = moment().toDate();
                    this.bestTimeDatePicker[1].minDate = moment().toDate();
                    this.leadReceivedDatePicker.minDate = moment().toDate();
                    this.nextToTimeDatePicker.minDate = moment().toDate();

                    this.prospectsDatePicker[1].disableCalenderIcon = !!this.vm.isCoborrower && !this.vm.isCoborrower[1];
                    this.bestTimeDatePicker[1].disableCalenderIcon = !!this.vm.isCoborrower && !this.vm.isCoborrower[1];

        }

        public get prospectForm(): IProspectForm {
            return (<IProspectControllerScope>this.$scope).prospectForm;
        }

        public onSuccessClick(): void {
            this.validateProspectForm();
            let value: boolean = this.validatePropect();
            if (value) {
                if (this.vm.prospects || !this.vm.prospects[0]) {
                    if (Boolean(this.vm.prospects[0].email)) {
                        let isValidEmail: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.vm.prospects[0].email);
                        if (isValidEmail) {
                            if (this.isPrimaryEmail !== this.vm.prospects[0].email) {
                                this.$timeout(() => {
                                    this.isBusy = true;
                                    let validatePropsectDetails: sierra.model.ValidatePropsectDetails = sierra.model.ModelFactory.createEmptyValidatePropsectDetails(
                                        (m: sierra.model.ValidatePropsectDetails) => {
                                            m.email = this.vm.prospects[0].email;
                                        });
                                    this.prospectWebService.Prospect_ValidateProspect(validatePropsectDetails).then((result2: any) => {
                                        this.isBusy = false;
                                        if (!result2.Items.Status) {
                                            this.saveProspect();
                                        } else {
                                            this.popupService.showConfirmation(`There is another file in your pipeline with the same e-mail ID ` + this.vm.prospects[0].email + `. Would you like to` +
                                                ` proceed with creation of Prospect with Duplicate entry?`, 'Duplicate Email', 'Yes', 'No').then(() => {
                                                    this.saveProspect();
                                                });
                                        }
                                    });
                                }, 400);
                            } else {
                                this.saveProspect();
                            }

                        }
                    } else {
                        this.saveProspect();
                    }
                }
            } else {
                this.toastr.error('Please Enter Required Fields');
            }
            $('html,body').animate({ scrollTop: 0 }, 'slow');
        }

        // private initializeDatePicker(): void {
        //     for (let index: number = 0; index < 6; index++) {
        //         this.prospectsDatePicker.push(new common.directives.DatePicker());
        //         if (index < 2) {
        //             this.bestTimeDatePicker.push(new common.directives.DatePicker());
        //         }
        //     }
        // }

        private saveProspect(): void {
            let data: sierra.model.SPMDeal = undefined;
            let vo: sierra.model.SPMDeal = this.prospectServices.updateServerModel(this.vm, data, this.getParent().shell.userEmail);
            this.isBusy = true;
            this.prospectWebService.Prospect_SaveProspect(vo).then((result: sierra.model.ApiResultModelCreateProspectResponse) => {
                this.isBusy = false;
                //  if (result.items.status) {
                if (!this.vm.id) {
                    this.toastr.success(vo.prospects[0].firstName + ' ' + vo.prospects[0].lastName + ' prospect has been created succesfully');
                    this.$state.go(editroute, { prospectId: result.items.prospectId });
                } else {
                    this.toastr.success(vo.prospects[0].firstName + ' ' + vo.prospects[0].lastName + ' prospect has been updated succesfully');
                    this.isBusy = true;
                    this.prospectWebService.Prospect_GetProspect(result.items.prospectId).then((response: any) => {
                        this.isBusy = false;
                        this.createVm(response.items.deal);
                        this.headerProspect = 'Edit Prospect : ' + response.items.deal.primaryProspect.firstName + ' ' + response.items.deal.primaryProspect.lastName;
                    });
                }
                //}
            });
        }

        public onClickMoveHistory(): void {
            this.vm.newNotes = this.vm.newNotes || [];
            this.vm.noteHistory = this.vm.noteHistory || [];
            if (!!this.vm.note) {
                this.vm.noteHistory.push({
                    date: moment().format('MM/DD/YYYY hh:mm A'),
                    content: this.vm.note
                });
                this.vm.newNotes.push(moment().format('MM/DD/YYYY hh:mm A'));
                this.vm.newNotes.push(this.vm.note);
                this.vm.note = undefined;
            } else {
                this.toastr.warning('Please enter notes');
            }
        }

        public clearCoBorrower(value: number): void {
            this.prospectsDatePicker[value].disableCalenderIcon = !!this.vm.isCoborrower && !this.vm.isCoborrower[value];
            if (value === 1) {
                this.bestTimeDatePicker[value].disableCalenderIcon = !!this.vm.isCoborrower && !this.vm.isCoborrower[value];
            }
            if (!this.vm.isCoborrower[value]) {
                if (!!this.vm.prospects && this.vm.prospects[value]) {
                    this.vm.prospects[value] = this.prospectServices.createSPMProspectVM(undefined);
                }
            }
            this.restForm([value]);
        }

        public setPreferredContact(source: string): void {
            if (source === 'primary') {
                this.primaryContact = this.masters.preferredContact.map((item: TextPair) => <PreferredContactVM>{
                    value: item.value,
                    text: item.text,
                    disabled: item.value === 'Home_phone' ? !this.vm.prospects[0].homePhone :
                        item.value === 'Work_phone' ? !this.vm.prospects[0].workPhone :
                            item.value === 'Cell_phone' ? !this.vm.prospects[0].cellPhone :
                                item.value === 'email' ? !this.vm.prospects[0].email : undefined
                });
                this.vm.prospects[0].preferredContactMethod = undefined;
            } else {
                this.coBorContact = this.masters.preferredContact.map((item: TextPair) => <PreferredContactVM>{
                    value: item.value,
                    text: item.text,
                    disabled: item.value === 'Home_phone' ? !this.vm.prospects[1].homePhone :
                        item.value === 'Work_phone' ? !this.vm.prospects[1].workPhone :
                            item.value === 'Cell_phone' ? !this.vm.prospects[1].cellPhone :
                                item.value === 'email' ? !this.vm.prospects[1].email : undefined
                });
                this.vm.prospects[1].preferredContactMethod = undefined;
            }
        }

        public addApplicant(): void {
            if (!this.applicantOneShow) {
                this.restForm([2, 3]);
                this.clearCoBorrower(3);
            } else if (!this.applicantTwoShow) {
                this.restForm([4, 5]);
                this.clearCoBorrower(5);
            }
            !this.applicantOneShow ? this.applicantOneShow = true : !this.applicantTwoShow ? this.applicantTwoShow = true : this.applicantTwoShow = true;
        }

        public onDeleteApplicant(value: number): void {
            this.popupService.showConfirmation('Are you sure you want to Delete?', 'Delete Applicant', 'Yes', 'No').then(() => {
                if (value === 3) {
                    this.applicantOneShow = false;
                } else {
                    this.applicantTwoShow = false;
                }
                if (!!this.vm.prospects && this.vm.prospects[value]) {
                    this.vm.prospects[value] = undefined;
                }
                if (!!this.vm.prospects && this.vm.prospects[value - 1]) {
                    this.vm.prospects[value - 1] = undefined;
                }
                if (this.vm.isCoborrower && this.vm.isCoborrower.length > value && !!this.vm.isCoborrower[value]) {
                    this.vm.isCoborrower[value] = false;
                }
                this.restForm([value, value - 1]);
            });
        }

        public onPurposeSelect(type: string): void {
            this.vm.loanPurpose = type;
            if (type === 'Refinance') {
                this.vm.firstTimeHomeBuyer = false;
            }
        }

        public validateProspectForm(): void {
            for (let element in this.prospectForm) {
                if (!!this.prospectForm[element] && typeof (this.prospectForm[element].$touched) === 'boolean' && !this.prospectForm[element].$touched) {
                    this.prospectForm[element].$touched = true;
                }
            }
        }

        public emailValidation(value: number, source: string): boolean {
            let reg: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (source === 'mail') {
                return !!this.vm.prospects && !!this.vm.prospects[value] && !!this.vm.prospects[value].email &&
                    !reg.test(this.vm.prospects[value].email);
            } else {
                return !!this.vm.prospects && !!this.vm.prospects[value] && !!this.vm.prospects[value].alternateEmail && !reg.test(this.vm.prospects[value].alternateEmail);
            }
        }

        public validatePropect(): boolean {
            if (!this.vm.prospects || !this.vm.prospects[0]) {
                return false;
            }
            if (!!this.vm.prospects[0] && (!this.vm.prospects[0].firstName || !this.vm.prospects[0].lastName ||
                this.emailValidation(0, 'mail') || this.emailValidation(0, 'amail') || this.validatePhone(0) || this.validateZip(0))) {
                return false;
            }
            if (!!this.vm.isCoborrower && this.vm.isCoborrower.length > 0 && this.vm.isCoborrower[1]) {
                if (!this.vm.prospects[1]) {
                    return false;
                }
                if (!this.vm.prospects[1].firstName || !this.vm.prospects[1].lastName ||
                    this.emailValidation(1, 'mail') || this.emailValidation(1, 'amail') || this.validatePhone(1) || this.validateZip(1)) {
                    return false;
                }
            }

            if (this.applicantOneShow) {
                if (!this.vm.prospects[2]) {
                    return false;
                }
                if (!!this.vm.prospects[2] && (!this.vm.prospects[2].firstName || !this.vm.prospects[2].lastName ||
                    this.emailValidation(2, 'mail') || this.emailValidation(2, 'amail') || this.validatePhone(2) || this.validateZip(2))) {
                    return false;
                }
            }

            if (!!this.vm.isCoborrower && this.vm.isCoborrower.length > 0 && this.vm.isCoborrower[3]) {
                if (!this.vm.prospects[3]) {
                    return false;
                }
                if (!this.vm.prospects[3].firstName || !this.vm.prospects[3].lastName ||
                    this.emailValidation(3, 'mail') || this.emailValidation(3, 'amail') || this.validatePhone(3) || this.validateZip(3)) {
                    return false;
                }
            }
            if (this.applicantTwoShow) {
                if (!this.vm.prospects[4]) {
                    return false;
                }
                if (!!this.vm.prospects[4] && (!this.vm.prospects[4].firstName || !this.vm.prospects[4].lastName ||
                    this.emailValidation(4, 'mail') || this.emailValidation(4, 'amail') || this.validatePhone(4) || this.validateZip(4))) {
                    return false;
                }
            }
            if (!!this.vm.isCoborrower && this.vm.isCoborrower.length > 0 && this.vm.isCoborrower[5]) {
                if (!this.vm.prospects[5]) {
                    return false;
                }
                if (!this.vm.prospects[5].firstName || !this.vm.prospects[5].lastName ||
                    this.emailValidation(5, 'mail') || this.emailValidation(5, 'amail') || this.validatePhone(5) || this.validateZip(0)) {
                    return false;
                }
            }
            return true;
        }

        private validatePhone(source: number): boolean {
            return ((!!this.vm.prospects[source].homePhone && this.vm.prospects[source].homePhone.length < 10) ||
                (!!this.vm.prospects[source].workPhone && this.vm.prospects[source].workPhone.length < 10)
                || (!!this.vm.prospects[source].cellPhone && this.vm.prospects[source].cellPhone.length < 10));
        }

        private validateZip(source: number): boolean {
            return !!this.vm.prospects[source].zip && this.vm.prospects[source].zip.length < 5;
        }

        public restForm(source: number[]): void {
            //let resetFields: string[] = [];
            for (let index: number = 0; index < source.length; index++) {
                this.prospectForm[`prospects${source[index]}fName`].$touched = false;
                this.prospectForm[`prospects${source[index]}lName`].$touched = false;
            }
        }

        public duplicatePrimaryEmail(): void {
            if (this.vm.prospects || !this.vm.prospects[0]) {
                if (Boolean(this.vm.prospects[0].email)) {
                    let isValidEmail: boolean = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.vm.prospects[0].email);
                    if (isValidEmail) {
                        this.$timeout(() => {
                            this.isBusy = true;
                            let validatePropsectDetails: sierra.model.ValidatePropsectDetails = sierra.model.ModelFactory.createEmptyValidatePropsectDetails(
                                (m: sierra.model.ValidatePropsectDetails) => {
                                    m.email = this.vm.prospects[0].email;
                                });
                            this.prospectWebService.Prospect_ValidateProspect(validatePropsectDetails).then((result: any) => {
                                this.isBusy = false;
                                if (!result.Items.Status) {
                                    //
                                } else {
                                    this.popupService.showWarning(`There is another file in your pipeline with the same e-mail ID ` + this.vm.prospects[0].email + `. Would you like to` +
                                        ` proceed with creation of Prospect with Duplicate entry?`, 'Duplicate Email', 'OK').then(() => {
                                            //alert('clicked OK');
                                        });
                                }
                            });
                        }, 400);
                    }
                }
            }
            //
        }

        private createVm(deal: any): void {
            this.vm = this.prospectServices.createViewModel(deal);
            this.isPrimaryEmail = this.vm.prospects[0].email;
            this.vm.isCoborrower = [false, false, false, false, false, false];
            this.applicantOneShow = !!this.vm.prospects.find((item: SPMProspectVM) => item && item.prospectID === '3');
            this.applicantTwoShow = !!this.vm.prospects.find((item: SPMProspectVM) => item && item.prospectID === '5');
            this.vm.isCoborrower[1] = !!this.vm.prospects.find((item: SPMProspectVM) => item && item.prospectID === '2');
            this.vm.isCoborrower[3] = !!this.vm.prospects.find((item: SPMProspectVM) => item && item.prospectID === '4');
            this.vm.isCoborrower[5] = !!this.vm.prospects.find((item: SPMProspectVM) => item && item.prospectID === '6');
        }

        public copyAddress(source: number, des: number): void {
            if (!!this.vm.prospects && !!this.vm.prospects[source]) {
                if (!!this.vm.prospects[des]) {
                    this.vm.prospects[des].city = this.vm.prospects[source].city;
                    this.vm.prospects[des].state = this.vm.prospects[source].state;
                    this.vm.prospects[des].streetAddress = this.vm.prospects[source].streetAddress;
                    this.vm.prospects[des].zip = this.vm.prospects[source].zip;
                } else {
                    this.vm.prospects[des] = <SPMProspectVM>{
                        streetAddress: this.vm.prospects[source].streetAddress,
                        zip: this.vm.prospects[source].zip,
                        city: this.vm.prospects[source].city,
                        state: this.vm.prospects[source].state
                    };
                }
                this.toastr.success('Copy address is done.');
            }
        }
    }

    interface IProspectControllerScope extends ngTemplate.core.bases.IPageControllerScope<layout.LayoutController> {
        prospectForm: IProspectForm;
    }

    export interface IProspectForm extends ng.IFormController {
        prospects0fName: ng.INgModelController;
        prospects1fName: ng.INgModelController;
        prospects2fName: ng.INgModelController;
        prospects3fName: ng.INgModelController;
        prospects4fName: ng.INgModelController;
        prospects5fName: ng.INgModelController;
        prospects0lName: ng.INgModelController;
        prospects1lName: ng.INgModelController;
        prospects2lName: ng.INgModelController;
        prospects3lName: ng.INgModelController;
        prospects4lName: ng.INgModelController;
        prospects5lName: ng.INgModelController;
        homePhone0: ng.INgModelController;
        workPhone0: ng.INgModelController;
        cellPhone0: ng.INgModelController;
        homePhone1: ng.INgModelController;
        workPhone1: ng.INgModelController;
        cellPhone1: ng.INgModelController;
        homePhone2: ng.INgModelController;
        workPhone2: ng.INgModelController;
        cellPhone2: ng.INgModelController;
        homePhone3: ng.INgModelController;
        workPhone3: ng.INgModelController;
        cellPhone3: ng.INgModelController;
        homePhone4: ng.INgModelController;
        workPhone4: ng.INgModelController;
        cellPhone4: ng.INgModelController;
        homePhone5: ng.INgModelController;
        workPhone5: ng.INgModelController;
        cellPhone5: ng.INgModelController;
        zipcode0: ng.INgModelController;
        zipcode1: ng.INgModelController;
        zipcode2: ng.INgModelController;
        zipcode3: ng.INgModelController;
        zipcode4: ng.INgModelController;
        zipcode5: ng.INgModelController;

    }

    registerController(ProspectController, createroute, editroute);
}
