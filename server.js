var express = require('express');
var bodyParser = require('body-parser');
// var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');
var request = require('request')

// var db = new sqlite3.Database("db/music.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(express.static('public'));
app.get('/', function(req, res){
	res.render('index.ejs')
});

app.post('/url', function(req, res){
console.log(req.body.site);
console.log("res is " + res)
var html = ""

request.get(req.body.site, function(err, body){
	html = body;
	res.json({html: html})
	})
})

app.listen('80')