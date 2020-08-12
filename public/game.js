socket.on('random_user_response', name=>{
    chosenName = name;
    console.log('before brryt');
    brrrrt(0, 10);
});
var question;
var chosenName;
var areAsking = "<span id='is-asking'><br>ARE ASKING A QUESTION...</span>";
var isAsking = "<span id='is-asking'><br>IS ASKING A QUESTION...</span>";
function startGame(){
    queryGET('/game', res=>{
        document.body.innerHTML = res;
//socketon
        if(isHost){
            socket.emit('get_random_user', lobby_id);
        }

    
      }, err=>{
        console.log("Error: " + err);
      });
}

function brrrrt(count, curve){
    setTimeout(() => {
        if(curve >= 400)
        {
            if(name == chosenName){
                document.getElementById('asker-name').innerHTML = "YOU" + areAsking;
            }else{
                document.getElementById('asker-name').innerHTML = chosenName + isAsking;
            }
            document.getElementById('asker-name').style.color = '#7faaff';
            document.getElementById('is-asking').style.visibility = 'visible';
            document.getElementById('is-asking').style.color = '#7faaff';
            setTimeout(askQuestion, 1800);
            return;
        }
        document.getElementById('asker-name').innerHTML = members[count % members.length] + isAsking;
        document.body.style.fontSize = '100px';
        
        brrrrt(++count, curve*1.1);
    }, curve);

}

function askQuestion(){
    if(name == chosenName){
        console.log('IM ASKING WEEE');
        queryGET('/asking', res=>{
            document.body.innerHTML = res;
            document.getElementById('asking-field').addEventListener('keypress', e=>{
                if(window.event.keyCode==13){e.preventDefault()}else{return;}
                if(document.getElementById('asking-field').value==''){alert('Ask a question, fool.');return;}
                question = document.getElementById('asking-field').value;
                socket.emit('ask_question', question)
                document.getElementById('asking-field').value='';

            });
    
          }, err=>{
            console.log("Error: " + err);
          });
    }
}

function askingChoice(shotTaker){
    if(shotTaker == 1){
        console.log('i took shot weee');
        
        // socket.emit('')
    }else{

    }
}