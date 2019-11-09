var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.post('/', (req, res)=>{
//
// });
app.listen(8080);
module.exports = app;

// var http = require('http');
// var fs = require('fs');
// // Chargement du fichier index.html affiché au client
// var server = http.createServer(function(req, res) {
//     fs.readFile('./index.html', 'utf-8', function(error, content) {
//         res.writeHead(200, {"Content-Type": "text/html"});
//         res.end(content);
//     });
// });
// // Chargement de socket.io
// var io = require('socket.io').listen(server);
// // Quand on client se connecte, on le note dans la console
// io.sockets.on('connection', function (socket) {
//     console.log('Un client est connecté !');
//     socket.on('nouveau', (pseudo)=>{
//         socket.pseudo = pseudo;
//         socket.broadcast.emit('messageBrodcast', socket.pseudo + ' a rejoint le Chat !');
//     });
//     socket.emit('connexionEtablie', 'Vous êtes bien connecté !');
//
//
//     socket.on('message', (msg)=>{
//         socket.broadcast.emit(socket.pseudo + ': ' + msg);
//     })
//
// });
//
//
// server.listen(8080);