

var $ = jQuery;
var animationTime = 40,
    days = 14;
const btnstart = document.getElementById('start');
const contadorContainer = document.getElementById('contadorcontainer');
const front = document.getElementById("front");
const historico = document.getElementById('historico');
let resetdeath = document.getElementById('submit');
const nvtext = document.getElementById('nivel')
let nivel = 0;
let display = document.getElementById('deadline');






btnstart.addEventListener("click", function () {

    generateWords();
    mensagemCounter();
    front.classList.add("caiu");

    setTimeout(function () {
        removeIntro();
    }, 1200);


    setTimeout(function () {
        deathDisplay();
        startHistorico();
        headerEntry();
        deleteMensagemCounter();
        console.log('oi')




        $('#progress-time-fill, #death-group').css({ 'animation-duration': animationTime + 's' });


        deadlineText();

        deadlineAnimation();
        timer(animationTime, days);

        setInterval(function () {
            timer(animationTime, days);
            deadlineAnimation();

            console.log('begin interval', animationTime * 1000);

        }, animationTime * 1000);



    }, 10000);
});

function headerEntry() {

    const div = document.querySelector('.sub-header');
    div.style.display = 'flex'

}





function mensagemCounter() {
    if (nivel === 0) {
        contadorContainer.innerHTML = "";
        contadorContainer.innerHTML += `<p id="yready">VOCÊ ESTÁ PRONTO?</p> <span id="counter"></span>`
    } else {
        contadorContainer.innerHTML = "";
        contadorContainer.innerHTML += `<p id="yready">PARABENS <br> VAMOS PARA O NIVEL ${nivel}</p> <span id="counter"></span>`
        contadorContainer.style.zIndex = 2;
    }

};
function deleteMensagemCounter() {
    contadorContainer.innerHTML = "";
    contadorContainer.style.zIndex = -1;
}


function removeIntro() {
    const front = document.getElementById("front");
    const parent = front.parentNode;
    parent.removeChild(front);


}
function startHistorico() {
    historico.innerHTML += ` <h3 id="title-historico">Historico:</h3>
    <p id="historical-letter"> </p>`;

};
function deleteHistorico() {
    historico.innerHTML = ``;

}

// CRONOMETRO

let count = 40;
let intervalId;

function countdown() {
    intervalId = setInterval(function () {
        count--;
        console.log(count)
        if (count === 0) {
            alert("ACABOU O TEMPO");
            lostLife();
            resetDeathLine();
            clearInterval(intervalId);
        }
    }, 1000);
}

function resetCountdown() {
    clearInterval(intervalId);
    count = 40;
    countdown();
}



// ANIMMATION


var deadlineAnimation = function () {
    countdown();
    setTimeout(function () {
        $('#designer-arm-grop').css({ 'animation-duration': '3s' });
    }, 0);

    setTimeout(function () {
        $('#designer-arm-grop').css({ 'animation-duration': '2s' });
    }, 4000);

    setTimeout(function () {
        $('#designer-arm-grop').css({ 'animation-duration': '1.4s' });
    }, 8000);

    setTimeout(function () {
        $('#designer-arm-grop').css({ 'animation-duration': '0.6s' });
    }, 12000);

    setTimeout(function () {
        $('#designer-arm-grop').css({ 'animation-duration': '0.4s' });
    }, 15000);
};
var deadlineText = function () {
    var $el = $('.deadline-days');
    var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
    $el.html(html);
}

function timer(totalTime, deadline) {
    var time = totalTime * 2000;
    var dayDuration = time / deadline;
    var actualDay = deadline;

    var timer = setInterval(countTime, dayDuration);

    function countTime() {
        --actualDay;
        $('.deadline-days .day').text(actualDay);

        if (actualDay == 0) {
            clearInterval(timer);
            $('.deadline-days .day').text(deadline);
        }
    }
}

// display da animacao da morte
function deathDisplay() {
    if (display.style.display === '') {
        display.style.display = 'block'
    } else {
        display.style.display = ''
    }


}








