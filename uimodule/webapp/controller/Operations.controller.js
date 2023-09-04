sap.ui.define([
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MessageBox',
    'sap/ui/core/mvc/Controller',
    'capgemini/CapgeminiPOD/controller/Library'

], function (jQuery, JSONModel, MessageToast, MessageBox, Controller, Library) {
    "use strict";

    var OperationsController = Controller.extend("capgemini.CapgeminiPOD.controller.Operations", {
 
        onInit: function () {

            this.router = sap.ui.core.UIComponent.getRouterFor(this);
            this.router.attachRoutePatternMatched(this.handleRouteMatched, this);

            var oEventBus = sap.ui.getCore().getEventBus();
            oEventBus.subscribe("MainPod", "updateOperation", this.initOperationsB, this);
            oEventBus.subscribe("MainPod", "updateRowSel", this.updateRowSel, this);

            //this.initOperations();
        },
        onAfterRendering: function () {



        },
        initOperations: function () {
            var data = sap.ui.getCore().getModel().getData()[0].steps;
            var model = new JSONModel(data);
            this.getView().setModel(model);

        },
        initOperationsB: function () {
         
        },
        rowOpSelected: function (event) {
            /*Library.updateLastActionDate(this.user, this.plant);

            var obj = event.getSource();
            var empty = {d: false, w: false};


            var tmpSelectedOp = obj.getBindingContext().getObject();
            sap.ui.getCore().getModel().setProperty("/clickevent",
                    tmpSelectedOp);

            if (tmpSelectedOp === undefined) {
                tmpSelectedOp.isSelected = false;
            }
            tmpSelectedOp.isSelected = tmpSelectedOp.isSelected === true ? false : true;
            if (true === tmpSelectedOp.isSelected) {
                obj.addStyleClass("selectedRow");
                sap.ui.getCore().getModel().setProperty("/operationselected",
                        tmpSelectedOp);
                this.selectedOp = tmpSelectedOp;
            } else {
                obj.removeStyleClass("selectedRow");
                this.selectedOp = empty;
                sap.ui.getCore().getModel().setProperty("/operationselected",
                        null);
            }
            var operations = this.getView().getModel().getData();

            //var operations = this.operationsModel.getProperty("/operations");
            for (var oi = 0, coi; oi < operations.length; oi++) {
                coi = operations[oi];
                if (coi.id !== tmpSelectedOp.id) {
                    coi.isSelected = false;
                }
            }

            var tab1 = this.getView().byId("tab1");

            var items = tab1.getItems();

            for (var i = 0, cobj; i < items.length; i++) {
                cobj = items[i];
                if (cobj.getId() !== obj.getId()) {
                    cobj.removeStyleClass("selectedRow");
                }
            }

            this.getView().getModel().refresh(true);*/
        },
        updateRowSel: function () {
            /*var oView = this.getView();
            this.clickEvent = sap.ui.getCore().getModel().getData().clickevent;
*/
        },
        getSelectedOp: function () {
            return this.selectedOp;
        },
        refreshSelection: function () {
            /*Library.updateLastActionDate(this.user, this.plant);

            var tab1 = this.getView().byId("tab1");
            var items = tab1.getItems();

            for (var i = 0, cobj, modelObj; i < items.length; i++) {
                cobj = items[i];
                modelObj = cobj.getBindingContext("ops").getObject();
                if (modelObj.isSelected === true) {
                    cobj.addStyleClass("selectedRow");
                    break;
                }
            }*/
        },
        handleRouteMatched: function (oEvent) {
            if (!this._checkRoute(oEvent, "mainpod")) {
                return;
            }

            this.initOperations();
        },
        _checkRoute: function (evt, pattern) {
            if (evt.getParameter("name") !== pattern) {
                return false;
            }

            return true;
        },
        update: function () {

            if (typeof sap.ui.getCore().getModel().getData().informations != null) {
                this.getView().setModel(this.initOperations());


            } else {
                alert("error");
            }
        },
    });

    return OperationsController;

});
