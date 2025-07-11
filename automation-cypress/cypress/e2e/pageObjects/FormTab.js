class FormTab {
    elements = {
        nameInputElement: () => cy.get("#name"),
        emailInputElement: () => cy.get("#email"),
        radioButtonElement: (option) => cy.get(`[data-test-id="radio-${option}"]`),
        subsribeCheckBoxElement: () => cy.get('[data-test-id="checkbox-subscribe"]'),
        selectCountryDropDownElement: () => cy.get('[data-test-id="select-country"]'),
        submitButtonElement: () => cy.get('[data-test-id="btn-submit"]'),
        }
        
        enterName(fullName) {
            this.elements.nameInputElement().type(fullName)
        }

        enterEmail(email) {
            this.elements.emailInputElement().type(email)
        }

        selectRadioButton(option) {
            this.elements.radioButtonElement(option).check()
        }

        validateRadioButtonSelection(option){
            this.elements.radioButtonElement(option).should("be.checked")
            cy.get('[data-test-id^="radio-"]').each(($el) => {
                const testIdValue = $el.attr('data-test-id')
                if(testIdValue != `radio-${option}`) {
                    cy.wrap($el).should("not.be.checked")
                }
            })
        }

        selectSubscribeCheckBox() {
            this.elements.subsribeCheckBoxElement().check().should("be.checked")
        }

        selectCountry(option) {
            const optionInLowerCase = option.toLowerCase()
            this.elements.selectCountryDropDownElement().select(optionInLowerCase)
            this.elements.selectCountryDropDownElement().should("have.value", optionInLowerCase)
            this.validateSelectCountry(option)
        }

        validateSelectCountry(option) {
            const optionInLowerCase = option.toLowerCase()
            this.elements.selectCountryDropDownElement().find('option').each(($el) => {
                const value = $el.attr('value')
                if(optionInLowerCase != value) {  
                    this.elements.selectCountryDropDownElement().should("not.have.value", value)
                } else {
                    this.elements.selectCountryDropDownElement().should("have.value", optionInLowerCase)
                }
            })
        }

        submitForm() {
            this.elements.submitButtonElement().click()
            cy.on("window:alert", (str) => {
                expect(str).to.eq("Form submitted successfully!")
            })

        }
        
}

export default  FormTab