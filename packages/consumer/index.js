"use strict"

const fetch = require('node-fetch')

exports.getData = endpoint => {
  return fetch(endpoint.url).then(res => res.json())
}
