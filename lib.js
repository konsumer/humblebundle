import qs from 'qs'
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

// login, set coookies
export function login (email, password) {
  return fetch('https://www.humblebundle.com/login', {
    method: 'POST',
    credentials: 'include',
    headers: headers,
    body: qs.stringify({
      username: email,
      password: password
    })
  })
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
  return fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: headers
  })
    .then(res => res.json())
    .then(body => {
      if (id) {
        return body
      } else {
        return body.map(g => g.gamekey)
      }
    })
}

const api = { login, order }
export default api
