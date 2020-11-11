"use strict"

const axios = require("axios")

exports.getData = endpoint => {
  const url = endpoint.url

  return axios
    .request({
      method: "GET",
      baseURL: url,
      url: "/",
      headers: { Accept: "application/json" },
    })
    .then(response => response.data)
}
