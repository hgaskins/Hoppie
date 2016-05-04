var express = require('express');
var requestProxy = require('express-request-proxy');
var oauthSignature = require('oauth-signature');
var nonce = require('nonce')();
var request = require('request');
var queryString = require('querystring');
var lodash = require('lodash');
var pg = require('pg');
var port = process.env.PORT || 3000;
var app = express();

var requestYelp = function (setParameters, callback) {
  var httpMethod = 'GET';
  var url = 'http://api.yelp.com/v2/search';
  var defaultParameters = {
    location: 'Portland+OR',
    sort: 1
  };
  var requiredParameters = {
    oauth_consumer_key: process.env.YELP_CONSUMER_KEY,
    oauth_token: process.env.YELP_TOKEN,
    oauth_nonce: nonce(),
    oauth_timestamp: nonce().toString().substr(0, 10),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_version: '1.0'
  };
  var parameters = lodash.assign(defaultParameters, setParameters, requiredParameters);
  var consumerSecret = process.env.YELP_CONSUMER_SECRET;
  var tokenSecret = process.env.YELP_TOKEN_SECRET;
  var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

  parameters.oauth_signature = signature;

  var paramURL = queryString.stringify(parameters);
  var apiURL = url + '?' + paramURL;

  request(apiURL, function (error, response, body) {
    return callback(error, response, body);
  });
};

app.get('/api/yelp/', function (req, res) {
  var searchParameters = {
    location: 'Portland+OR',
    limit: 3,
    category_filter: 'breweries'
  };

  if (req.query.location) {
    searchParameters.location = req.query.location;
  }

  requestYelp(searchParameters, function (error, response, body) {
    res.send(body);
  });
});

app.get('/api/search', function (req, res) {
  // SELECT
  // read record
  res.send('GET location');
});

app.post('/api/search', function (req, res) {
  // INSERT
  // create record
  res.send('POST location');
});

app.put('/api/search', function (req, res) {
  // UPDATE
  // update record
  res.send('PUT location');
});

app.delete('/api/search', function (req, res) {
  // DELETE
  // delete record
  res.send('DELETE location');
});

app.get('/db', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    // if (err) throw err;
    // console.log('Connected to postgres! Getting schemas...');

    // client.query('SELECT * FROM test_table', function(err, result) {
    //   done();
    //   if (err) {
    //     console.error(err); res.send('Error ' + err);
    //   } else {
    //     res.send(result.rows);
    //   }
    // });
  });
});

app.use(express.static('./'));

app.get('*', function (request, response) {
  console.log('New request:', request.url);
  response.sendFile('index.html', { root: '.' });
});

app.listen(port, function () {
  console.log('Server started on port ' + port + '!');
});
