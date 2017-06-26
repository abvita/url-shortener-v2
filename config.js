var config = {};

config.db = {};
// the URL shortening host - shortened URLs will be this + base58 ID
// i.e.: http://localhost:3000/3Ys
config.webhost = 'http://localhost:5000/';

// your MongoDB host and database name
config.db.host = 'https://shortlnk.herokuapp.com/';
config.db.name = 'url_shortener';

module.exports = config;
