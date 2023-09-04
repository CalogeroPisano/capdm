sap.ui.define([
  'sap/ui/model/json/JSONModel',
], function(JSONModel) {
  'use strict';

  return JSONModel.extend('com.capgemini.DMUsecase.model.Pollings', {
    pollingsEnabled: true, // CHANGE THIS TO TOGGLE POLLINGS

    init: function() {
      this.setProperty('/pollings', []);
    },

    addPolling(name, duration, callback = () => {}, instant = false) {
      if (!this.pollingsEnabled) {
        return;
      }

      if (instant) {
        callback();
      }

      const id = setInterval(callback, duration);

      const pollings = this.getProperty('/pollings');
      pollings.push({ name, id });

      this.setProperty('/pollings', pollings);
    },

    removePolling(name) {
      if (!this.pollingsEnabled) {
        return;
      }
      let pollings = this.getProperty('/pollings');

      const polling = pollings.find(p => p.name === name);

      if (polling) {
        this._clearInterval(polling.id);

        pollings = pollings.filter(p => p.name === name);

        this.setProperty('/pollings', pollings);
      }
    },

    removePollingByName(name){
      if (!this.pollingsEnabled) {
        return;
      }
      let pollings = this.getProperty('/pollings');

      const polling = pollings.find(p => p.name === name);

      console.log(polling);

      if (polling) {
        this._clearInterval(polling.id);

        pollings = pollings.filter(p => p.name != name);

        this.setProperty('/pollings', pollings);
      }
    },

    deleteAllPollings() {
      if (!this.pollingsEnabled) {
        return;
      }
      const pollings = this.getProperty('/pollings');

      if (!Array.isArray(pollings)) {
        return;
      }

      pollings.forEach(p => {
        this._clearInterval(p.id);
      });

      this.setProperty('/pollings', []);
    },

    getPolling(name) {
      return this.getProperty('/pollings').find(p => p.name === name);
    },

    _clearInterval(id) {
      clearInterval(id);
    }
  });
});
