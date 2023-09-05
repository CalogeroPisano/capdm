sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/core/UIComponent",
        "com/capgemini/DMUsecase/model/formatter"
    ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.core.routing.History} History 
     * @param {typeof sap.ui.core.UIComponent} UIComponent 
     */
    function (Controller, History, UIComponent, formatter) {
        "use strict";

        return Controller.extend("com.capgemini.DMUsecase.controller.BaseController", {
            formatter: formatter,

            /**
             * Convenience method for getting the view model by name in every controller of the application.
             * @public
             * @param {string} sName the model name
             * @returns {sap.ui.model.Model} the model instance
             */
            getModel: function (sName) {
                return this.getView().getModel(sName);
            },

            /**
             * Convenience method for setting the view model in every controller of the application.
             * @public
             * @param {sap.ui.model.Model} oModel the model instance
             * @param {string} sName the model name
             * @returns {sap.ui.mvc.View} the view instance
             */
            setModel: function (oModel, sName) {
                return this.getView().setModel(oModel, sName);
            },

            /**
             * Convenience method for getting the resource bundle.
             * @public
             * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
             */
            getResourceBundle: function () {
                return this.getOwnerComponent().getModel("i18n").getResourceBundle();
            },

            /**
             * Method for navigation to specific view
             * @public
             * @param {string} psTarget Parameter containing the string for the target navigation
             * @param {Object.<string, string>} pmParameters? Parameters for navigation
             * @param {boolean} pbReplace? Defines if the hash should be replaced (no browser history entry) or set (browser history entry)
             */
            navTo: function (target, parameters = {}, replace = false) {
                
                this.getRouter().navTo(target, parameters, replace);
            },

            /**
             * Convenience method for getting the global model by name in every controller of the application.
             * @public
             * @param {string} name the model name
             * @returns {sap.ui.model.Model} the model instance
             */
            getGlobalModel: function (name) {
                return sap.ui.getCore().getModel(name);
            },


            /**
            * Get navigation model
            * @public
            */
            getNavigation() {
                return this.getGlobalModel('navigation');
            },

            getRouter: function () {
                return UIComponent.getRouterFor(this);
            },


            /**
             * Convenience method for checking current route, given the parretn
            * @public
            */
            checkRoute(event, pattern) {
                return event.getParameter('name') === pattern;
            },


            /**
             * Convenience method for setting route matched function.
             * @public
             * @param {function} function the function to be called needs to be binded 
             * @param {Controller} controller this reference of the controller 
             */
            attachRoutePatternMatched: function (callbackName, controller) {
                this.getRouter().attachRoutePatternMatched((event) => {
                    //this.getPollings().deleteAllPollings();
                    callbackName(event)
                }, controller);
            },

            onNavBack: function () {
                var sPreviousHash = History.getInstance().getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.back();
                } else {
                    this.getRouter().navTo("appHome", {}, true /*no history*/);
                }
            }
        });
    }
);
