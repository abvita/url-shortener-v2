# shortlnk - MEAN Stack URL Shortenter
A simple and easy URL shortener app built with Node, Express, Angular 7, and MongoDB.

### To serve app locally:

* Run Mongo shell, and create app database:

```
... use url_shortener
```

* Initialize counters collection: 

```
... db.counters.insert({ _id: 'url_count', seq: 1 })
```

* Start app:

```
... npm start
```

### Production:

* Setup MongoDB database.
* Set Node environment variable MONGOLAB_URI to the database's MongoDB URI.
* Start app:

```
... npm start
```