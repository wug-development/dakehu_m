'use strict'
const merge = require('webpack-merge')

module.exports = merge({
  NODE_ENV: '"development"',
  API_URL: '"/apis"',
  APIW_URL: '"/apiw"'
})
