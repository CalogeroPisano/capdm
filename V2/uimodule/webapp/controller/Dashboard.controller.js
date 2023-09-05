sap.ui.define(["com/capgemini/DMUsecase/controller/BaseController"], function (Controller) {
    "use strict";

    return Controller.extend("com.capgemini.DMUsecase.controller.Dashboard", {

        onInit: function () {
            this.attachRoutePatternMatched(this.handleRouteMatched.bind(this), this);
        },

        handleRouteMatched: function (event) {

            if (!this.checkRoute(event, 'Dashboard')) {
                return;
            }
            sap.ui.getCore().getModel('session').setProperty('/title', 'Dashboard');
            sap.ui.getCore().getModel('session').setProperty('/menuButtonVisible', false);
            sap.ui.getCore().getModel('session').setProperty('/navBackVisible', false);

        },
        goToLines:function() {
            this.navTo("Operator.Lines");
        }

        

    });
});
