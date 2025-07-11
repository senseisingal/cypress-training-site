import FrameTab from "../e2e/pageObjects/FrameTab.js";

describe("Frame Test Suite", () => {
  it("tests an embedded frame", () => {
    const frameTabPage = new FrameTab();
    cy.visit("http://127.0.0.1:5500/");
    frameTabPage.navigateToFrameTab();
    frameTabPage.validateFrameTab();
    frameTabPage.enterHobby("Cricket");
  });

  it("tests something else", ()=> {
      const frameTabPage1 = new FrameTab()
      cy.visit("http://127.0.0.1:5500/")
      frameTabPage1.navigateToFrameTab()
      frameTabPage1.validateFrameTab()
      frameTabPage1.enterCreditCardNumber("1234567890123456")

  })

  it("tests frame within a frame", () => {
    cy.visit("http://127.0.0.1:5500/");
    cy.get("#tab-frames").click();
    cy.get('[data-test-id="iframe-outer"]') // outer iframe
      .should("exist")
      .its("0.contentDocument")
      .should("exist") // outer doc
      .its("body")
      .should("not.be.undefined")
      .then(cy.wrap) // wrap outer body
      .within(() => {
        // Find the nested iframe once it's present inside outer frame
        cy.get('[data-test-id="iframe-inner"]') // give it extra time
          .should("exist")
          .then(($innerIframe) => {
            const innerDoc = $innerIframe[0].contentDocument;

            expect(innerDoc).to.exist;

            // Now wrap the inner iframe's body
            cy.wrap(innerDoc.body)
              .should("not.be.undefined")
              .then(cy.wrap)
              .within(() => {
                // Use your actual selectors from frame-payment.html
                cy.get("#cc").type("1234567890123456");
              });
          });
      });
  });
});
