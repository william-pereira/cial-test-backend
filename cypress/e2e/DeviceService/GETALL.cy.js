/// <reference types="Cypress"/>

describe("/GET All successfully scenarios (Contract test)", () => {
    it("Validate GET All with success", () => {
        cy.log('Get all devices from Get request')
        cy.api({
            method: 'GET',
            url: `${"/objects"}`,
        }).then((response) => {
                // validate status code
                expect(response.status).to.equal(200);

                // validate all ids should have required params (id, name, data)
                response.body.forEach((item) => {
                expect(item).to.have.property('id')
                expect(item).to.have.property('name')
                expect(item).to.have.property('data')
            })
        })
    })
})

