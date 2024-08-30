/// <reference types="Cypress"/>

describe("/GET By Id successfully scenarios (Contract test)", () => {
    it("Validate Get By Id with more than one device id", () => {

        cy.fixture('api/queryParams/getByIds.json').then((GetByIds) => { 
        cy.log('Send three ids to get by id')
        cy.api({
            method: 'GET',
            url: `${"/objects"}`,
            qs: GetByIds
        }).then((response) => {
                // validate status code
                expect(response.status).to.equal(200);

                // validate all ids should have required params (id, name, data)
                response.body.forEach((item) => {
                expect(item).to.have.property('id')
                expect(item).to.have.property('name')
                expect(item).to.have.property('data')
                
                // validate params should not be null
                expect(item).not.null
                expect(item).not.null
                expect(item).not.null
                })
            })
        })
    })
    
    it("Validate Get By Id with one device id", () => {
        cy.fixture('api/queryParams/getById.json').then((getById) => {
        cy.log('Send 1 id to Get request')
        cy.api({
            method: 'GET',
            url: `${"/objects"}`,
            qs: getById
        }).then((response) => {
            const item = response.body[0];
                // validate status code
                expect(response.status).to.equal(200);

                // validate the id property and values
                expect(item).to.have.property('id', '7');
                expect(item).to.have.property('name', 'Apple MacBook Pro 16');
                expect(item.data).to.have.property('year', 2019);
                expect(item.data).to.have.property('price', 1849.99);
                expect(item.data).to.have.property('CPU model', 'Intel Core i9');
                expect(item.data).to.have.property('Hard disk size', '1 TB');
            })
        })
    })
})