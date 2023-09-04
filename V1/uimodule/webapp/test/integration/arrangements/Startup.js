sap.ui.define(["sap/ui/test/Opa5"],
    /**
     * @param {typeof sap.ui.test.Opa5} Opa5 
     */
    function (Opa5) {
        "use strict";

        return Opa5.extend("capgemini.CapgeminiPOD.test.integration.arrangements.Startup", {
            iStartcapgemini.CapgeminiPOD: function () {
                this.iStartMyUIComponent({
                    componentConfig: {
                        name: "capgemini.CapgeminiPOD",
                        async: true,
                        manifest: true
                    }
                });
            }
        });
    });
