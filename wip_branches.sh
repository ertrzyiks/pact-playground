#!/bin/sh

curl -d ' {"consumerVersionSelectors": [{"consumer": "Provider", "tag": "production", "latest": true}],"includeWipPactsSince": "2020-10-09","includePendingStatus": true,"providerVersionTags": ["main"]}' -H 'Content-Type: application/json' http://localhost:9292/pacts/provider/Provider/for-verification
