const request = require("superagent")

const createAPIClient = ({ jwt } = {}) => {
  const agent = request.agent()
  if (jwt) {
    agent.set("Authorization", `Bearer ${jwt}`)
  }

  const basuURL = (url) => {
    return `${process.env.SERVER_URL}/api${url}`
  }

  const apiClient = {
    get: (url) => agent.get(basuURL(url)),
    post: (url, data) => agent.post(basuURL(url)).send(data),
    put: (url, data) => agent.put(basuURL(url)).send(data),
    delete: (url) => agent.delete(basuURL(url)),
  }

  return apiClient
}

module.exports = createAPIClient
