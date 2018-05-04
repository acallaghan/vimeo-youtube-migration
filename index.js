const config = require('dotenv').config().parsed
const http = require('http')
const fs = require('fs')
const url = require('url')
const open = require('opn')

const randomstring = require('randomstring')
const state = randomstring.generate(8)

const hostname = "localhost"
const port = 8283

var Vimeo = require('vimeo').Vimeo

var client = new Vimeo(
  config.VIMEO_CLIENT_ID,
  config.VIMEO_CLIENT_SECRET
)

if (config.VIMEO_ACCESS_TOKEN == undefined || config.VIMEO_ACCESS_TOKEN == "") {
  // Launch the browser & a server listener to callback
  const baseUrl = "http://" + hostname + ":" + port
  const authUrl = client.buildAuthorizationEndpoint(
    baseUrl,
    config.VIMEO_PERMISSIONS,
    state
  )

  open(authUrl)

  http.createServer( (req, res) => {
    var responseUrl = url.parse(req.url, true)
    if (responseUrl.query['code']) {
      var token = responseUrl.query['code']
      var access_token_setting = "\nVIMEO_ACCESS_TOKEN=" + token
      try {
        var fd = fs.openSync(".env", "a")
        fs.appendFileSync(fd, access_token_setting)
      } catch (err) {
        console.log(err)
      } finally {
        console.log(access_token_setting)
        console.log("Access token written")
        process.exit(0)
      }
    }
  }).listen(port)
}

client.generateClientCredentials(config.VIMEO_PERMISSIONS, function (err, response) {
  if (err) {
    throw err;
  }

  var token = response.access_token;

  // Other useful information is included alongside the access token,
  // which you can dump out to see, or visit our API documentation.
  //
  // We include the final scopes granted to the token. This is
  // important because the user, or API, might revoke scopes during
  // the authentication process.
  var scopes = response.scope;
});
