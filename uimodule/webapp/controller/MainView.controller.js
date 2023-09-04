sap.ui.define(["capgemini/CapgeminiPOD/controller/BaseController","sap/ui/model/json/JSONModel",
], function (Controller,JSONModel) {
    "use strict";

    return Controller.extend("capgemini.CapgeminiPOD.controller.MainView", {
        onInit: function (){
            var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("RouteMainView").attachPatternMatched(this.handleRouteMatched, this);
        },
        handleRouteMatched: function (oEvent) {
            if (!this._checkRoute(oEvent, "RouteMainView")) {
                return;
            }

            this.initSFC(oEvent);
        },
        _checkRoute: function (evt, pattern) {
            if (evt.getParameter("name") !== pattern) {
                return false;
            }

            return true;
        },
        initSFC: function (oEvent) {
            var that = this;
            var wc = window.decodeURIComponent(oEvent.getParameter("arguments").workCenter);
            async function logJSONData() {
                const response = await fetch("http://localhost:1881/getSFC/"+wc);
                const jsonData = await response.json();
                var model = new JSONModel(jsonData)
                that.getView().setModel(model,'TileModel');
                console.log(jsonData);
              };
              logJSONData();
        },
        press: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var data = [];
            data.push(oEvent.getSource().getBindingContext('TileModel').getObject());
            var model = new JSONModel(data);
            sap.ui.getCore().setModel(model);
            oRouter.navTo("mainpod", true);
        }
        

    });
});
