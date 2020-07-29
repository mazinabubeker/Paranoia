// socket.emit('event', data)
// socket.on('event', data)


var socket;
$(document).ready(function(){    
    socket = io();
});


function createLobby(){
    var lobby_id;
    do{
        lobby_id = Math.floor(Math.random()*10000);
        var status_response;
        queryPOST('/create_lobby', lobby_id, res=>{
            console.log("GET successful:");
            console.log(res);
            status_response = res;
        }, err=>{
            console.log("Error:");
            console.log(err);
        });
    }while(!status_response);
    document.getElementById("page-landing").style.display="none";
    document.getElementById("page-lobby").style.display="flex";
    document.getElementById("lobby-label").innerHTML = lobby_id;


    var lobby_user = `<div class="user">` + document.getElementById("username-field").value + `</div>`;
    document.getElementById("lobby-list").insertAdjacentHTML("afterbegin", lobby_user);

}

function joinLobby(){
    document.getElementById("page-landing").style.display="none";
    document.getElementById("page-join").style.display="flex";
}



// SAMPLE GET REQUEST:
/*
queryPOST(url, res=>{
    console.log("GET successful:");
    console.log(res);
}, err=>{
    console.log("Error:");
    console.log(err);
});

// SAMPLE POST REQUEST:

queryPOST('/query_post', {name: "Mazin Abubeker", age: 22}, res=>{
    console.log("POST successful:");
    console.log(res);
}, err=>{
    console.log("Error:");
    console.log(err);
});
*/



function queryPOST(url, query, successCallback, errorCallback){
    const options = {method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: query.toString()
                };
    fetch(url, options)
    .then(resp => resp.text())
    .then(res=>{
        successCallback(res);
    })
    .then(err=>{
        if(err){
            errorCallback(err);
        }
    });
}



function queryGET(url, successCallback, errorCallback){
    const options = {method: 'GET',
                    headers: {
                        'Content-Type': 'html/text'
                    },
                };
    fetch(url, options)
    .then(resp => resp.text())
    .then(text=>{
        successCallback(text);
    })
    .then(err=>{
        if(err){
            errorCallback(err);
        }
    });
}