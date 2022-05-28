import {MainHubPage} from "../../support/pages"
import {SITE_URLS} from "../../support/urls"
/**
 * This test case has covered all the checkpoints related to story one
 * To avoid test case flakiness due to auto scrolling we have turn scrollBehavior to false
 */
describe('Save property as favourite', () => {
  beforeEach(() => {

    // Visit vacation rentals page    
    cy.visit(SITE_URLS.hubTestVacationRentals)
  })
  
  it('As a user I can save property as favorite to review later',{ scrollBehavior: false }, () => {
    
    // This property should exist under portal.
    let propertyName = ".Christian Test 11";
    
    // Click on favorite button to save the property and verify favorite icon should checked
    cy.get(`[aria-label="Save as favorite ${propertyName}"]`).click();
    cy.get(`[aria-label="Save as favorite ${propertyName}"][aria-checked="true"]`).should('exist');

    // Verify favorite indicator should show the total count of saved properties
    cy.get(MainHubPage.selectors.savedPropertyCount).should("have.text", "(1)");    

    // Click favorite indicator button and verify saved properties should exists   
    cy.get(MainHubPage.selectors.favoriteToggleButton).click();
    cy.get(MainHubPage.selectors.resultsCountText).should("have.text", "1 Results");
    cy.get(`[aria-label="Save as favorite ${propertyName}"]`).should('exist');
    cy.get(MainHubPage.selectors.searchedPropertyResults).should('have.length', 1)

    // Click on saved property to open detail’s view and verify an indicator showing the property has been saved.
    cy.get(`[alt^="Image for ${propertyName}"]`).click();
    cy.get(MainHubPage.selectors.saveAsFavoriteButtonText).should("have.text", "Saved");

    // Click on the saved property indicator to unsave the property and verify save button text
    cy.get(`[aria-label="Save as favorite ${propertyName}"]`).click();
    cy.get(MainHubPage.selectors.saveAsFavoriteButtonText).should("have.text", "Save");

    // Visit vacation rentals page
    cy.visit(SITE_URLS.hubTestVacationRentals)

    // Verify total saved count on the main hub after unsave the property and favorite button on property should unchecked
    cy.get(MainHubPage.selectors.savedPropertyCount).should("have.text", "(0)");
    cy.get(`[aria-label="Save as favorite ${propertyName}"][aria-checked="false"]`).should('exist');
  })
})
