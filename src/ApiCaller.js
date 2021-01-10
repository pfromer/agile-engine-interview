import merge from 'lodash/merge'
import axios from 'axios';
import { configureRefreshFetch, fetchJSON } from 'refresh-fetch'

const TOKEN = 'TOKEN'

const retrieveToken = () => sessionStorage.getItem(TOKEN)
const saveToken = token => sessionStorage.setItem(TOKEN, token);
const clearToken = () => sessionStorage.deleteItem(TOKEN)

const fetchJSONWithToken = (url, options = {}) => {
  const token = retrieveToken()

  let optionsWithToken = options
  if (token != null) {
    optionsWithToken = merge({}, options, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return fetchJSON(url, optionsWithToken)
}

const shouldRefreshToken = error => error.response.status === 401

const refreshToken = () => {
  return axios.post('http://interview.agileengine.com/auth', { "apiKey": "23567b218376f79d9415" })
    .then(response => {
      saveToken(response.data.token)
    })
    .catch(error => {
      // Clear token and continue with the Promise catch chain
      clearToken()
      throw error
    })
}

const _fetch = configureRefreshFetch({
  fetch: fetchJSONWithToken,
  shouldRefreshToken,
  refreshToken
})

export {
  _fetch
}
