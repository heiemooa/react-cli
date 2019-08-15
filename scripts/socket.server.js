let express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  users = [];
server.listen(process.env.PORT || 8081);// publish to heroku
io.sockets.on('connection', function (socket) {
  //用户登录
  socket.on('login', function (username) {
    if (!username) {
      socket.emit('loginFail');
      return;
    }
    if (users.indexOf(username) > -1) {
      socket.emit('repeatLogin', username, users);
    } else {
      socket.username = username;
      users.push(username);
      socket.emit('loginSuccess', username, users);
      io.sockets.emit('system', username, users, 'login');
    }
  });

  //用户断开socket连接
  socket.on('disconnect', function () {
    if (!socket.username) return;
    users.splice(users.indexOf(socket.username), 1);
    socket.broadcast.emit('system', socket.username, users, 'logout');
  });

// new message get
  socket.on('postMsg', function (msg, color) {
    socket.broadcast.emit('newMsg', socket.username, msg, color);
  });
// new image get
  socket.on('img', function (imgData, color) {
    socket.broadcast.emit('newImg', socket.username, imgData, color);
  });
});
