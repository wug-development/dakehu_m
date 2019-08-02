'use strict'
const merge = require('webpack-merge')

module.exports = merge({
  NODE_ENV: '"development"',
  API_URL: '"/apis"',
  APIO_URL: '"/apio"',
  APIW_URL: '"/apiw"'
})
