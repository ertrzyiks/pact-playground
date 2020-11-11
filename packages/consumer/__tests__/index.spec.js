"use strict"

const { pactWith } = require("jest-pact")

const { getData } = require("../index")

pactWith({ consumer: "Consumer", provider: "Provider" }, provider => {
  describe("API", () => {
    const EXPECTED_DATA = [
      {
        message: "Hello world",
      },
    ]

    const successResponse = {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: EXPECTED_DATA,
    }

    const listRequest = {
      uponReceiving: "a request for welcome message",
      withRequest: {
        method: "GET",
        path: "/",
        headers: {
          Accept: "application/json",
        },
      },
    }

    beforeEach(() => {
      const interaction = {
        state: "i have a list of dogs",
        ...listRequest,
        willRespondWith: successResponse,
      }
      return provider.addInteraction(interaction)
    })

    it("returns a successful body", () => {
      return getData({
        url: provider.mockService.baseUrl,
      }).then(data => {
        expect(data).toEqual(EXPECTED_DATA)
      })
    })
  })
})
