// socket.emit('event', data)
// socket.on('event', data)

var socket;
var lobby_id;
$(document).ready(function(){    
    socket = io();
    socket.on('check_lobby_response', lobbyCreationAttempt)
});

function lobbyCreationAttempt(val){
    console.log("Server responded with: ");
    console.log(val);
    if(val){
        document.getElementById("page-landing").style.display="none";
        document.getElementById("page-lobby").style.display="flex";
        document.getElementById("lobby-label").innerHTML = lobby_id;

        // var lobby_user = `<div class="user">` + document.getElementById("username-field").value + `</div>`;
        // document.getElementById("lobby-list").insertAdjacentHTML("afterbegin", lobby_user);
    }else{
        createLobby();
    }
}

function createLobby(){
    lobby_id = Math.floor(Math.random()*9000+1000);
    socket.emit('create_lobby', lobby_id);
}

function joinLobby(){
    document.getElementById("page-landing").style.display="none";
    document.getElementById("page-join").style.display="flex";
}