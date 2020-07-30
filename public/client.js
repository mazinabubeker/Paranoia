// socket.emit('event', data)
// socket.on('event', data)

var socket;
var lobby_id;
var name;
$(document).ready(function(){    
    socket = io();
    socket.on('check_lobby_response', lobbyCreationAttempt)
    socket.on('check_join_response', joinLobbyAttempt)
});

function joinLobbyAttempt(val){
    console.log("Server responded with: ");
    console.log(val);
    if(val){
        document.getElementById("page-landing").style.display="none";
        document.getElementById("page-lobby").style.display="flex";
        document.getElementById("lobby-label").innerHTML = lobby_id;

        //  Entering name
        document.getElementById('username-field').addEventListener('keypress', e=>{
            if(window.event.keyCode==13){}else{return;}
            if(document.getElementById('username-field').value==''){return;}
            name = document.getElementById('username-field').value;
            socket.emit('add_user', {"data1":name, "data2":lobby_id});
        });

        socket.on('username_attempt', nameAvailable=>{
            if(nameAvailable){
                addUserToLobby(newname);
            }else{
                alert('Name already taken bozo');
            }
        })

        socket.on('user_add', newname=>{
            addUserToLobby(newname);
        });

    }else{
        alert('Invalid lobby ID.');
    }
}


function lobbyCreationAttempt(val){
    console.log("Server responded with: ");
    console.log(val);
    if(val){
        document.getElementById("page-landing").style.display="none";
        document.getElementById("page-lobby").style.display="flex";
        document.getElementById("lobby-label").innerHTML = lobby_id;

        //  Entering name
        document.getElementById('username-field').addEventListener('keypress', e=>{
            if(window.event.keyCode==13){}else{return;}
            if(document.getElementById('username-field').value==''){return;}
            name = document.getElementById('username-field').value;
            socket.emit('add_user', {"data1":name, "data2":lobby_id});
        });

        socket.on('username_attempt', nameAvailable=>{
            if(nameAvailable){
                addUserToLobby(name);
            }else{
                alert('Name already taken bozo');
            }
        })

        socket.on('user_add', newname=>{
            addUserToLobby(newname);
        });

    }else{
        createLobby();
    }
}

function addUserToLobby(newname){
    var lobby_user = `<div class="lobby-user">` + newname + `</div>`;
    document.getElementById("lobby-list").insertAdjacentHTML("afterbegin", lobby_user);
}

function createLobby(){
    lobby_id = Math.floor(Math.random()*9000+1000);
    socket.emit('create_lobby', lobby_id);
}

function joinLobby(){
    document.getElementById("page-landing").style.display="none";
    document.getElementById("page-join").style.display="flex";
    document.getElementById('gamecode-field').addEventListener('keypress', e=>{
        if(window.event.keyCode==13){}else{return;}
        if(document.getElementById('gamecode-field').value==''){return;}
        socket.emit('join_lobby', document.getElementById('gamecode-field').value)
    });
}