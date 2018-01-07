let socket = io.connect('http://localhost:3000');

let btn = document.getElementById('msgbtn');
let msginput = document.getElementById('msginput');
let showbox = document.getElementById('showbox');

btn.addEventListener('click', () => {
    let msg = msginput.value;
    let data = { msg: msg};

    socket.emit('sendMessage', data);
});

socket.on('receiveMessage', (data) => {
    console.log('收到');

    let message = document.createElement('div');
    message.innerHTML = `${data.id}: ${data.msg}`;
    showbox.appendChild(message);
});

/*发送图片*/
let imginput = document.getElementById('imginput')
    ,sendimgbtn = document.getElementById('sendimgbtn');

let sendimg = () => {
  let formData = new FormData();
  let file = imginput.files[0];
  formData.append(file.name, file);

  //ajax
    let xhr = new XMLHttpRequest();
    xhr.open('post','/sendimg',true);
    xhr.send(formData);

    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4){
            if((xhr.status >= 200 && xhr.status <= 300) || (xhr.status === 304)) {
                console.log('成功');
                let data = {imgname: xhr.responseText};
                socket.emit('ajaxImgSuccess',data);
            }else{
                console.log(xhr.readyState, xhr.status)
            }
        }else{
            console.log(xhr.readyState);
        }
    }
};

sendimgbtn.onclick = () =>{
  sendimg();
};
socket.on('receiveAjaxImgSend', (data) => {
    let imgDIV = document.createElement('div');
    imgDIV.innerHTML = `<div>${data.id}: <img src="${data.imgUrl}"></div>`;
    showbox.appendChild(imgDIV);
});