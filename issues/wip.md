# 

1. Install yarn dependencies

```bash
yarn install
```

2. Start local broker

```bash
docker-compose up -d
```

3. Publish consumer pact

```bash
TRAVIS_COMMIT=123 yarn consumer-pact   
```

4. Verify it and publish the results

```bash
yarn verify:single http://localhost:9292/pacts/provider/Provider/consumer/Consumer/version/123
```

5. Modify `./packages/consumer/__tests__/index.spec.js` to expect different message.

Find:
```js
message: Matchers.somethingLike("Hello world")
```

And change it to
```js
message: Matchers.somethingLike("Hello world2")
```

6. Publish modified contract

```bash
TRAVIS_COMMIT=124 yarn consumer-pact   
```

7. Check what are current WIP branches
```bash
yarn select
```

8. Verify contracts asking broker for WIP branches
```bash
yarn verify
```

9. Check what are current WIP branches, it should still have something
```bash
yarn select
```

10. Repeat 8. as many times as you want and see 9. stands true

11. Verify `124` version by URL

```bash
yarn verify:single http://localhost:9292/pacts/provider/Provider/consumer/Consumer/version/124
```

12. See what are current WIP branches
```bash
yarn select
```

Version `124` is no longer WIP.
