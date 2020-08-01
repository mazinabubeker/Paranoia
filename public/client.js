// socket.emit('event', data)
// socket.on('event', data)

var numUsers = 0;
var isHost = false;
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
        document.getElementById("page-join").style.display="none";
        document.getElementById("lobby-label").innerHTML = lobby_id;
        socket.emit('get_current_users', lobby_id);
        socket.on('get_current_users_response', allUsers=>{
            for(var i = 0; i < allUsers.length; i++){
                addUserToLobby(allUsers[i]);
            }
            document.getElementById("page-lobby").style.display="flex";
        });

        socket.on('start_game_response', startGame);
        

        //  Entering name
        document.getElementById('username-field').addEventListener('keypress', e=>{
            if(window.event.keyCode==13){}else{return;}
            if(document.getElementById('username-field').value==''){return;}
            name = document.getElementById('username-field').value;
            socket.emit('add_user', {"data1":name, "data2":lobby_id});
        });

        socket.on('username_attempt', nameAvailable=>{
            if(nameAvailable){
                document.getElementById('username-field').style.display = "none";
                addUserToLobby(name);
                
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

        isHost = true;

    
        //  Entering name
        document.getElementById('username-field').addEventListener('keypress', e=>{
            if(window.event.keyCode==13){}else{return;}
            if(document.getElementById('username-field').value==''){return;}
            name = document.getElementById('username-field').value;
            socket.emit('add_user', {"data1":name, "data2":lobby_id});
        });

        socket.on('username_attempt', nameAvailable=>{
            if(nameAvailable){
                document.getElementById('username-field').style.display = "none";
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

function endLobby(){
    socket.emit('start_game', lobby_id);
    document.querySelector('html').style.display = 'none';
    document.querySelector('body').innerHTML = '';
    startGame();
}

function addUserToLobby(newname){
    numUsers++;
    if(numUsers >= 3 && isHost && !(document.getElementById('start-button'))){
        var start_btn = `<div class="button" onclick="endLobby()" id="start-button">START GAME</div>`;
        document.getElementById("lobby-label").insertAdjacentHTML("beforebegin", start_btn);
    
    }
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
        if(window.event.keyCode==13){e.preventDefault()}else{return;}
        if(document.getElementById('gamecode-field').value==''){alert('Invalid lobby ID.');return;}
        lobby_id = document.getElementById('gamecode-field').value;
        socket.emit('join_lobby', lobby_id)
        document.getElementById('gamecode-field').value='';
    });
}