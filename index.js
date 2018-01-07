const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const formidable = require('formidable');
const path = require('path');

app.use(express.static('./public'));
app.use('/static', express.static(path.join(__dirname, './static')));

/*发送图片*/
app.post('/sendimg', (req, res, next) => {
   let imgname = null;
   let form = new formidable.IncomingForm();
   form.uploadDir = './static/images';
   form.parse(req, (err, fields, files) => {
       res.send(imgname);
   });
   form.on('fileBegin', (name,file) => {
       file.path = path.join(__dirname, `./static/images/${file.name}`);
       imgname = file.name;
   })
});

/*socket 逻辑*/
io.on('connection', (socket) => {
    //群聊
    socket.on('sendMessage', (data) => {
        /* socket.id是socket的一个属性，存着这次socket连接的id，是唯一标识的，我们实现私聊就可以通过该id找到用户。*/
        data.id = socket.id;
        /*io.emit是触发广播的一个api，他可以将消息广播给所有用户，这就实现了群聊的功能。*/
        io.emit('receiveMessage', data)
    });

    /*发送图片*/
    socket.on('ajaxImgSuccess', (data) => {
        data.id = socket.id;
        data.imgUrl = `/static/images/${data.imgname}`;
        io.emit('receiveAjaxImgSend', data);
    })
});

server.listen(3000, () => {
    console.log('server running at htttp://localhost:3000, press ctrl-c to terminal!');
});