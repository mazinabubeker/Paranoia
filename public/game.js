var chosenName;
var isAsking = "<span id='is-asking'><br>IS ASKING A QUESTION...</span>";
function startGame(){
    queryGET('/game', res=>{
        document.body.innerHTML = res;
        if(isHost){
            socket.emit('get_random_user', lobby_id);
        }
        socket.on('random_user_response', name=>{
            chosenName = name;
            brrrrt(0, 10);
        });
    
      }, err=>{
        console.log("Error: " + err);
      });
}

function brrrrt(count, curve){
    setTimeout(() => {
        if(curve >= 400)
        {
            document.getElementById('asker-name').innerHTML = chosenName + isAsking;
            document.getElementById('asker-name').style.color = 'blue';
            document.getElementById('is-asking').style.color = 'blue';

            setTimeout(askQuestion, 1000);
            return;
        }
        document.getElementById('asker-name').innerHTML = members[count % members.length] + isAsking;
        document.body.style.fontSize = '100px';
        
        brrrrt(++count, curve*1.1);
    }, curve);

}

function askQuestion(){
    if(name == chosenName){
        console.log('IM GETTING ASKED WEEE');
    }
}