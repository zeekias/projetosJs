function timerRubik(){
const container = document.querySelector('.container');
const timer = document.querySelector('#timer');
const listaTimer = document.querySelector('#lista-timer');
let intervaloTimer;
let numeroTimer = [0,0,0];
let contadorGeral;
let startTimer = true;
const avisoTimer = document.querySelector('#aviso');
const modelTextAviso = ['APERTE ESPAÇO PARA INICIAR', 'APERTE ESPAÇO PARA PARAR'];

function iniciarTimer(){
    avisoTimer.innerText = modelTextAviso[1];
    timer.setAttribute('id', 'p-tempo-iniciado');
    contadorGeral = 0;
    startTimer = false;
     intervaloTimer = setInterval(function(){
        numeroTimer[2] += 1;
        contadorGeral +=1;
        if(numeroTimer[2]>100){
            numeroTimer[2]=0;
            numeroTimer[1]++;
            if(numeroTimer[1]>59){
                numeroTimer[1] =0;
                numeroTimer[0]++;
            }
        }
        mostrarTempo();
    },10);

}
function pararTimer(){
    avisoTimer.innerText = modelTextAviso[0];
    timer.setAttribute('id', 'p-tempo-parado');
    startTimer =true;
    rankearTimers(contadorGeral);
    rankTimer();
    salvarTempo();
    numeroTimer = [0,0,0];
    clearInterval(intervaloTimer);
}
function mostrarTempo(){
    if(numeroTimer[0] > 0){
        timer.innerText = numeroTimer[0] + ':' + numeroTimer[1] + ':' + numeroTimer[2];
    }else{
        timer.innerText = numeroTimer[1] + ':' + numeroTimer[2];
    }
}
function criarLi(){
    const liTimer = document.createElement('li');
    return liTimer;
}
function criarP(){
    const pLiTimer = document.createElement('p');
    return pLiTimer;
}
function salvarTempo(){
    const liTimer = criarLi();
    const pLiTimer = criarP();
    pLiTimer.setAttribute('class', 'p-das-li');
    pLiTimer.innerText = numeroTimer[0] + ':' + numeroTimer[1] +':' + numeroTimer[2];
    liTimer.appendChild(pLiTimer);
    listaTimer.appendChild(liTimer);
}
const timerSalvos = [];
let menorTempo = 800;

function rankearTimers(contadorGeral){
    timerSalvos.push(contadorGeral);
    menorTempo = menorTempo >= contadorGeral ? contadorGeral : menorTempo; 
}
const pRank = criarP();
pRank.innerText = '';
pRank.setAttribute('id', 'melhores-tempos');
container.appendChild(pRank);

function rankTimer(){
    menorTempoString =`MENOR TEMPO: ${menorTempo/100} Segundos`;
    pRank.innerText = menorTempoString;
}

document.addEventListener('keyup', (e)=>{
    if(e.keyCode === 32){
        startTimer ===false ? pararTimer(): iniciarTimer();
    }
});
}
timerRubik();