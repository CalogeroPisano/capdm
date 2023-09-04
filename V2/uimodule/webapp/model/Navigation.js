sap.ui.define([
  'sap/ui/model/json/JSONModel',
], function(JSONModel) {
  'use strict';

  return JSONModel.extend('com.capgemini.DMUsecase.model.Navigation', {
    init: function() {
      this.setNavBack('appHome', {}, true);
      this.setNavBackCallback(null);
    },

    setNavBack: function(name, params = {}, force = false) {
      this.setProperty('/navBackRoute', name);
      this.setProperty('/navBackParams', params);
      this.setProperty('/navBackForce', force);
    },

    setNavBackCallback: function(callback) {
      if (typeof callback !== 'function') {
        return;
      }

      this.setProperty('/callback', callback);
    }
  });
});
