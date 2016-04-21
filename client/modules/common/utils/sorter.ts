/// <reference path="../../../../typings/lib.d.ts" />
/// <reference path="../../../../typings/app.d.ts" />

namespace common.utils {
    export class Sorter {
        constructor(private data: any[], private sortFields: any) {
        }

        public field: string;
        public order: SortOrder = SortOrder.ascending;

        public isAscending(): boolean {
            return this.order === SortOrder.ascending;
        }

        public sort(field: string, order: SortOrder = SortOrder.ascending): void {
            if (!this.field) {
                this.field = field;
            } else if (field === this.field) {
                this.order = this.order === SortOrder.ascending ? SortOrder.descending : SortOrder.ascending;
            } else {
                this.order = SortOrder.ascending;
                this.field = field;
            }
            if (Boolean(order)) {
                this.order = order;
            }

            let sortFunc: SortFunc = this.sortFields[this.field];
            if (typeof sortFunc !== 'function') {
                sortFunc = this.getDefaultSortFunc(sortFunc);
            }
            this.data.sort((x: any, y: any) => {
                let xValue: any = x[this.field];
                let yValue: any = y[this.field];
                let comparison: number = sortFunc(xValue, yValue);
                if (this.order === SortOrder.descending) {
                    comparison *= -1;
                }
                return comparison;
            });
        }

        private getDefaultSortFunc(sortFunc: any): SortFunc {
            let t: string = typeof sortFunc;
            switch (t) {
                case 'number': return Comparisons.forNumbers;
                case 'boolean': return Comparisons.forBooleans;
                default: return Comparisons.forStrings();
            }
        }
    }

    export enum SortOrder {
        ascending,
        descending
    }

    export type SortFunc = (x: any, y: any) => number;

    export class Comparisons {
        public static forStrings(caseSensitive: boolean = true): SortFunc {
            return (x: string, y: string): number => {
                let result: number = Comparisons.compareWithFalsyValues(x, y);
                if (Boolean(result)) {
                    return result;
                }
                let xValue: string = caseSensitive ? x.toUpperCase() : x;
                let yValue: string = caseSensitive ? y.toUpperCase() : y;
                if (xValue > yValue) {
                    return 1;
                }
                if (xValue < yValue) {
                    return -1;
                }
                return 0;
            };
        }
        public static forNumericStrings: SortFunc = (x: string, y: string): number => {
            let result: number = Comparisons.compareWithFalsyValues(x, y);
            if (Boolean(result)) {
                return result;
            }
            let xNum: number = parseInt(x);
            let yNum: number = parseInt(y);
            if (isNaN(xNum) && isNaN(yNum)) {
                return 0;
            }
            if (isNaN(xNum)) {
                return -1;
            }
            if (isNaN(yNum)) {
                return 1;
            }
            return xNum - yNum;
        };
        public static forNumbers: SortFunc = (x: number, y: number): number => {
            let result: number = Comparisons.compareWithFalsyValues(x, y);
            if (Boolean(result)) {
                return result;
            }
            return x - y;
        };

        public static forBooleans: SortFunc = (x: boolean, y: boolean): number =>
            Comparisons.compareWithFalsyValues(x, y) || 0;

        private static compareWithFalsyValues(x: any, y: any): number {
            if (!x && !y) {
                return 0;
            }
            if (Boolean(x) && !y) {
                return 1;
            }
            if (!x && Boolean(y)) {
                return -1;
            }
            return undefined;
        }
    }
}
