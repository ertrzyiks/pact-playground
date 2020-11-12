const { Verifier } = require('@pact-foundation/pact')
const { app } = require('./api')
let opts = {
  providerBaseUrl: 'http://localhost:4001',
  provider: 'Provider',
  pactBrokerUrl: 'http://localhost:9292',
  publishVerificationResult: true,
  providerVersion: 'main',
  verbose: true,
  includeWipPactsSince: '2020-11-10',
  enablePending: true,
  consumerVersionSelectors: [{
    tag: 'production',
    latest: true
  }]
};

const server = app.listen(4001, () => {
  new Verifier(opts).verifyProvider().then(function () {
    server.close(() => {
      console.log('Done.')
    })
  })
})

