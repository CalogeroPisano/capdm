sap.ui.define(["com/capgemini/DMUsecase/controller/BaseController", 'sap/ui/model/json/JSONModel', "com/capgemini/DMUsecase/model/Utils", "com/capgemini/DMUsecase/api/api", "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"],
    function (Controller, JSONModel, Utils, API, Filter, FilterOperator) {
        "use strict";
        var PodHeaderController = undefined;
        return Controller.extend("com.capgemini.DMUsecase.controller.pod.Pod", {

            onInit: function () {
                this.attachRoutePatternMatched(this.handleRouteMatched.bind(this), this);
            },

            handleRouteMatched: function (event) {
                //controllare perchè chiama due volte risolto perchè l'header ha lo stesso controller
                if (!this.checkRoute(event, 'Operator.Pod')) {
                    return;
                }

                PodHeaderController = Utils.getInstance('Pod.PodHeader');
                const sfc = event.getParameter("arguments").sfc;
                sap.ui.getCore().getModel('session').setProperty('/ISPOD', true);
                const that = this;


                
                this.setModel(new JSONModel([]), 'podData')

            },
         

            

            
           
           

           
           



        });
    });
