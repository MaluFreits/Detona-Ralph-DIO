/*sentido semantico para o que vai aparecer no jogo*/
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelectorAll("#time-left"),
        score: document.querySelectorAll("#score"),
    
    },
    value: {
        timerId : null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
      },
    };
    /*toda vez que eu quiser chamar é so fazer o state.view.(nome da variavel) */ 
    
    function countDown(){
        state.value.currentTime--;
        state.view.timeLeft.textContent = state.value.currentTime;
    
        if(state.value.currentTime <= 0){
            alert("Game Over! O seu resultado foi: " + state.value.result);
            
        }
    }
    
    function playSound(){
        let audio = new audio("../audios/src_audios_hit.m4a")
        audio.volume = 0.2;
        audio.play();
    }
    
    function randomSquare(){
        state.view.squares.forEach((square)=>{
            square.classList.remove("enemy");
        });
    
    
        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.value.hitPosition = randomSquare.id;
    }
    function moveEnemy(){
    state.value.timerId = setInterval(randomSquare, state.value.gameVelocity);
    }
    
    
    /*essa função é para alguem ficar ouvindo alguma ação ex:o som fica esperando a ação para executar */
    function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", () => {
            if (square.id === state.value.hitPosition) {
                state.value.result++
                state.view.score.textContent = state.value.result;
                state.value.hitPosition = null;
                audio.play();
            }
        });
    });
    }
    
    /*ter uma função principal para chamar funções iniciais (init/initialize/main*/ 
    function initialize() {
        moveEnemy ();
        addListenerHitBox();
    }
    
    initialize();