
// Init
var $ = jQuery;
var animationTime = 40,
    days = 14;
const btnstart = document.getElementById('start');
const contadorContainer = document.getElementById('contadorcontainer');
const front = document.getElementById("front");
const historico = document.getElementById('historico');
let resetdeath = document.getElementById('submit');




btnstart.addEventListener("click", function () {



    front.classList.add("caiu");
    contadorContainer.innerHTML += `<p id="yready">VOCÊ ESTÁ PRONTO?</p> <span id="counter"></span>`
    setTimeout(function () {

        const front = document.getElementById("front");
        const parent = front.parentNode;
        parent.removeChild(front);





    }, 1200);







    setTimeout(function () {
        console.log('comecou')
        let tempoRestante = 40;
        let contador;

        function contarTempo() {
            if (tempoRestante > 0) {
                tempoRestante--;
                console.log(tempoRestante);
                contador = setTimeout(contarTempo, 1000);
            } else {
                alert("Acabou o tempo!");
            }
        }

        function resetarContador() {
            tempoRestante = 40;
            clearTimeout(contador);
            contarTempo();
        }

        contarTempo();

        document.getElementById("submit").addEventListener("click", resetarContador);






        historico.innerHTML += ` <h3 id="title-historico">Historico:</h3>

        <p id="historical-letter"> </p>`;
        contadorContainer.innerHTML = ''
        console.log('oi')



        let display = document.getElementById('deadline');
        display.style.display = 'block'


        // timer arguments: 
        //   #1 - time of animation in mileseconds, 
        //   #2 - days to deadline

        $('#progress-time-fill, #death-group').css({ 'animation-duration': animationTime + 's' });

        var deadlineAnimation = function () {
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

        var deadlineText = function () {
            var $el = $('.deadline-days');
            var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
            $el.html(html);
        }

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


















let dea = document.getElementById('deadline')
console.log(dea.innerHTML)
let dio = dea.innerHTML;
console.log(dio)


function go() {
    dea.innerHTML = '';
    console.log(dea.innerHTML)
    dea.innerHTML = dio;
    console.log(dea.innerHTML)









    $('#progress-time-fill, #death-group').css({ 'animation-duration': animationTime + 's' });


    var deadlineAnimation = function () {
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

    var deadlineText = function () {
        var $el = $('.deadline-days');
        var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
        $el.html(html);
    }

    deadlineText();

    deadlineAnimation();
    timer(animationTime, days);

    setInterval(function () {
        timer(animationTime, days);
        deadlineAnimation();

        console.log('begin interval', animationTime * 1000);

    }, animationTime * 1000);

};



