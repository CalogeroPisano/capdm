sap.ui.define([
  'sap/ui/model/json/JSONModel'
], function (JSONModel) {
  'use strict';

  return JSONModel.extend('com.capgemini.DMUsecase.model.Session', {
    init: async function () {
      /* const result = await Services.execCall({
        url: '/XMII/PropertyAccessServlet',
        data: {
          Mode: 'List',
          'Content-Type': 'text/json'
        }
      }); */

      
      this.setUserInitials('C');
      this.setUserDisplayName("Calogero Pisano");
      this.setCurrentPage('app', 'DMUsecase');
      this.toggleNavBackButton(false);
      this.setIsPodHeader(false);
      this.setMenuButtonVisible(false);
      if (globalThis.window.name == "") {
        this.setProperty("/Language", 'En');
      } else { this.setProperty("/Language", globalThis.window.name); }
    },

    /**
     * Log off from application
     * @param {Function} callback
     */
    logOff: function (callback) {
      /* Services.execCall({
        url: '/XMII/Illuminator?service=logout',
        dataType: 'html'
      }).then(() => {
        if (typeof callback === 'function') {
          callback();
        }
      }); */
    },


    /**
     * Get all the roles assigned to the user
     */
    getRoles: function () {
      return {};
    },

    /**
     * Get all the roles assigned to the user as array
     */
    getRolesList: function () {
      return []
    },

    /**
     * Get all available workcenters to the user
     *
     * @returns {string} The WORKCENTER attribute
     */
    getWorkcenters: function () {
      return this.getProperty('/WORKCENTER') ?? '';
    },

    /**
     * Get all available workcenters to the user as array
     *
     * @returns {string[]} The WORKCENTER attribute splitted
     */
    getWorkcentersList: function () {
      return this.getWorkcenters().split(';');
    },

    /**
     * Get the MII unique name
     *
     * @returns {string} the uniquename attribute
     */
    getMIIUniqueName: function () {
      return this.getProperty('/uniquename');
    },

    /**
     * Set the user display name.
     * Used in the toolbar user fragment
     */
    setUserDisplayName: function (name) {
      this.setProperty('/userDisplayName', name);
    },


    /**
     * Set the header of the pod.
     * Used in the toolbar user fragment
     */
    setIsPodHeader: function (value) {
      this.setProperty('/ISPOD', value);
    },
    /**
         * Set the menuButton of the pod.
         * Used in the toolbar user xml pod
         */
    setMenuButtonVisible: function (value) {
      this.setProperty('/menuButtonVisible', value);
    },
    /**
     * Set the user initials shown in the toolbar
     * @param {string} value
     */
    setUserInitials: function (value) {
      this.setProperty('/userInitials', value);
    },



    /**
     * Get the available plants of the user
     *
     * @returns {string} the PLANT attribute
     */
    getPlant: function () {
      return this.getProperty('/PLANT');
    },

    /**
     * Get the list of available plants of the user
     *
     * @returns {string[]} The PLANT attribute splitted
     */
    getPlantList: function () {
      return this.getPlant().split(';');
    },

    /**
     * Set the current active plant
     * @param {string} plant
     */
    setCurrentPlant: function (plant) {
      this.setProperty('/currentPlant', plant);
    },

    /**
     * @returns {string} The current active plant
     */
    getCurrentPlant: function () {
      return this.getProperty('/currentPlant');
    },

    /**
     * Set the current active department
     * @param {string} department
     */
    setCurrentDepartment: function (department) {
      this.setProperty('/currentDepartment', department);
    },

    /**
     * @returns {string} The current active department
     */
    getCurrentDepartment: function () {
      return this.getProperty('/currentDepartment');
    },

    /**
     * Get the available department of the user
     *
     * @returns {string} the DEPARTMENT attribute
     */
    getDepartment: function () {
      return this.getProperty('/DEPARTMENT');
    },

    /**
     * Get the list of available departments of the user
     *
     * @returns {string[]} The DEPARTMENT attribute splitted
     */
    getDepartmentList: function () {
      const department = this.getDepartment();

      if (!department) {
        return null;
      }

      return department.split(';');
    },

    getCurrentPage: function () {
      return this.getProperty('/currentPage', page);
    },

    getCurrentPageTitle: function () {
      return this.getProperty('/currentPageTitle', page);
    },

    setCurrentPage: function (page, title) {
      this.setProperty('/currentPage', page);
      this.setProperty('/title', title);
    },

    /**
     * @param {boolean} value toggles the visibility of the button
     */
    toggleNavBackButton: function (value) {
      this.setProperty('/navBackVisible', value);
    },

    /**
     * @param {boolean} value toggles the visibility of the button
     */
    toggleClockoutButton: function (value) {
      this.setProperty('/clockOutButtonVisible', value);
    },

    
  });
});
