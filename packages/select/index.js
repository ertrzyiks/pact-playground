const fetch = require('node-fetch')

console.log('----')
fetch('http://localhost:9292/pacts/provider/Provider/for-verification', {
  method: 'POST',
  body: JSON.stringify({
    consumerVersionSelectors: [
      {
        tag: 'production',
        latest: true
      }
    ],
    includeWipPactsSince: '2020-09-09',
    includePendingStatus: true,
    providerVersionTags: ['main']
  })
})
  .then(res => res.json())
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
