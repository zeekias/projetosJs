(function(){
    const btnEnviar = document.querySelector('#btn-enviar');
    const inputTextCpf = document.querySelector('#cpf');
    const resultado = document.querySelector('#resultado');
    let cpfVerificado =[];
    
    btnEnviar.addEventListener('click', (e)=>{
        e.preventDefault();
        const cpf = inputTextCpf.value;
        const cpfConvertido = Array.from(cpf);
        
        validaCPF(cpfConvertido);
        console.log(cpfConvertido, '', cpfVerificado);
    });
    
    function criarP(){
        const p = document.createElement('p');
        p.setAttribute('id', 'texto-resultado');
        return p;
    }
    const pResultado = criarP();
    function validaCPF(cpf){
        calcularDigitos(undefined,cpf);
        if(compararCpf(cpf, cpfVerificado)){
            pResultado.innerText = 'CPF VÁLIDO';
            pResultado.style.color = 'green';
            resultado.appendChild(pResultado);
        }else{
            pResultado.innerText = 'CPF INVÁLIDO';
            pResultado.style.color = 'red';
            resultado.appendChild(pResultado);
        }

    }

    function calcularDigitos(indTotal=10,cpf){
        indTotal < 11 ?  separarNovePrimeirosNumeros(cpf) : false; 

        const SomaEMulplicatDigito = cpfVerificado
        .map(function(cpf,indice){
            Number(cpf);
            let tmpaux = indTotal - indice;
            return cpf*(tmpaux);
        })
        .reduce(function(ac,totalMultiplicação){
            ac += totalMultiplicação;
            return ac;
        })
        let digito = 11 - (SomaEMulplicatDigito % 11);
        digito = digito > 9 ? 0 : digito;

        cpfVerificado.push(String(digito));
        
        indTotal === 10 ? calcularDigitos(11,cpf) : false;

    }

    function separarNovePrimeirosNumeros(cpf){
        cpfVerificado = cpf.filter(function(valor,indice){
            if(indice >=9){
                return false;
            }
            return true;   
        });
    }

    function compararCpf(cpf1,cpf2){
        return cpf1.length === cpf2.length && cpf1.every((value,index) => value === cpf2[index]);
    }

})();