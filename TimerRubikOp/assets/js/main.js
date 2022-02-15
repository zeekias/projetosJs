function timerRubik(){
const container = document.querySelector('.container');
const timer = document.querySelector('#timer');
const listaTimer = document.querySelector('#lista-timer');
let intervaloTimer;
let numeroTimer = [0,0,0];
let contadorGeral;
let startTimer = true;

function iniciarTimer(){
    timer.setAttribute('id', 'p-tempo-iniciado');
    contadorGeral = 0;
    startTimer = false;
     intervaloTimer = setInterval(function(){
        numeroTimer[2] += 1;
        contadorGeral +=1;
        //numeroTimer[2] >= 100 ? numeroTimer[2] = 0 : false;
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
let menorTempo = 80000;

function rankearTimers(contadorGeral){
    timerSalvos.push(contadorGeral);
    menorTempo = menorTempo >= contadorGeral ? contadorGeral : menorTempo; 
}
const pRank = criarP();
pRank.innerText = '';
pRank.setAttribute('id', 'melhores-tempos');
container.appendChild(pRank);

function isLocalStorageExists(){
    if(localStorage.getItem('menorTempo')){
        return true;
    }
    return false;
}
function rankTimer(){
    menorTempoString = isLocalStorageExists() ? regastarTempoInLocalStorage() : `MENOR TEMPO: ${menorTempo/100} Segundos`; 
    pRank.innerText = menorTempoString;
    console.log(menorTempoString);
    salvarTempoInLocalStorage(menorTempoString);
}
function regastarTempoInLocalStorage(){
        const menorTempoJSON = localStorage.getItem('menorTempo')
        const menorTempoString = JSON.parse(menorTempoJSON);
        console.log(menorTempoString);
        return menorTempoString;
        
}
function salvarTempoInLocalStorage(menorTempoString){
    const menorTempoJSON = JSON.stringify(menorTempoString);
    localStorage.setItem('menorTempo', menorTempoJSON);
}
rankTimer();
document.addEventListener('keyup', (e)=>{
    if(e.keyCode === 32){
        startTimer ===false ? pararTimer(): iniciarTimer();
    }
});
}
timerRubik();