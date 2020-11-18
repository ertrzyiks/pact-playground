# Pact playground

## Pact broker

Before other commands become available you need to start a broker.

```bash
docker-compose up
```

## Running consumer tests

To run consumer tests and publish them to the local broker run
```bash
yarn consumer-pact
```

![](./images/first_test.png)
![](./images/first_test_matrix.png)

after than check the pacts for verification
```bash
yarn select
```

returns no pacts.

## Verifying pact by URL

```
yarn verify:single [PACT URL]
```

## Creating WIP branch
Modify the consumer test and create a feature branch:
```
TRAVIS_COMMIT=123 TRAVIS_BRANCH=feature-1 yarn consumer-pact
```


## Other commands

| Command | Description |
| ---- | --- |
| `yarn workspace consumer run test` | Create consumer pact | 
| `yarn workspace consumer run publish:pact` | Publish consumer pact | 
| `yarn workspace provider run verify:pact` | Publish consumer pact | 
