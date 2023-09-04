sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/Device", "com/capgemini/DMUsecase/model/models",
    "com/capgemini/DMUsecase/model/Pollings",
    "com/capgemini/DMUsecase/model/Navigation", "com/capgemini/DMUsecase/model/Session",
    ],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent 
     * @param {typeof sap.ui.Device} Device 
     */
    function (UIComponent, Device, models, Pollings, Navigation, Session) {
        "use strict";

        return UIComponent.extend("com.capgemini.DMUsecase.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: async function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");

                sap.ui.getCore().setModel(new Session(), 'session');
                this.setModel(sap.ui.getCore().getModel('session'), 'session');
                await sap.ui.getCore().getModel('session').init();

                sap.ui.getCore().setModel(new Pollings(), 'pollings');
                this.setModel(sap.ui.getCore().getModel('pollings'), 'pollings');
                sap.ui.getCore().getModel('pollings').init();

                sap.ui.getCore().setModel(new Navigation(), 'navigation');
                this.setModel(sap.ui.getCore().getModel('navigation'), 'navigation');
                sap.ui.getCore().getModel('navigation').init();
                if (window.location.hash === '' || window.location.hash === '#/') {
                    this.getRouter().navTo('Dashboard', {}, true);
                }

            }
        });
    }
);
