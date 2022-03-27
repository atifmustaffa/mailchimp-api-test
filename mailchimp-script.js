require('dotenv').config()
const axios = require('axios')

// Main API url
const mailchimpApi = 'https://us14.api.mailchimp.com/3.0'

const auth = {
  username: 'anystring',
  password: process.env.APIKEY, // Uses (hidden) api key from .env file
}

// Base axios http request - GET
function getRequest(path) {
  return axios
    .get(`${mailchimpApi}${path}`, {
      auth: auth,
    })
    .then(({ data }) => data)
    .catch(errorHandler)
}
// Base axios http request - POST
function postRequest(path, data) {
  return axios
    .post(
      `${mailchimpApi}${path}`,
      { ...data },
      {
        auth: auth,
      }
    )
    .then(({ data }) => data)
    .catch(errorHandler)
}
// Base axios http request - DELETE
function deleteRequest(path) {
  return axios
    .delete(`${mailchimpApi}${path}`, {
      auth: auth,
    })
    .then(({ data }) => data)
    .catch(errorHandler)
}

// Error handler function
function errorHandler(err) {
  // Log full error details, can opt to supress
  console.error(err)
  // Usually mailchimp api parameter error is included in errors array
  console.warn(err.response.data.errors || '')
  throw err
}

// Exports all required mailchimp api endpoints
module.exports = {
  getLists() {
    return getRequest('/lists')
  },
  addList(list) {
    return postRequest('/lists', list)
  },
  deleteList(list_id) {
    return deleteRequest(`/lists/${list_id}`)
  },
  batchSubscribeList(list_id, memberList) {
    return postRequest(`/lists/${list_id}`, memberList)
  },
  getMembers(list_id) {
    return getRequest(`/lists/${list_id}/members`)
  },
  addMember(list_id, member) {
    return postRequest(`/lists/${list_id}/members`, member)
  },
  getCampaigns() {
    return getRequest('/campaigns')
  },
  addCampaign(campaign) {
    return postRequest('/campaigns', campaign)
  },
  sendCampaign(campaign_id) {
    return postRequest(`/campaigns/${campaign_id}/actions/send`)
  },
  deleteCampaign(campaign_id) {
    return deleteRequest(`/campaigns/${campaign_id}`)
  },
  getCampaignInfo(campaign_id) {
    return getRequest(`/campaigns/${campaign_id}`)
  },
}
