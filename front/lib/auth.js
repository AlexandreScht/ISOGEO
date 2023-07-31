var OAuth = require("oauth").OAuth2

module.exports = {
  getToken: function (params) {
    return new Promise((resolve, reject) => {
      var oauth = new OAuth(
        params.clientId,
        params.clientSecret,
        params.apiUrl,
        null,
        "/oauth/token",
        { "Accept-Language": "en" },
      )
      oauth.getOAuthAccessToken(
        "",
        { grant_type: "client_credentials" },
        function (e, access_token, refresh_token, results) {
          if (e) {
            console.error(
              "[id] Unable to get access token: " + JSON.stringify(e),
            )
            reject()
          }
          resolve(access_token)
        },
      )
    })
  },
}
