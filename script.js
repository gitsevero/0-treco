// Defina sua chave de API do OpenAI
const apiKey = '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';
let palavraChave = 'bola'
const createInputs = document.getElementById('letter-inputs')

// Defina a URL da API
const apiUrl = 'https://api.openai.com/v1/completions';

// Cria a função para fazer a solicitação
function generateWords() {
    // Defina o texto de entrada
    const prompt = 'gere apenas uma palavra  em "pt-br"';

    // Defina as configurações opcionais
    const options = {
        temperature: .5, // Controla a criatividade da resposta
        max_tokens: 20, // Controla o tamanho da resposta
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

            const text = data.choices[0].text;
            console.log(text)


            let string = text;
            let letras = string.split('').filter(function (letra) {
                return /[a-zA-Z\u00C0-\u017F]/.test(letra);
            });



            let container = document.getElementById("game-form");
            let contador = 0;

            letras.forEach(function (letra) {
                contador += 1;

                container.innerHTML += `  <input type="text" maxlength="1" pattern="[a-zA-Z\u00C0-\u017F]*" oninput="nextInput(this)"  class="letter-input" tabindex="${contador}">`
            });

            palavraChave = text
            return palavraChave




        })



        .catch(error => {
            console.error(error);
        });

}
// criando os inputs


// Chama a função no evento onload do body
// document.body.onload = generateWords;





// verificando se tem somente letras


let form = document.getElementById("game-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let inputs = document.getElementsByClassName("letter-input");

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }
    }

    console.log(inputs)
    const array = Array.from(inputs)
    let palavras = ''





    array.forEach(function (e) {

        palavras += `${e.value}`

    });
    console.log(palavras)
    console.log(palavraChave)
    if (palavras = palavraChave) {
        alert('voce acerteu')
    } else {
        alert('voce errrou')
    }





});
//Função para passar automaticamente para o próximo input
function nextInput(input) {
    let value = input.value;
    let isLetter = /^[a-zA-ZÀ-ſ]*$/.test(value);
    if (isLetter) {
        let nextInput = input.nextElementSibling;
        if (nextInput) {
            nextInput.focus();
        } else {
            checkWord();
        }
    } else {
        alert('somente numeros')
        input.value = "";


    }
}
let dica = ''
let palavradica = 'nao deu'

const numberDica = document.getElementById('numberDica')
const dicacase = document.getElementById('dica');
numberDica.innerHTML = 3;

function criandoDica() {
    numberDica.innerHTML -= 1;
    const prompt = `crie uma dica curta de  para advinhar a palavra ${palavraChave} sem citar ela `;

    // Defina as configurações opcionais
    const options = {
        temperature: 1, // Controla a criatividade da resposta
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



}












