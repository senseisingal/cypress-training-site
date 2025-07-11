import FormTab from "./pageObjects/FormTab"

describe("Form Test", () => {
    it("tests elements in form tab", () => {
        const formTab = new FormTab()
        cy.visit("http://127.0.0.1:5500/")
        formTab.enterName("Sensei Singal")
        formTab.enterEmail("senseisingal@gmail.com")
        formTab.selectRadioButton("male")
        formTab.validateRadioButtonSelection("male")
        formTab.selectSubscribeCheckBox()
        formTab.selectCountry("India")
        formTab.submitForm()
    })
})