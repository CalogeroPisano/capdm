sap.ui.define([
], function () {
    'use strict';
    // mettete le function API in comune per il progetto con descrizione della funzione qua pls Calogero 
    const baseURI = "/nodered";
    return {
        /**
        * 
        * @public
        * @param {string} ID Language
        * @param {Number} ID the workcenterID
        * @returns {Array} the result array for header information
        */
        GetWcInformation: async function (language, workcenterID) {
            const oData = await Services.getData({
                query: 'MES/Avvitatori/queries/pod/GetWcInformation',
                params: {
                    'Param.1': language,
                    'Param.2': workcenterID
                },
                showBusy: false
            });
            if (Array.isArray(oData.getData())) {
                return oData.getData().map(w => {
                    return {
                        WORKCENTER: w.WORKSTATION,
                        DESCRIPTION: w.WC_Description,
                        ID: w.ID,
                        ISCONNECTED: w.ISCONNECTED,
                        VIN: w.VIN,
                        RECIPE: w.RECIPE,
                        STD_NAZIONE: w.COUNTRY_STANDARD + ' - ' + w.COUNTRY_STANDARD_DESC,
                        FAMILY: w.FAMILY + ' - ' + w.FAMILY_DESC,
                        MODEL_YEAR: w.MODEL_YEAR,
                        MODEL: w.MODEL + ' - ' + w.MODEL_DESC,
                        LAST_OPERATION: w.STEP,
                        LAST_DATETIME: w.LASTUPDATE,
                        ODP: w.ODP,
                        VINID: w.IDVIN,
                        IDRECIPE: w.IDRECIPE
                    }
                })
            }
            else {
                return [];
            }
        },

        /**
        * 
        * @public
        * @param {string} workCenter workcenter selezionato della linea
        * @returns {Array} the result array of SFC
        */
        getLines: async function () {
            const res = await fetch(baseURI + '/getlines');
            if (res.ok) {
                const body = await res.json();
                return body;
            }
            else {
                window.alert('errore chiamata getLines');
            }
        },
        getSfc: async function (workcenter) {
            const res = await fetch(baseURI + '/getSFC/' + workcenter);
            if (res.ok) {
                const body = await res.json();
                return body;
            }
            else {
                window.alert('errore chiamata getSFC');
            }
        }

    };

});
