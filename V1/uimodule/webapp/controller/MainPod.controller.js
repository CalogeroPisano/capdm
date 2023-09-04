sap.ui.define([
    'jquery.sap.global',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast',
    'sap/m/MessageBox',
    'sap/ui/core/routing/History',
    'sap/ui/core/mvc/Controller',
    'capgemini/CapgeminiPOD/controller/Library'

], function (jQuery, JSONModel, MessageToast, MessageBox, History, Controller, Library) {
    "use strict";
    var MainPodController = Controller.extend("capgemini.CapgeminiPOD.controller.MainPod", {


        onInit: function () {
             this.router = sap.ui.core.UIComponent.getRouterFor(this);
             this.router.attachRoutePatternMatched(this.handleRouteMatched, this);
        },
        handleRouteMatched: function (oEvent) {
            if (!this._checkRoute(oEvent, "mainpod")) {
                return;
            }

            this.initPod();
        },
        _checkRoute: function (evt, pattern) {
            if (evt.getParameter("name") !== pattern) {
                return false;
            }

            return true;
        },
        initPod: function () {
            var that = this;
            async function logJSONData() {
                var data = sap.ui.getCore().getModel().getData()[0];
                data.user = 'marcobarat';
                data.workcenter = data.steps[0].plannedWorkCenter;
                data.material = data.material.material + " - " + data.material.description;
                var model = new JSONModel(data);
                that.getView().setModel(model);
                console.log(jsonData);
              };
              logJSONData();
        },
        onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteMainView", {}, true);
			}
		}
        
    });
    return MainPodController;
});
