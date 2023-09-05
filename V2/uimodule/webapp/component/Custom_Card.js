sap.ui.define([
    "sap/ui/core/Control",
    "sap/f/Card",
    "sap/f/CardRenderer"
],
    function (Control, Card, CardRenderer) {
        "use strict";

        return Card.extend("com.capgemini.DMUsecase.component.Custom_Card", {

            metadata: {
                properties: {
                    color: {
                        type: "string",
                        defaultValue: ""
                    }
                },
                events: {
                    press: {
                        parameters: {
                            "oEvent": { type: "object", defaultValue: null }
                        },
                    }
                }

            },

            ontap: function (oEvent) {
                this.firePress({
                    oEvent: oEvent.srcControl
                });
            },

            init: function () {
                Card.prototype.init.call(this);

            },

            renderer: function (oRm, oCard) {

                if (oCard.getColor() != "") {
                    oRm.style("border", "5px solid " + oCard.getColor());
                }
                //renderizzo la car usando il metodo standard
                CardRenderer.render(oRm, oCard);
            }

        });
    });