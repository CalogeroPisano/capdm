sap.ui.define(["com/capgemini/DMUsecase/controller/BaseController", 'sap/ui/model/json/JSONModel', "com/capgemini/DMUsecase/model/Utils", 'sap/m/Button', 'sap/m/Popover', 'sap/m/library',"sap/ui/core/Fragment"],
    function (Controller, JSONModel, Utils, Button, Popover, library, Fragment) {
        "use strict";

        return Controller.extend("com.capgemini.DMUsecase.controller.pod.PodHeader", {

            onInit: function () {
                this.getRouter().attachRoutePatternMatched(this.handleRouteMatched, this);
            },

            handleRouteMatched: function (event) {

                //controllare perchè chiama due volte risolto perchè l'header ha lo stesso controller
                if (!this.checkRoute(event, 'Operator.Pod')) {
                    return;
                }
                sap.ui.getCore().getModel('session').setProperty('/navBackVisible', true)
                //setting utils 
                Utils.setInstance('Pod.PodHeader', this);
                this.getNavigation().setNavBack('Operator.Sfc');
                const sfc = event.getParameter("arguments").sfc;
                sap.ui.getCore().getModel('session').setProperty('/ISPOD', true);
                const that = this;




            },
            handleChangeLanguage: function (oEvent) {
                const language = oEvent.mParameters.listItem.getTitle();
                switch (language) {
                    case 'IT':
                        this.onPressItalian();
                        break;
                    case 'EN':
                        this.onPressEnglish();
                        break;
                    default:
                        break;
                }
            },
            onPressEnglish: function () {
                globalThis.window.name = "EN";
                window.location.reload(window.location.href);
            },
            onPressItalian: function () {
                globalThis.window.name = "IT";
                window.location.reload(window.location.href);
            },
            handlePopoverLogoutPress: function (oEvent) {
                const that = this;
                var oPopover = new Popover({
                    showHeader: false,
                    placement: library.PlacementType.Bottom,
                    content: [
                        new Button({
                            text: that.getResourceBundle().getText('logout'),
                            type: library.ButtonType.Transparent,
                            press: this.onLogoutPress.bind(this)
                        })
                    ]
                }).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

                oPopover.openBy(oEvent.getSource());
            },
            onLogoutPress: function () {
                this.getGlobalModel('session').logOff(() => {
                    window.location.replace(window.location.origin + '/XMII/CM/MES/index.html');
                    window.location.reload();
                });
            },

        });
    });
