var express = require('express');
var requestProxy = require('express-request-proxy');
var oauthSignature = require('oauth-signature');
var nonce = require('nonce')();
var request = require('request');
var queryString = require('querystring');
var lodash = require('lodash');
var pg = require('pg');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/api/yelp', function (req, res) {
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

// CREATE TABLE track_search (id SERIAL PRIMARY KEY, term varchar(255), timestamp_added timestamp);
// INSERT INTO track_search (term, timestamp_added) VALUES ('Portland', CURRENT_TIMESTAMP);
// SELECT id, term, timestamp_added FROM track_search;

app.get('/api/search', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('SELECT id, term FROM track_search WHERE term ILIKE $1 ORDER BY timestamp_added DESC LIMIT 3', ['%'+req.query.term+'%'], function(err, result) {
      done();

      if (err) {
        return console.error('error running query', err);
      }

      res.send(result.rows);
      client.end();
    });
  });
});

app.post('/api/search', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('INSERT INTO track_search (term, timestamp_added) VALUES ($1, CURRENT_TIMESTAMP)', [req.body.term], function(err, result) {
      done();

      if (err) {
        return console.error('error running query', err);
      }

      res.send(result.rows);
      client.end();
    });
  });
});

app.put('/api/search', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('UPDATE track_search SET term=$1 WHERE id=$2', [req.body.term, req.body.id], function(err, result) {
      done();

      if (err) {
        return console.error('error running query', err);
      }

      res.send(result.rows);
      client.end();
    });
  });
});

app.delete('/api/search', function (req, res) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    if (err) {
      return console.error('error fetching client from pool', err);
    }

    client.query('DELETE FROM track_search WHERE id=$1', [req.body.id], function(err, result) {
      done();

      if (err) {
        return console.error('error running query', err);
      }

      res.send(result.rows);
      client.end();
    });
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
