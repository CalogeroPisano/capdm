sap.ui.define([
  "sap/ui/test/opaQunit",
  // "./pages/Main",
  "./pages/Main"
],
/**
 * @param {typeof sap.ui.test.opaQunit} opaTest 
 */
function (opaTest) {
  "use strict";

  opaTest("Should see the page", function (Given, When, Then) {

    // Arrangements
    Given.iStartcapgemini.CapgeminiPOD();

    // Actions
    // When.onTheMainPage.iPressTheButton();

    // Assertions
    Then.onTheMainPage.iShouldSeeTheTitle();

    // Cleanup
    Then.iTeardowncapgemini.CapgeminiPOD();
  });

});
