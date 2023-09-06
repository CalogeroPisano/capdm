sap.ui.define(["com/capgemini/DMUsecase/controller/BaseController", 'sap/ui/model/json/JSONModel', "com/capgemini/DMUsecase/api/API"],
    function (Controller, JSONModel, API) {
        "use strict";

        return Controller.extend("com.capgemini.DMUsecase.controller.pod.Sfc", {
            stati: [],
            onInit: function () {
                this.attachRoutePatternMatched(this.handleRouteMatched.bind(this), this);
            },
            handleRouteMatched: async function (event) {
                if (!this.checkRoute(event, 'Operator.Sfc')) {
                    return;
                }

                

                sap.ui.getCore().getModel('session').setProperty('/title', this.getView().getModel("i18n").getResourceBundle().getText('tile.synopticSFC'));
                sap.ui.getCore().getModel('session').setProperty('/navBackVisible', true)
                sap.ui.getCore().getModel('session').setProperty('/menuButtonVisible', false);
                sap.ui.getCore().getModel('session').setProperty('/ISPOD', false);

                this.getNavigation().setNavBack('Operator.Lines');

                const that = this;

                this.stati = [
                    {
                        STATE: 'Running',
                        COLOR: '#07ab07'
                    },
                    {
                        STATE: 'In Queue',
                        COLOR: '#e89b02'
                    },
                    {
                        STATE: 'New',
                        COLOR: '#818282'
                    }
                    
                ];


                const workcenter = event.getParameter("arguments").workcenter;

                this.setModel(new JSONModel(this.stati), 'legendSynopticStates');

                this.setModel(new JSONModel([]), 'synopticData');
                const data = await API.getSfc(workcenter);
                this.setModel(new JSONModel(data), 'synopticData');
                console.log(data);


            },
            goToPod: function (sfc) {
                
                this.navTo('Operator.Pod', {
                    sfc: sfc
                }, false)
            }


        });
    });
