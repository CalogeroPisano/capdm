sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'capgemini/CapgeminiPOD/controller/Library'
], function (jQuery, MessageToast, Controller, JSONModel, Library) {
    "use strict";

    var MachineController = Controller.extend("capgemini.CapgeminiPOD.controller.Machine", {
        mainModel: null,
        myModel: new JSONModel({}),
        user: null,
        plant: 1,
        repartoid: null,
        AREA: null,
        modelArea: new JSONModel({}),

        onInit: function () {
            /*this.user = jQuery.sap.getUriParameters().get("CID");
            this.repartoid = jQuery.sap.getUriParameters().get("repartoid");

            if (this.user == null || typeof this.user == "undefined") {
                MessageToast.show("Violate regole di sicurezza.");
                return;
            }
            if (this.repartoid == null || typeof this.repartoid == "undefined") {
                MessageToast.show("Violate regole di sicurezza.");
                return;
            } */
            this.getView().setModel(this.modelArea, "modelArea");

            this.router = sap.ui.core.UIComponent.getRouterFor(this);
            this.router.attachRoutePatternMatched(this.handleRouteMatched, this);




        },
        handleRouteMatched: function (oEvent) {
            if (!this._checkRoute(oEvent, "machine")) {
                return;
            }

            this.update();
        },
        _checkRoute: function (evt, pattern) {
            if (evt.getParameter("name") !== pattern) {
                return false;
            }

            return true;
        },
        update: function () {
            this.initTiles();
        },
        initTiles: function () {
            Library.updateLastActionDate(this.user, this.plant);

            //var transactionName = "XAC_GetAllWorkcenterByTypeAndUsername";
            var transactionName = "getWorkcenters";

          
            //var input = "&plant=1&type=A&user=" + this.user;
            var link = "https://93.51.24.194:1880/api/" + transactionName /*+ input + "?Content-Type=text/json" */;

            //link = "model/machinesArea" + String(this.AREA) + ".json";

            Library.AjaxCallerData(link, this.SUCCESSInitTiles.bind(this), this.FAILUREInitTiles.bind(this));
        },
        SUCCESSInitTiles: function (Jdata) {
            this.myModel.setData(JSON.parse(Jdata));

            //this.myModel.setData(JSON.parse(Jdata));
            this.getView().setModel(this.myModel);
        },
        FAILUREInitTiles: function (err) {
            console.log(err);
            alert("error");
        },
        navToShoporder: function (event) {
            this.myModel = new JSONModel();

            var str = event.mParameters.id;
            if (str.length > 0) {
                var veryl = str.length;
                var cont = "container-";
                var num = str.search("container-");
                var len = cont.length;
                var res = str.substring(len + num, veryl);
                this.myModel.setProperty("/workcenter", {
                    "workcenter": this.getView().getModel().getData()[res].Workcenter,
                    "id": this.getView().getModel().getData()[res].ID,
                    "typemachine": this.getView().getModel().getData()[res].Type,
                    "description": this.getView().getModel().getData()[res].Description,
                    "user": this.user,
                    "plant": this.plant
                });
                sap.ui.getCore().setModel(this.myModel);
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                Library.updateLastActionDate(this.user, this.plant);
                oRouter.navTo("shoporder", true);
            } else
                alert("errore");
        },
        navToMain: function () {
            window.location.href = "../main/index.html";
        }
    });

    return MachineController;

});