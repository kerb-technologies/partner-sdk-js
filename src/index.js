import axios from 'axios'
import * as requests from './requests.js'
import * as exceptions from './exceptions.js'

// this valud should be save with version at package.json
const VERSION = '0.0.1'
const KERB_HEADER_ROTATED_KEY = 'KERB-APIKEY-EXPIRE-AT'

let APIKEY = undefined

const config = {
  throwAtRotatedKey: false,
}

const defaultHeaders = {
  'Kerb-Partner-Version': VERSION,
}

function generateHeader(headers) {
  let newHeaders
  if (typeof headers !== 'object') {
    newHeaders = defaultHeaders
  } else {
    // override with default headers
    newHeaders = { ...headers, defaultHeaders }
  }
  return newHeaders
}
function createConfig(obj) {
  // convert into object
  const config = { ...obj }

  config.headers = generateHeader(obj.headers)

  return config
}

function checkForRotatedKey(response) {
  if (config.throwAtRotatedKey && KERB_HEADER_ROTATED_KEY in response.headers)
    throw new exceptions.RotatedApiKey(
      response.headers[KERB_HEADER_ROTATED_KEY]
    )
  return response
}

export function getApiHost() {
  if (process.env.KERB_PARTNER_HOST === undefined) {
    throw new exceptions.EmptyApiHost()
  }

  return process.env.KERB_PARTNER_HOST
}

export function setApiKey(apiKey) {
  APIKEY = apiKey
}
export function getApiKey() {
  if (typeof APIKEY !== 'string') {
    throw new exceptions.EmptyApiKey()
  }
  return APIKEY
}

export function setConfig(name, value) {
  config[name] = value
  return config[name]
}

export function makeRequest(name, options = []) {
  const objName = name[0].toUpperCase() + name.slice(1)
  if (requests[objName] === undefined) throw new exceptions.InvalidRequestName()

  return requests[objName]()
}

export function send(name, options = []) {
  const obj = makeRequest(name, options)
  return request(obj)
}

export function request(obj) {
  const apiHost = getApiHost()
  const apiKey = getApiKey()
  // we create instance so some configuration value didnt override by axios.defaults
  // https://github.com/axios/axios#config-order-of-precedence
  const instance = axios.create({
    baseURL: apiHost,
  })

  const config = createConfig(obj)
  config.baseURL = apiHost
  config.headers['Kerb-Partner-Key'] = apiKey

  return instance.request(config).then(checkForRotatedKey)
}
