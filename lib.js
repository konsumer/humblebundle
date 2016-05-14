import qs from 'qs'

// emulate browser fetch
import fc from 'fetch-cookie'
import nf from 'node-fetch'
const fetch = fc(nf)

var headers = {
  'Accept': 'application/json',
  'Accept-Charset': 'utf-8',
  'Keep-Alive': 'true',
  'X-Requested-By': 'hb_android_app',
  'User-Agent': 'Apache-HttpClient/UNAVAILABLE (java 1.4)'
}

// internal conveneience: GET with proper headers
function get (url) {
  let options = {
    method: 'GET',
    credentials: 'include',
    headers: headers
  }
  return fetch(url, options)
}

// internal conveneience: POST with proper headers
function post (url, params) {
  let options = {
    method: 'POST',
    credentials: 'include',
    headers: headers
  }
  if (params) {
    options.body = qs.stringify(params)
  }
  return fetch(url, options)
}

// login, set coookies
export function login (email, password) {
  return post('https://www.humblebundle.com/login', {username: email, password: password})
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Could not login.')
      }
      return res
    })
}

// get gamekeys from your library
export function order (id) {
  let url = id ? `https://www.humblebundle.com/api/v1/order/${id}?unused_tpkds=true` : 'https://www.humblebundle.com/api/v1/user/order'
  return get(url)
    .then(res => res.json())
    .then(body => {
      if (id) {
        return body
      } else {
        return body.map(g => g.gamekey)
      }
    })
}

// get list of claimed entities
export function claimed () {
  return get('https://www.humblebundle.com/api/v1/user/claimed/entities')
    .then(res => res.json())
}

const api = { login, order, claimed }
export default api
