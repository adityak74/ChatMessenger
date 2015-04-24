var http = require('http');
var express = require('express');
var socket = require('socket.io');
var app = express();
var server = http.createServer(app);
var io = socket.listen(server);
var nickname = "";
var typing_user = "";

io.sockets.on('connection',function(client){
	console.log("Client connected...");
	client.emit('messages', 'Welcome to NodeJS Messenger');

	client.on('typing',function(name){
		client.typing_user = name;
		typing_user = name;
		client.broadcast.emit("messages", typing_user + " is typing");
	});

	/*
	client.on('nottyping',function(name){
		client.typing_user = name;
		typing_user = name;
		client.broadcast.emit("messages", typing_user + " stopped typing");
	});
	*/

	client.on('join',function(name){
		client.username = name;
		nickname = name;
	});

	client.on('messages', function(data){
		//console.log(data);
		client.broadcast.emit("messages" , nickname + ": " + data);
	});
});
server.listen(8080);