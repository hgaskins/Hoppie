var requestProxy = require('express-request-proxy');
var express = require('express');
var oauthSignature = require('oauth-signature');
var nonce = require('nonce')();
var request = require('request');
var queryString = require('querystring');
var lodash = require('lodash');
var port = process.env.PORT || 3000;
var app = express();

var requestYelp = function(setParameters, callback) {
  var httpMethod = 'GET';
  var url = 'http://api.yelp.com/v2/search';
  var default_parameters = {
    location: 'Portland+OR',
    sort: '2'
  };
  var required_parameters = {
    oauth_consumer_key : process.env.YELP_CONSUMER_KEY,
    oauth_token : process.env.YELP_TOKEN,
    oauth_nonce : nonce(),
    oauth_timestamp : nonce().toString().substr(0, 10),
    oauth_signature_method : 'HMAC-SHA1',
    oauth_version : '1.0'
  };
  var parameters = lodash.assign(default_parameters, setParameters, required_parameters);
  var consumerSecret = process.env.YELP_CONSUMER_SECRET;
  var tokenSecret = process.env.YELP_TOKEN_SECRET;
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

  parameters.oauth_signature = signature;

  var paramURL = queryString.stringify(parameters);
  var apiURL = url + '?' + paramURL;

  request(apiURL, function(error, response, body){
    return callback(error, response, body);
  });
};

app.get('/api/yelp/', function (req, res) {
  var searchParameters = {
    location: 'Portland+OR',
    limit: 10,
    category_filter: 'breweries'
  };

  if (req.query.location) {
    searchParameters.location = req.query.location;
  }

  requestYelp(searchParameters, function (error, response, body) {
    res.send(body);
  });
});

app.use(express.static('./'));

app.get('*', function(request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function() {
  console.log('Server started on port ' + port + '!');
});
