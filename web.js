var express = require('express');
var request = require('request');
var app = express();
var site = {
	title:"Tymm CPR",
	description:"Tymm CPR app",
	image:"blank.jpeg"
};


// simulate Angular to load in API address
var _factories = {};
GLOBAL.angular = {module: function() {
	return {
		factory: function(name, factory) {
			_factories[name] = factory();
		}
	};
}};

app.use("/lib", express.static(__dirname + '/lib'));

app.use("/assets", express.static(__dirname + '/assets'));
app.use("/app.js", express.static(__dirname + '/app.js'));

app.get("/sitemap/:path", function(req, res) {
        res.redirect(apiBase + 'sitemap/' + req.params.path);
});
app.get("/sitemap/:path/:path2", function(req, res) {
        res.redirect(apiBase + 'sitemap/' + req.params.path + '/' + req.params.path2);
});

app.use(require('spider-detector').middleware());
app.set('views', './');

app.get('*/*.map', function (req, res) {
	res.status(404).send('Not Found');
});

app.get('*', function (req, res) {
	var data = {host:req.headers.host, url:req.url, title:site.title, description:site.description, image:site.image};
	if(!isSpider(req)) {
		return res.sendFile('./index.html', {root: __dirname});
	}
	res.render('crawlerMetadata.ejs', data);
});

app.listen(5300, function () {
  console.log('CPR app listening!');
});
