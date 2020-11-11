if (process.env.CI !== "true") {
  console.log("skipping Pact publish as not on CI...")
  process.exit(0)
}

const { Publisher } = require("@pact-foundation/pact")
const path = require("path")

const exec = command =>
  childProcess
    .execSync(command)
    .toString()
    .trim()

//Usually, you would just use the CI env vars, but to allow these examples to run from
//local development machines, we'll fall back to the git command when the env vars aren't set.
const gitSha = process.env.TRAVIS_COMMIT || exec("git rev-parse HEAD")
const branch =
  process.env.TRAVIS_BRANCH || exec("git rev-parse --abbrev-ref HEAD")

const opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), "pacts")],
  pactBroker: "https://localhost:9292",
  consumerVersion: gitSha,
  tags: [branch],
}

new Publisher(opts)
  .publishPacts()
  .then(() => {
    console.log("Pact contract publishing complete!")
    console.log("")
    console.log("Head over to https://localhost:9292 and login with")
    console.log("to see your published contracts.")
  })
  .catch(e => {
    console.log("Pact contract publishing failed: ", e)
  })
