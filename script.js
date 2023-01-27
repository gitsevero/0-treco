// Defina sua chave de API do OpenAI
const apiKey = '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';
const alerta = document.getElementById('alerta')

let palavraChave = 'bola'
const createInputs = document.getElementById('letter-inputs')



// Defina a URL da API
const apiUrl = 'https://api.openai.com/v1/completions';


// Cria a função para fazer a solicitação
function generateWords() {

    // Defina o texto de entrada
    const prompt = 'gere uma palavra usual aleatória';

    // Defina as configurações opcionais
    const options = {
        temperature: .5, // Controla a criatividade da resposta
        max_tokens: 10, // Controla o tamanho da resposta
        n: 1, // Controla o número de respostas geradas
    };

    // Cria o corpo da solicitação
    const requestBody = JSON.stringify({
        prompt: prompt,
        max_tokens: options.max_tokens,
        temperature: options.temperature,
        n: options.n,
        model: "text-davinci-003"
    });

    // Configuração da solicitação
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: requestBody
    };

    let container = document.getElementById("game-form");
    let contador = 0;

    fetch(apiUrl, requestOptions)


        .then(response => response.json())
        .then(data => {

            // Trata a resposta

            const text = data.choices[0].text;

            // filtrando a palavra
            let string = text;
            let letras = string.split('').filter(function (letra) {
                return /[a-zA-Z\u00C0-\u017F]/.test(letra);
            });


            // retornando em um array
            // tornado o array e uma palavra
            palavraChave = letras.join("");

            container.innerHTML = `<button type="submit" id="submit"></button>`
            contador = 0;


            // crinado os inputs de acordo com a quantidade de letras dessa palavras
            letras.forEach(function (letra) {
                contador += 1;
                container.innerHTML += `  <input type="text" maxlength="1" pattern="[a-zA-Z\u00C0-\u017F]*" oninput="nextInput(this)"  class="letter-input" tabindex="${contador}" >`
            });


            return palavraChave


        })




        .catch(error => {
            console.error(error);
        });

}
// criando os inputs








// MANIPULANDO OS INPUTS
let form = document.getElementById("game-form");
let zy = 2;

form.addEventListener("submit", function (e) {
    e.preventDefault();


    let inputs = document.getElementsByClassName("letter-input");

    // SE ALGUM IMPUT ESTIVER VAZIO 
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }
    }




    console.log(inputs)

    const array = Array.from(inputs)


    let palavras = ''



    // TRASNFORMA AS LETRAS DO INPUT  EM UMA PALAVRA
    array.forEach(function (e) {

        palavras += `${e.value}`
        e.value = '';

    });

    palavraChave = palavraChave.toLowerCase();
    palavras = palavras.toLowerCase();


    console.log(palavraChave)
    console.log(palavras)


    // COMPARA A PALAVRA VINDA DOS INPUT COM A PALAVRA SECRETA  
    if (palavras == palavraChave.toLowerCase()) {

        nivel += 1;
        nvtext.innerHTML = nivel;
        reset();

    } else if (zy !== 1) {

        resetCountdown();
        resetDeathLine();



        // TORNANDO A palavraChave EM ARRAY DE LETRAS
        let arrayDosInputs = palavras.split("");
        let arrayB = palavraChave.split("")


        // VERIFICA SE ALGUM DOS INPUTS ESTA NA PALAVRA CHAVE

        let historicalLetter = document.getElementById("historical-letter");
        if (historicalLetter) {
            let count = 0;
            arrayDosInputs.forEach((element, index) => {
                count++;
                if (arrayB.includes(element) && arrayB.indexOf(element) === index) {
                    let span = document.createElement("span");
                    span.innerHTML = element;
                    span.classList.add("blue-background");
                    historicalLetter.appendChild(span);

                } else if (arrayB.includes(element)) {

                    let span = document.createElement("span");
                    span.innerHTML = element;
                    span.classList.add("green-background");
                    historicalLetter.appendChild(span);

                } else {
                    let span = document.createElement("span");
                    span.innerHTML = element;
                    span.classList.add("red-background");
                    historicalLetter.appendChild(span);
                }
            }); if (count > 0) {
                let br = document.createElement("br");
                historicalLetter.appendChild(br);
            }
        }

        // REMOVE UMA VIDA NAS IMG 
        lostLife();
        // SE NAO ESTIVER  NA ULTIMA VIDA MORRE
    }





});
//Função para passar automaticamente para o próximo input
function nextInput(input) {
    let value = input.value;
    let isLetter = /^[a-zA-ZÀ-ſ]*$/.test(value);
    if (input.value !== "") {
        if (isLetter) {
            let nextInput = input.nextElementSibling;
            if (nextInput) {
                nextInput.focus();
            }
        } else {
            alert('SOMENTE LETRAS')
            input.value = "";


        }
    } else {
        let prevInput = input.previousElementSibling;
        if (prevInput) {
            prevInput.focus();
        }
    }

}

const gameForm = document.getElementById("game-form");
gameForm.addEventListener("keydown", function (event) {
    let currentInput = document.activeElement;
    if (event.keyCode === 37) {
        let prevInput = currentInput.previousElementSibling;
        if (prevInput) {
            prevInput.focus();
        }
    } else if (event.keyCode === 39) {
        let nextInput = currentInput.nextElementSibling;
        if (nextInput) {
            nextInput.focus();
        }
    }
});







// ----------------------------------------------------------------------
// !!! FUNCAO DAS DICAS !!!!


let dica = ''
let palavradica = 'nao deu'
const numberDica = document.getElementById('numberDica')
const dicacase = document.getElementById('dica');

numberDica.innerHTML = 1;

let numberDicaInterno = 1;
function criandoDica() {


    if (numberDicaInterno > 0) {
        numberDicaInterno -= 1;
        console.log(numberDicaInterno)
        numberDica.innerHTML -= 1;
        console.log(palavraChave)
        const prompt = `em um jogo de adivinhar palavras, crie uma dica  curta de para advinhar a palavra ${palavraChave} `;

        // Defina as configurações opcionais
        const options = {
            temperature: .5, // Controla a criatividade da resposta
            max_tokens: 30, // Controla o tamanho da resposta
            n: 1, // Controla o número de respostas geradas
        };

        // Cria o corpo da solicitação
        const requestBody = JSON.stringify({
            prompt: prompt,
            max_tokens: options.max_tokens,
            temperature: options.temperature,
            n: options.n,
            model: "text-davinci-003"
        });

        // Configuração da solicitação
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: requestBody
        };



        // Executa a solicitação
        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                // Trata a resposta
                console.log(data)

                const text1 = data.choices[0].text;
                console.log(text1)
                palavradica = text1

                console.log(palavradica)
                const str = palavradica.split("");

                (function animate() {
                    str.length > 0 ? dicacase.innerHTML += str.shift() : clearTimeout(running);
                    var running = setTimeout(animate, 90);
                })();



            })




            .catch(error => {
                console.error(error);
            });
    } else {
        alert('VOÇÊ NÃO TEM MAIS DICAS!')
    }



}



function alert(Alert) {
    alerta.innerHTML = `${Alert}`
    setInterval(function () {
        alerta.innerHTML = '';
    }, 5000);


}
function reset() {
    mensagemCounter();
    deleteHistorico();
    deathDisplay();
    generateWords();
    setTimeout(function () {
        deathDisplay();
        deleteMensagemCounter();
        startHistorico();



    }, 10000);


}
function lostLife() {
    if (zy == 1) {

        alert("Você morreu")
    } else {
        resetCountdown();
        let imgElements = document.querySelectorAll("#vidas img");
        let imgArray = Array.from(imgElements);
        let vidas = document.querySelector("#vidas");
        imgArray.pop();
        let imgToRemove = imgArray[imgArray.length - 1];
        vidas.removeChild(imgToRemove);
        zy -= 1;
    }



};
function resetMorreu() {
    deathDisplay();
    deleteHistorico();


};
function resetDeathLine() {
    let dea = document.getElementById('deadline')
    let dio = dea.innerHTML;
    dea.innerHTML = '';
    dea.innerHTML = dio;

};












