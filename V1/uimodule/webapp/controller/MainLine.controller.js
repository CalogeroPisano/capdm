sap.ui.define([
"capgemini/CapgeminiPOD/controller/BaseController",
"sap/ui/model/json/JSONModel",
"sap/ui/core/Fragment",
"sap/m/MessageToast",
"sap/m/MenuItem",
"sap/ui/core/Popup"

], function (Controller,JSONModel,Fragment, MessageToast, MenuItem, Popup) {
    "use strict";

    return Controller.extend("capgemini.CapgeminiPOD.controller.MainLineView", {
        _menu: null,
        onInit: function (){

            this.router = sap.ui.core.UIComponent.getRouterFor(this);
            this.router.attachRoutePatternMatched(this.handleRouteMatched, this);
  
        },
        handleRouteMatched: function (oEvent) {
            if (!this._checkRoute(oEvent, "mainline")) {
                return;
            }

            this.initSFC();
        },
        _checkRoute: function (evt, pattern) {
            if (evt.getParameter("name") !== pattern) {
                return false;
            }

            return true;
        },
        initSFC: function () {
            var that = this;
            async function logJSONData() {
                const response = await fetch("http://localhost:1880/getLines");
                const jsonData = await response.json();
                var model = new JSONModel(jsonData)
                that.getView().setModel(model,'LineModel');
                console.log(jsonData);
              };
              logJSONData();
        },
        onPressz: function () {
            var oView = this.getView(),
                oButton = oView.byId("button");
            var that = this;
            if (!this._oMenuFragment) {
                this._oMenuFragment = Fragment.load({
                    id: oView.getId(),
                    name: "capgemini.CapgeminiPOD.view.Workcenter",
                    controller: this
                }).then(function(oMenu) {
                    async function getWC() {
                        const response = await fetch("http://localhost:1880/geWcs/LINEA1");
                        const jsonData = await response.json();
                        var model = new JSONModel(jsonData)
                        that._oMenuFragment.setModel(model,'workcenter');
                        console.log(jsonData);
                      };
                      getWC();
                    oMenu.openBy(oButton);
                    this._oMenuFragment = oMenu;
                    return this._oMenuFragment;
                }.bind(this));
            } else {
                this._oMenuFragment.openBy(oButton);
            }
        },
        press: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var data = [];
            data.push(oEvent.getSource().getBindingContext('LineModel').getObject());
            var model = new JSONModel(data);
            sap.ui.getCore().setModel(model);
            oRouter.navTo("mainpod", true);
        },
        onPress: function () {
            var oView = this.getView(),
                oButton = oView.byId("button");

            if (!this._oMenuFragment) {
                this._oMenuFragment = Fragment.load({
                    id: oView.getId(),
                    name: "capgemini.CapgeminiPOD.view.Workcenter",
                    controller: this
                }).then(function(oMenu) {
                    oMenu.openBy(oButton);
                    this._oMenuFragment = oMenu;
                    return this._oMenuFragment;
                }.bind(this));
            } else {
                this._oMenuFragment.openBy(oButton);
            }
        },
        onMenuAction: function(oEvent) {
            var oItem = oEvent.getParameter("item"),
                sItemPath = "";

            while (oItem instanceof MenuItem) {
                sItemPath = oItem.getText() + " > " + sItemPath;
                oItem = oItem.getParent();
            }

            sItemPath = sItemPath.substr(0, sItemPath.lastIndexOf(" > "));

            MessageToast.show("Action triggered on item: " + sItemPath);

            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteMainView", {
				workCenter: sItemPath
			});
        }
        

    });
});
