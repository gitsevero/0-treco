var nivel = 0;

function nextLvl() {
    mensagem();
    console.log("NEXT")
    historico.innerHTML += ``;

    let display = document.getElementById('deadline');
    display.style.display = 'none'
    setTimeout(function () {
        generateWords();
    }, 10000);

}
