var login = require("facebook-chat-api");
var express = require('express');
var util = require('util');
var creds = require('./creds.js')

login({email: creds.email, password: creds.password}, function(err, api){
    
    if(err) return console.log(err);

    api.listen(function callback(err, message) {
    	if(message.threadID = creds.chatId && message.attachments && message.attachments[0].type == 'animated_image'){
    		if(queue.length < 100)
    			queue.push(message.attachments[0].rawGifImage);
    		else{
    			queue.shift();
    			queue.push(message.attachments[0].rawGifImage);
    		}
    	}
    });
});

var app = express();

var queue = ['https://media.giphy.com/media/v2rilyQAQJk9G/giphy.gif'];

app.get('/images', function (req, res) {
    res.send(queue[0]);
});

app.use('/', express.static('public'));

var server = app.listen(3000, function (){
	setInterval(function(){
		if(queue.length > 1)
			queue.shift();
	}, 5000)
});