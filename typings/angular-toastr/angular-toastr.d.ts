// Type definitions for Toastr 1.5.0
// Project: https://github.com/Foxandxss/angular-toastr

/// <reference path="../angularjs/angular.d.ts" />

declare module toastr {

    /**
     * The settings that define the look and feel of the toasts
     */
    export interface IBaseOptions {
        /**
         * Should the title and message allow Html tags?
         */
        allowHtml?: boolean;

        /**
         * Should a close button be visible on the toast?
         */
        closeButton?: boolean;

        /**
         * The html template for the close button.
         * Only shown with closeButton is true
         */
        closeHtml?: string;

        /**
         * The amount of time in milliseconds to extend the lifetime of the toast after the cursor hovers over it.
         */
        extendedTimeOut?: number;

        /**
		 * The css class that will be applied to the message element
		 */
        messageClass?: string;

		/**
		 * A callback function called when a toast gets hidden. It receives a boolean parameter to see whether it was closed via click or not.
		 * @param closedViaClick
		 */
		onHidden?: (closedViaClick: boolean) => void;

		/**
		 * A callback function called when a toast is shown.
		 */
		onShown?: () => void;

		/**
		 * A callback function called when it is clicked.
		 */
		onTap?: () => void;

		/**
		 * A progress bar to see the @timeOut in real time.
		 */
		progressBar?: boolean;

        /** Should tapping on the toast remove it? */
        tapToDismiss?: boolean;

        /** The time in milliseconds before the toast disappears */
        timeOut?: number;

        /** The css class that will be applied to the title element */
        titleClass?: string;

        /** The css class that will be applied to the toast element */
        toastClass?: string;
    }

	export interface IOptions extends IBaseOptions {
		/**
		 * If you override the template, you can pass concrete extra data per toast.
		 */
    	extraData?: any;

		/**
		 * For the type class you want to use for the toast.
		 */
    	iconClass?: string;
    }

    export interface IConfigOptions extends IBaseOptions {
		/**
		 * If true only the most recent @maxOpened toast(s)
		 */
		autoDismiss?: boolean;

        /**
         * The id that will be given to the element that the toasts will reside in.
         */
        containerId?: string;

        /**
         * The css classes to use for the various types of toasts
         */
        iconClasses?: {
            /** Error */
            error?: string

            /** Information */
            info?: string

            /** Success */
            success?: string

            /** Warning */
            warning?: string
        };

		/**
		 * Maximum number of toasts displayed at once
		 */
		maxOpened?: number;

        /** Should the newest toast be placed above the existing ones? */
        newestOnTop?: boolean;

        /** The css class that controls the location of the toast */
        positionClass?: string;

		/**
		 * Prevent duplicates of the last toast.
		 */
		preventDuplicates?: boolean;

		/**
		 * Prevent duplicates of open toasts.
		 */
		preventOpenDuplicates?: boolean;

		/**
		 * The element to put the toastr container.
		 */
		target?: string;

		/**
		 * To override the default path of the templates.
		 */
		templates?: {
		  toast?: string;
		  progressbar?: string;
		};
    }

    /**
     * Represents a visible toast
     */
    export interface IToast {
        /** Unique identifier for the toast */
        toastId: number;

        /**
         * The scope that the toast is using.
         * This is prototypically inherited from $rootScope
         */
        scope: IToastScope;

        /** The css class that defines the icon */
        iconClass: string;

        /** The element that the toast resides in */
        el: angular.IAugmentedJQuery;
    }

    /**
     *  The values that are available on the scope for the toast template to use.
     */
    export interface IToastScope extends angular.IScope {

        /** Is html allowed in the title and message sections */
        allowHtml?: boolean;

        /** The title of the toast */
        title: string;

        /** The message of the toast */
        message: string;

        /** The type of the toast. Defines the 'feel' of the toast */
        toastType: string;

        /** Unique identifier of the toast */
        toastId: number;

        /** Options */
        options: IOptions;
    }

    export interface IToastrService {

        /**
		 * Remove the passed in toasts or if no params remove all visible toasts
		 */
        clear(removeToasts?: IToast | Array<IToast>);

        /** Removes the toast specified by the given toastId */
        remove(toastId: number, wasClicked?: boolean);

        /**
         * Show a toast using the error type
        */
        error(text: string, title?: string, options?: IOptions): IToast;

        /**
         * Show a toast using the info type
        */
        info(text: string, title?: string, options?: IOptions): IToast;

        /**
         * Show a toast using the success type
        */
        success(text: string, title?: string, options?: IOptions): IToast;

        /**
         * Show a toast using the warning type
        */
        warning(text: string, title?: string, options?: IOptions): IToast;
    }
}