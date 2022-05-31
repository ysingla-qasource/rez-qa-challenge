import {MainHubPage} from "../../support/pages"
import {SITE_URLS} from "../../support/urls"

/**
 * This test case has covered all the checkpoints related to story two
 * I have used { waitForAnimations: false } to click "filters" button due to scroll animations happening
 * in the page and that is causing test case flakiness. So to remove that flakiness i used { waitForAnimations: false }
 */
describe('Filter property', () => {
  beforeEach(() => {

    // Visit vacation rentals page
    cy.visit(SITE_URLS.hubTestVacationRentals)
  })

  // These test cases created as per current data available under demo application as prerequisite
  let propertiesWithSixBedrooms = ["Megan's Loft", "Modern Mansion", "VRM Jonathan's Chateau"];
  let propertiesWithSixBathrooms = "Eutopia";
  let propertiesWithSixBedroomsAndFiveBathrooms = "Modern Mansion";

  let totalPropertiesCountInApplication = "37";
  let propertiesCountWithSixBedrooms = "3";
  let propertiesCountWithSixBathrooms = "1";
  let propertiesCountWithSixBedroomsAndFiveBathrooms = "1";

  it('User can be filter the property based on the number of bedrooms', () => {
    
    // Click on filters button
    cy.get(MainHubPage.selectors.filterToggleButton).click({ waitForAnimations: false });

    let minimumBedrooms = 6;

    // Increase no. of bedrooms
    for (let bedroom = 1; bedroom <= minimumBedrooms; bedroom++) {
      cy.get(MainHubPage.selectors.bedroomIncreaseButton).click();
    }

    // Click view results button and verify property results as criteria 
    cy.get(MainHubPage.selectors.viewResultsButton).click();
    cy.get(MainHubPage.selectors.resultsCountText).should("have.text", propertiesCountWithSixBedrooms + " Results");

    propertiesWithSixBedrooms.forEach(property => {
      cy.get(`[aria-label$="${property}"]`).should('exist');    
    })
    cy.get(MainHubPage.selectors.searchedPropertyResults).should('have.length', propertiesCountWithSixBedrooms)
  })

  it('User can be filter the property based on the number of bathrooms', () => {
    
    // Click on filters button
    cy.get(MainHubPage.selectors.filterToggleButton).click({ waitForAnimations: false });

    let minimumBathrooms = 6;

    // Increase no. of bathrooms
    for (let bathroom = 1; bathroom <= minimumBathrooms; bathroom++) {
      cy.get(MainHubPage.selectors.bathroomIncreaseButton).click();
    }

    // Click view results button and verify property results as criteria 
    cy.get(MainHubPage.selectors.viewResultsButton).click();
    cy.get(MainHubPage.selectors.resultsCountText).should("have.text", propertiesCountWithSixBathrooms + " Results");
    cy.get(`[aria-label$="${propertiesWithSixBathrooms}"]`).should('exist');    
    cy.get(MainHubPage.selectors.searchedPropertyResults).should('have.length', propertiesCountWithSixBathrooms)
  })

  it('User can be filter the property based on the number of bedrooms and bathrooms', () => {   
    
    cy.get(MainHubPage.selectors.filterToggleButton).click({ waitForAnimations: false });

    let minimumBedrooms = 6;
    let minimumBathrooms = 5;

    // Increase no. of bedrooms and bathrooms

    for (let bedroom = 1; bedroom <= minimumBedrooms; bedroom++) {
      cy.get(MainHubPage.selectors.bedroomIncreaseButton).click();
    }

    for (let bathroom = 1; bathroom <= minimumBathrooms; bathroom++) {
      cy.get(MainHubPage.selectors.bathroomIncreaseButton).click();
    }

    // Click view results button and verify property results as criteria 
    cy.get(MainHubPage.selectors.viewResultsButton).click();
    cy.get(MainHubPage.selectors.resultsCountText).should("have.text", propertiesCountWithSixBedroomsAndFiveBathrooms + " Results");
    cy.get(`[aria-label$="${propertiesWithSixBedroomsAndFiveBathrooms}"]`).should('exist');    
    cy.get(MainHubPage.selectors.searchedPropertyResults).should('have.length', propertiesCountWithSixBedroomsAndFiveBathrooms)
  })

  it('User can reset both filters to their lower value on clicking Clear Filters button', () => {
    
    // Click on filters button
    cy.get(MainHubPage.selectors.filterToggleButton).click({ waitForAnimations: false });

    let minimumBedrooms = 2;
    let minimumBathrooms = 2;

    // Increase no. of bedrooms and bathrooms
    for (let bedroom = 1; bedroom <= minimumBedrooms; bedroom++) {
      cy.get(MainHubPage.selectors.bedroomIncreaseButton).click();
    }

    for (let bathroom = 1; bathroom <= minimumBathrooms; bathroom++) {
      cy.get(MainHubPage.selectors.bathroomIncreaseButton).click();
    }

    // Verify count of bedrooms and bathrooms after increment
    cy.get(MainHubPage.selectors.minimumBedroomCountText).should("have.text", "2");
    cy.get(MainHubPage.selectors.minimumBathroomCountText).should("have.text", "2");

    // Close cookie popup which is coming on clear filter button
    cy.get("body").then($body => {
      if ($body.find(MainHubPage.selectors.cookieBannerCloseButton).length > 0) {
        cy.get(MainHubPage.selectors.cookieBannerCloseButton).click();
      }
    })

    // Click on clear filter button to reset both filters to their lower value and verify it displayed 0 for both the filters
    cy.get(MainHubPage.selectors.clearFiltersButton).click();
    cy.get(MainHubPage.selectors.minimumBedroomCountText).should("have.text", "0");
    cy.get(MainHubPage.selectors.minimumBathroomCountText).should("have.text", "0");

    // Click view results button and verify all the properties are showing after reset both the filters
    cy.get(MainHubPage.selectors.viewResultsButton).click();
    cy.get(MainHubPage.selectors.resultsCountText).should("have.text", totalPropertiesCountInApplication + " Results");
  })
})
