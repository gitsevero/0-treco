// Defina sua chave de API do OpenAI
const apiKey = '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';

let palavraChave = 'bola'
const createInputs = document.getElementById('letter-inputs')



// Defina a URL da API
const apiUrl = 'https://api.openai.com/v1/completions';


// Cria a função para fazer a solicitação
function generateWords() {






    console.log('comecou a funcao')
    // Defina o texto de entrada
    const prompt = '  uma palavra em portugues que tenha no maximo 5 letras ';

    // Defina as configurações opcionais
    const options = {
        temperature: 1, // Controla a criatividade da resposta
        max_tokens: 20, // Controla o tamanho da resposta
        n: 1, // Controla o número de respostas geradas
    };

    // Cria o corpo da solicitação
    const requestBody = JSON.stringify({
        prompt: prompt,
        max_tokens: options.max_tokens,
        temperature: options.temperature,
        n: options.n,
        model: "text-davinci-001"
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
    console.log('Executa a solicitação')
    fetch(apiUrl, requestOptions)

        .then(response => response.json())
        .then(data => {

            // Trata a resposta
            console.log(data)

            const text = data.choices[0].text;

            // filtrando a palavra
            let string = text;
            let letras = string.split('').filter(function (letra) {
                return /[a-zA-Z\u00C0-\u017F]/.test(letra);
            });


            // retornando em um array
            // tornado o array e uma palavra
            palavraChave = letras.join("");
            let container = document.getElementById("game-form");
            let contador = 0;


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


// Chama a função no evento onload do body
document.body.onload = generateWords;







// MANIPULANDO OS INPUTS
let form = document.getElementById("game-form");
let zy = 4;
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

    //    mapeando a div com as imagens das vidas
    let palavras = ''
    let imgElements = document.querySelectorAll("#vidas img");
    let imgArray = Array.from(imgElements);

    let vidas = document.querySelector("#vidas");


    // TRASNFORMA AS LETRAS DO INPUT  EM UMA PALAVRA
    array.forEach(function (e) {

        palavras += `${e.value}`

    });



    console.log(palavras + "=fora")
    console.log(palavraChave + '99')


    // COMPARA A PALAVRA VINDA DOS INPUT COM A PALAVRA SECRETA  
    if (palavras == palavraChave.toLowerCase()) {


        alert('voce acerteu')



    } else if (zy != 1) {


        zy -= 1;

        console.log(zy)


        // tornando a palavra chave em miniscula
        palavraChave = palavraChave.toLowerCase();

        // TORNANDO A palavraChave EM ARRAY DE LETRAS
        let arrayDosInputs = palavras.split("");
        let arrayB = palavraChave.split("")

        console.log(arrayDosInputs)

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
        imgArray.pop();
        let imgToRemove = imgArray[imgArray.length - 1];
        vidas.removeChild(imgToRemove);




        // SE NAO ESTIVER  NA ULTIMA VIDA MORRE
    } else if (zy === 1) {

        alert("Você morreu");
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
            } else {
                checkWord();
            }
        } else {
            alert('somente numeros')
            input.value = "";


        }
    } else {
        let prevInput = input.previousElementSibling;
        if (prevInput) {
            prevInput.focus();
        } else {
            checkWord();
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
        const prompt = `em um jogo de advinhar palavras crie uma dica curta de para advinhar a palavra ${palavraChave}  `;

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
            model: "text-davinci-002"
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
        alert('voçê não tem mais dicas')
    }



}












