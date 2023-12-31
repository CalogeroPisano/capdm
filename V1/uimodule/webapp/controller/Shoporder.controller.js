sap.ui.define([
    'jquery.sap.global',
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/core/routing/History',
    'sap/m/Dialog',
    'sap/ui/core/Fragment',
    'capgemini/CapgeminiPOD/controller/Library'
], function (jQuery, MessageToast, Controller, JSONModel, History, Dialog, Fragment, Library) {
    "use strict";
    var ShoporderController = Controller.extend("capgemini.CapgeminiPOD.controller.Shoporder", {
        _oDialog: null,
        shopOrderModel: new JSONModel({}),
        shopOrderMenuModel: new JSONModel({}),
        workcenterid: null,
        workcenter: null,
        shoporderid: null,
        material: null,
        sfc: null,
        qty: null,
        qtydone: null,
        enabled: null,
        shoporder: null,
        resource: null,
        resourceid: null,
        plantid: null,
        user: null,
        transportModel: null,
        shopOrderMenu: null,
        BusyDialog: new sap.m.BusyDialog(),
        button: null,
        AREA: null,
        oDialog: null,
        IDTile: null,
        modelInfo: new JSONModel(),
        modelBom: new JSONModel(),
        state: null,
        _actionSheet: null,
        onInit: function () {

            this.router = sap.ui.core.UIComponent.getRouterFor(this);
            this.router.attachRoutePatternMatched(this.handleRouteMatched, this);
            if (typeof sap.ui.getCore().getModel().getData().workcenter === null) {
                alert("error");
            }
        },
        initShoporder: function () {
            this.AREA = jQuery.sap.getUriParameters().get("AREA");
            var link;

            this.workcenter = sap.ui.getCore().getModel().getData().workcenter.workcenter;
            this.workcenterid = sap.ui.getCore().getModel().getData().workcenter.id;
            this.plantid = sap.ui.getCore().getModel().getData().workcenter.plant;
            this.user = sap.ui.getCore().getModel().getData().workcenter.user;
            var transactionName = "getOrders";
            Library.updateLastActionDate(this.user, this.plantid);
            link = "https://93.51.24.194:1880/api/" + transactionName + "/" + this.workcenterid;


            //link = "model/fakeShopOrders" + String(Math.floor(Math.random() * 4) + 1) + ".json";
            Library.updateLastActionDate(this.user, this.plantid);
            Library.AjaxCallerData(link, this.SUCCESSInitShoporder.bind(this), this.FAILUREInitShoporder.bind(this));
        },
        SUCCESSInitShoporder: function (Jdata) {
            this.shopOrderModel.setData(JSON.parse(Jdata));
            this.getView().setModel(this.shopOrderModel);
        },
        FAILUREInitShoporder: function () {
            alert("error");
        },
        handleRouteMatched: function (oEvent) {
            if (!this._checkRoute(oEvent, "shoporder")) {
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
            if (typeof sap.ui.getCore().getModel().getData().workcenter !== null) {
                this.initShoporder();
            } else {
                alert("error");
            }
        },
        onNavBack: function () {
            var newModel = new JSONModel();
            this.getView().setModel(newModel);
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("machine", true);
        },
        onExit: function () {
            if (this._oDialog) {
                this._oDialog.close();
            }
        },
        apriDialog: function (event) {

            this.IDTile = this.shopOrderModel.getProperty(event.getSource().getBindingContext().getPath()).ID;
            this.state = this.shopOrderModel.getProperty(event.getSource().getBindingContext().getPath()).status;
            switch (this.state) {
                case "INPAUSE":
                    this.state = "Pausa";
                    break;
                case "INWORK":
                    this.state = "Start";
                    break;
                case "COMPLETED":
                    this.state = "Completa";
                    break;
            }
            this.getPhase(event);
//            var oButton = event.getSource();
//            // create action sheet only once
//            if (!this._actionSheet) {
//                this._actionSheet = sap.ui.xmlfragment(
//                        "capgemini.CapgeminiPOD.view.PodInfoMenu",
//                        this
//                        );
//                this.getView().addDependent(this._actionSheet);
//            }
//
//            this._actionSheet.openBy(oButton);
//        },
            this.button = event.getSource();

            var link = (this.AREA === "2" || this.AREA === "3") ? "model/menuShopOrdersInactive.json" : "model/menuShopOrders.json";
            Library.AjaxCallerData(link, this.SUCCESSApriDialog.bind(this), this.FAILUREApriDialog.bind(this));
        },
        SUCCESSApriDialog: function (Jdata) {
            if (!this.shopOrderMenu) {
                this.shopOrderMenu = sap.ui.xmlfragment("capgemini.CapgeminiPOD/view/menuShopOrders", this);
                this.getView().addDependent(this.shopOrderMenu);
            }
            var eDock = sap.ui.core.Popup.Dock;
            this.shopOrderMenu.open(this._bKeyboard, this.button, eDock.BeginTop, eDock.BeginMiddle, this.button);
            Library.updateLastActionDate(this.user, this.plantid);

            var menu = sap.ui.getCore().byId("menuID");
            menu.destroyItems();
            menu = this.fillMenu(menu, Jdata);
        },
        FAILUREApriDialog: function () {
            alert("error");
        },
        fillMenu: function (menu, json) {
            for (var key in json) {
                var item = new sap.ui.unified.MenuItem({text: json[key].name, enabled: json[key].isActive});
                if (json[key].subMenu) {
                    var subMenu = new sap.ui.unified.Menu();
                    subMenu = this.fillMenu(subMenu, json[key].subMenu);
                    item.setSubmenu(subMenu);
                }
                menu.addItem(item);
            }
            return menu;
        },
        discriminator: function (event) {
            var selection = event.getParameter("item");
            var itemText = selection.getProperty("text");
            if (!selection.getSubmenu()) {
                this.transportModel = new JSONModel();
                switch (itemText) {
                    case 'Vai a POD':
                        this.goToPod();
                        break;
                    case 'Informazioni':
                        this.showInfo();
                        break;
                }
            }
//            var itemText = event.getSource().getText();
//            switch (itemText) {
//                case 'Vai a POD':
//                    this.goToPod();
//                    break;
//                case 'Informazioni':
//                    this.showInfo();
//                    break;
//            }
        },
        goToPod: function (event) {
            sap.ui.getCore().getModel().setProperty("/informations", {
                "workcenter": this.workcenter,
                "workcenterid": this.workcenterid,
                "qty": this.qty,
                "qtydone": this.qtydone,
                "user": this.user,
                "shoporderid": this.shoporderid,
                "plant": this.plantid,
                "shoporder": this.shoporder,
                "resourceid": this.resourceid,
                "resource": this.resource,
                "sfc": this.sfc,
                "material": this.material,
                "ena": this.enabled,
                "state": this.state,
                "startButton": false,
                "pausaButton": false,
                "completaButton": false,
                "setupButton": false

            });
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //Library.updateLastActionDate(this.user, this.plantid);
            oRouter.navTo("mainpod", true);
        },
        showInfo: function () {
            var oView = this.getView();
            this.oDialog = oView.byId("infoODP");
            if (!this.oDialog) {
                this.oDialog = sap.ui.xmlfragment(oView.getId(), "capgemini.CapgeminiPOD.view.infoODP", this);
                oView.addDependent(this.oDialog);
            }
            var link = "/XMII/Runner?Transaction=iGuzzini/Transaction/GetShopOrderInfo&orderID=" + this.IDTile + "&Content-Type=text/xml&OutputParameter=output";
            this.oDialog.open();
            this.oDialog.setBusy(true);
            Library.AjaxCallerData(link, this.SUCCESSInfo.bind(this), this.FAILUREInfo.bind(this), "xml");
        },
        SUCCESSInfo: function (Jdata) {
            var data, time;
            for (var key in Jdata[0]) {
                if (key.indexOf("date") > -1) {
                    data = Jdata[0][key].split("T")[0].split("-").reverse().join("-");
                    time = Jdata[0][key].split("T")[1];
                    Jdata[0][key] = data + ", " + time;
                }
            }
            this.modelInfo.setData(Jdata);
            this.modelBom.setData(Jdata[0].BOM);
            this.getView().setModel(this.modelInfo, "modelInfo");
            this.getView().setModel(this.modelBom, "modelBOM");
            this.oDialog.setBusy(false);
            Library.RemoveClosingButtons(this.getView().byId("TabContainer"));
        },
        FAILUREInfo: function () {
            this.oDialog.setBusy(false);
            this.oDialog.close();
        },
        destroyDialog: function () {
            this.oDialog.destroy();
        },
        getPhase: function (oEvent) {
            var oModel = new JSONModel();
            var str = oEvent.mParameters.id;
            if (str.length > 0) {
                var veryl = str.length;
                var cont = "container-";
                var num = str.search("container-");
                var len = cont.length;
                var res = str.substring(len + num, veryl);
                var transactionName = "XAC_GetAllShopOrderPhase";
                var that = this;
                var site = "iGuzzini";
                var input = "&plant=" + this.getView().getModel().getData()[res].PlantID + "&shoporderid=" + this.getView().getModel().getData()[res].ID;
                var transactionCall = site + "/XACQuery" + "/" + transactionName;
                this.shoporderid = this.getView().getModel().getData()[res].ID;
                this.enabled = this.getView().getModel().getData()[res].enabled;
                this.shoporder = this.getView().getModel().getData()[res].ShopOrder;
                this.resourceid = this.getView().getModel().getData()[res].Resid;
                this.resource = this.getView().getModel().getData()[res].Resource;
                this.sfc = this.getView().getModel().getData()[res].Sfc;
                this.qty = this.getView().getModel().getData()[res].QtyReleased;
                this.qtydone = this.getView().getModel().getData()[res].QtyDone;
                this.material = this.getView().getModel().getData()[res].Material;
                /*jQuery.ajax({
                    url: "/XMII/Illuminator?QueryTemplate=" + transactionCall + input + "&Content-Type=text/json",
                    method: "GET",
                    async: false,
                    success: function (oData) {

                        oModel.setData(oData.Rowsets.Rowset[0].Row);
                    },
                    error: function (oData) {
                        that.error(oData);
                    }
                });*/
                /*sap.ui.getCore().getModel().setProperty("/phase", {
                 "stepid": this.getView().getModel().getData()[0].stepid,
                 "plant": this.plant
                 }); */

                return oModel;
            }
        },
        navToMain: function () {
            window.location.href = "../main/index.html";
        }


    });
    return ShoporderController;
});