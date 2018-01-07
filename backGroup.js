/*服务端实现分组主要依靠两个api：
socket.join()
socket.leave()
一个负责添加用户，一个负责删除。
socket.to负责找到该组别*/

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('./public'));

/*socketio 逻辑*/
io.on('connection', (socket) => {
   socket.on('addgroup1', () => {
       socket.join('group1', () => {
           let data = {id: '系统用户', msg: '新用户加入'};
           socket.to('group1').emit('receiveMsg', data);
           console.log(Object.keys(socket.rooms));
       })
   });

   socket.on('addgroup2', () => {
       socket.join('group2', () => {
           let data = {id: '系统用户', msg: '新用户加入'};
           socket.to('group2').emit('receiveMsg', data);
           console.log(Object.keys(socket.rooms));
       })
   });

   socket.on('sendMsg', (data) => {
       data.id = socket.id;
       io.emit('receiveMsg', data);
   });

   socket.on('sendToOurGroup', (data) => {
       data.id = socket.id;
       let groups = Object.keys(socket.rooms);
       for(let i = 0;i < groups.length;i++){
           socket.to(groups[i]).emit('receiveMsg', data);
       }
       socket.emit('receiveMsg', data);
   })
});

server.listen(3000, () => {
    console.log('server start on http:localhost:3000');
});