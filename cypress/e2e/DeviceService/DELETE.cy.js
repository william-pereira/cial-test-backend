/// <reference types="Cypress"/>

describe("/DELETE successfully scenarios (Contract test)", () => {
    
    let createdId;
    before(() => {
        cy.log('Scenario to Create a device before the tests')
        cy.fixture('api/requestBodies/postBodyBefore.json').then((postBodyBefore) => {
        cy.api({
            failOnStatusCode: false,
            method: 'POST',
            url: `${"/objects"}`,
            body: postBodyBefore
        }).then((response) => {

            // validate status code
            expect(response.status).to.equal(200)
            createdId = response.body.id;
        })
    })
})    

    it("Validate DELETE a device with success", () => {
        cy.log('Delete the device created by before test')
        cy.api({
                failOnStatusCode: false,
                method: 'DELETE',
                url: `${"/objects"}/${createdId}`,
            }).then((response) => {
                const item = response.body

                // validate status code
                expect(response.status).to.equal(200)
        })
        cy.log('Get to device to id ensure the deletion')
        cy.api({
                failOnStatusCode: false,
                method: 'GET',
                url: `${"/objects"}/${createdId}`
        }).then((response) => {

                // validate status code
                expect(response.status).to.equal(404);

                // validate the error message from get request
                expect(response.body).to.have.property('error', `Oject with id=${createdId} was not found.`)
        })
    })
})

describe("/DELETE Alternative scenarios (Business Test)", () => {

    it("Validate DELETE a device send an invalid id", () => {
        cy.log('Send an invalid id to delete method')
        cy.fixture('api/queryParams/invalidId.json').then((invalidId) => {
            const id = invalidId.id;
            cy.api({
                failOnStatusCode: false,
                method: 'DELETE',
                url: `${"/objects"}/${id}`,
            }).then((response) => {
                const item = response.body
               
                // validate status code
                expect(response.status).to.equal(404);

                // validate the error message from request
                expect(response.body).to.have.property('error', `Object with id = ${id} doesn't exist.`)
            })
        })
    })

    it("Validate DELETE a device sending a request without id", () => {
        cy.log('Send to delete request an url without id')
        cy.fixture('api/queryParams/invalidId.json').then((invalidId) => {
            const id = invalidId.id;
            cy.api({
                failOnStatusCode: false,
                method: 'DELETE',
                url: `${"/objects"}/`,
            }).then((response) => {
                    const item = response.body

                    // validate status code
                    expect(response.status).to.equal(200);
            })
        })
    })


    it("Validate DELETE unauthorized for id 6", () => {
        cy.log('Delete the device created by before test')
        cy.api({
                failOnStatusCode: false,
                method: 'DELETE',
                url: `${"/objects"}/6`,
            }).then((response) => {
                const item = response.body

                // validate status code
                expect(response.status).to.equal(405)

                // validate the error message from delete request
                expect(item).to.have.property("error", "6 is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.")

        })
    })
})
