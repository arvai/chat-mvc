var express = require('express'),
	bodyParser = require('body-parser'),
	app = express();


app.use(express.static(__dirname));
app.use(bodyParser());

var id = 1;

app.post('/folder/photos', function(req, res){
	var body = req.body;
	if (body && body.src) {
		setTimeout(function() {
			return res.send({
				src: body.src,
				id: id++
			});
		}, Math.random() * 1000);
	}
});

app.listen(3000);