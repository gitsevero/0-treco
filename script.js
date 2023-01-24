// Defina sua chave de API do OpenAI
const apiKey = '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';

// Defina a URL da API
const apiUrl = 'https://api.openai.com/v1/completions';

// Cria a função para fazer a solicitação
function generateWords() {
    // Defina o texto de entrada
    const prompt = 'create a five letter word on portuguese brazil';

    // Defina as configurações opcionais
    const options = {
        temperature: 1, // Controla a criatividade da resposta
        max_tokens: 100, // Controla o tamanho da resposta
        n:1, // Controla o número de respostas geradas
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
            console.log(data);
            const text = data.choices[0].text;
            console.log(text);
            // Utilize o texto gerado pelo ChatGPT-3 para gerar palavras aleatórias para o seu jogo.
            let words = text.split(" ");
            // use aqui sua lógica para selecionar as palavras
            console.log(words)
        })
        .catch(error => {
            console.error(error);
        });
}

// Chama a função no evento onload do body
document.body.onload = generateWords;

