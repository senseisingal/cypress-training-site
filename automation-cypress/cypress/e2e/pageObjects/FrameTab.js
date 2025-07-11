class FrameTab {
    elements = {
        frameTabElement: () => cy.get("#tab-frames"),
        frameTabH2Element: () => cy.get("#frames-section h2"),
        hobbyIFrame : () => cy.get("[data-test-id=iframe-hobby]"),
        parentIFrame : () => cy.get("[data-test-id=iframe-outer]",),
        parentIFrameSpanElement : () => "span",
        hobbyInputElement : () => "[data-test-id=input-hobby]",
        creditCardInputElement: () => cy.get('[data-test-id="input-cc"]')
    }

    navigateToFrameTab() {
        this.elements.frameTabElement().click()
    }

    validateFrameTab() {
        this.elements.frameTabH2Element().should("be.visible")
    }

    getHobbyIFrameDocument() {
        return this.elements.hobbyIFrame().its("0.contentDocument").should("exist")
    }

    getHobbyIFrameBody() {
        return this.getHobbyIFrameDocument().its("body").should("not.be.undefined").then(cy.wrap)
    }

    enterHobby(hobbyText) {
        this.getHobbyIFrameBody().find(this.elements.hobbyInputElement()).type(hobbyText)
    }

    getOuterIFrameDocument() {
        return this.elements.parentIFrame().should("exist").its("0.contentDocument").should("exist")
    }

    getOuterIFrameBody() {
        return this.getOuterIFrameDocument().its("body").should("not.be.undefined").then(cy.wrap)
    }

    validateSpanInOuterIFrame() {
        this.getOuterIFrameBody().find(this.elements.parentIFrameSpanElement()).should("have.text","Outer Frame")
    }

    getCreditCardIFrameDocument() {
        return this.getOuterIFrameBody().find('[data-test-id="iframe-inner"]').should("exist")
    }

    getCreditCardIFrameBody() {
        return this.getCreditCardIFrameDocument().then(($iframe) => {
            const innerDoc = $iframe[0].contentDocument
            expect(innerDoc).to.exist
            return cy.wrap(innerDoc.body).should("not.be.undefined").then(cy.wrap)
        })
    }

    enterCreditCardNumber(ccNumber) {
        this.getCreditCardIFrameBody().within(() => {
            this.elements.creditCardInputElement().type(ccNumber)
        })
    }
}

export default FrameTab