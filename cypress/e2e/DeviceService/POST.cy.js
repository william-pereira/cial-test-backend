/// <reference types="Cypress"/>

describe("/POST successfully scenarios (Contract test)", () => {

    it("Validate POST with success", () => {
        cy.fixture('api/requestBodies/postBody.json').then((postBody) => {
            cy.log('Send a request to POST with all required fields')
            cy.api({
                failOnStatusCode: false,
                method: 'POST',
                url: `${"/objects"}`,
                body: postBody
            }).then((response) => {
                const item = response.body
                
                // validate status code
                expect(response.status).to.equal(200)

                // validate the id property and values
                expect(item).to.have.property('name', 'Apple MacBook Pro 16');
                expect(item.data).to.have.property('year', 2019);
                expect(item.data).to.have.property('price', 1849.99);
                expect(item.data).to.have.property('CPU model', 'Intel Core i9');
                expect(item.data).to.have.property('Hard disk size', '1 TB');
            })
        })
    })
})

describe("/POST Alternative scenarios (Business Test)", () => {
    it("Validate POST without required fields", () => {
        cy.fixture('api/requestBodies/bodyEmpty.json').then((bodyEmpty) => {
            cy.log('Send a request to POST without required fields')
            cy.api({
                failOnStatusCode: false,
                method: 'POST',
                url: `${"/objects"}`,
                body: bodyEmpty
            }).then((response) => {
                const item = response.body
                
                // validate status code
                expect(response.status).to.equal(200)

                // validate the id property and values
                expect(item).to.have.property('id');
                expect(item).to.have.property('name', null);
                expect(item).to.have.property('createdAt');
                expect(item).to.have.property('data', null);
            })
        })
    })
})
