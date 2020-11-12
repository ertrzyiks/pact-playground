const axios = require("axios")

console.log('----')
axios.post('http://localhost:9292/pacts/provider/Provider/for-verification', {
  consumerVersionSelectors: [
    {"tag": "production", "latest": true}
  ],
  includeWipPactsSince: "2020-11-09",
  includePendingStatus: true,
  providerVersion: 'main'
})
  .then(response => response.data)
  .then(data => {
    const pacts = data._embedded.pacts

    if (pacts.length === 0) {
      console.log('No pacts')
    } else {
      for (const [index, pact] of pacts.entries()) {
        console.log(`Pact ${index + 1} (${pact.shortDescription})`)
        console.log(pact.verificationProperties)
      }
    }
  })
  .catch(err => console.log(err.message))
