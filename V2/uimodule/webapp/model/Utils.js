sap.ui.define([
], function() {
  'use strict';

	return  {
    instances: [],

    setInstance(name, instance) {
      if (this.instances.map(i => i.name).includes(name)) {
        return;
      }

      this.instances.push({ name, instance });
    },

    getInstance(name) {
      const element = this.instances.find(i => i.name === name);

      if (!element) {
        return null;
      }

      return element.instance;
    }
	};
});
