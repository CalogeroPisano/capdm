sap.ui.define(["com/capgemini/DMUsecase/controller/BaseController", 'sap/ui/model/json/JSONModel',"com/capgemini/DMUsecase/api/API"],
    function (Controller, JSONModel, API) {
        "use strict";

        return Controller.extend("com.capgemini.DMUsecase.controller.pod.Lines", {
            stati: [],
            onInit: function () {
                this.attachRoutePatternMatched(this.handleRouteMatched.bind(this), this);
            },
            handleRouteMatched: async function (event) {
                if (!this.checkRoute(event, 'Operator.Lines')) {
                    return;
                }


                
                sap.ui.getCore().getModel('session').setProperty('/title', this.getView().getModel("i18n").getResourceBundle().getText('tile.synopticLines'));
                sap.ui.getCore().getModel('session').setProperty('/navBackVisible', true)
                sap.ui.getCore().getModel('session').setProperty('/menuButtonVisible', false);
                sap.ui.getCore().getModel('session').setProperty('/ISPOD', false);

                this.getNavigation().setNavBack('Dashboard');

                const that = this;
               
                

                this.setModel(new JSONModel([]), 'synopticData');
                const data =await API.getLines();
                this.getModel('synopticData').setData(data.map(e => {
                    return {
                        ...e,
                        selectedWorkcenter: ''
                    }
                }));
                console.log(data);
 

            },
            goToLine: function(line) {
                debugger;
                const workcenter = this.getModel('synopticData').getData().find(l => l.workCenter === line).selectedWorkcenter;
                this.navTo('Operator.Sfc', {
                    workcenter: workcenter
                }, false)
            }


        });
    });
