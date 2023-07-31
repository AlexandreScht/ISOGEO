var OAuth = require('oauth').OAuth2

module.exports = {
    /**
     * Generate a new OAuthAccess Token
     * @param {*} req,  request from express route
     * @param {Object} params, environnement parameters
     * @return {Promise} the promise of update the app with a new access token.
     */
    getToken: function (req, params) {
        return (new Promise((resolve, reject) => {
            var app = req.app
            var oauth = new OAuth(
                params.clientId,
                params.clientSecret,
                params.apiUrl,
                null,
                '/oauth/token',
                { 'Accept-Language': req.locale || 'en' }
            )
            oauth.getOAuthAccessToken(
                '',
                { 'grant_type': 'client_credentials' },
                function (e, access_token, refresh_token, results) {
                    if (e) {
                        console.error('[id] Unable to get access token: ' + JSON.stringify(e));
                        reject()
                    }
                    app.set('oauth-token', {
                        access_token: access_token
                    })
                    resolve()
                }
            )
        }))
    }
}