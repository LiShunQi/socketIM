let group1 = document.getElementById('group1')
    ,group2 = document.getElementById('group2')
    ,msginput = document.getElementById('msginput')
    ,chatbox = document.getElementById('chatbox')
    ,sendmsg = document.getElementById('sendmsg');

let group1func = () => {
  console.log('group1');
  seajs.use(['./js/group1.js'], (socket) => {
    chat(socket);
  })
};

let group2func = () => {
    console.log('group2');
    seajs.use(['./js/group2.js'], (socket) => {
        chat(socket);
    })
};

group1.onclick = group1func;
group2.onclick = group2func;

let chat = (socket) => {
    sendmsg.addEventListener('click',() => {
        let msg = msginput.value;
        let data = {msg: msg};
        socket.emit('sendMsg',data);
    });
    socket.on('receiveMsg', (data) => {
        let div = document.createElement('div');
        div.innerHTML = `${data.id}: ${data.msg}`;
        chatbox.appendChild(div);
    })
};