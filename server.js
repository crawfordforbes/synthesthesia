var express = require('express');
var bodyParser = require('body-parser');
// var sqlite3 = require("sqlite3").verbose();
var cors = require('cors');
var request = require('request')
var ip = require('./ip.json')
console.log(ip["ip"])
// var db = new sqlite3.Database("db/music.db");
var app = express();

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use(express.static('public'));
app.get('/', function(req, res){
	res.render('index.ejs', {ip: ip["ip"]})
});

app.post('/url', function(req, res){
console.log(req.body.site);
console.log("res is " + res)
var html = ""

request.get(req.body.site, function(err, body){
	html = body;
	html = html.body.replace(/\r?\n|\r/g, "")
	var headOpen = html.indexOf("<head>") + 6;
	var headClose = html.indexOf("</head>")
	var head = html.slice(headOpen, headClose).replace(/[^a-zA-Z]/g, "")
			var bodyOpen = html.indexOf("<body>") + 6;
		var bodyClose = html.indexOf("</body>")
		var body = html.slice(bodyOpen, bodyClose).replace(/[^a-zA-Z]/g, "")
	res.json({head: head, body: body})
	})
})

app.listen(ip["port"])