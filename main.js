$(document).ready(initApp);

function initApp() {
    revert('.card');
    leaderboard_first_run();
    startGame();
    animation();
    randomizeImages();
    settings();
    about();
    // load_animation();
    // resetGame();
    audio();
    clickHandler();
}

function clickHandler() {
    $('#trigger-menu').click(triggerStats);
}

function triggerStats(){
    console.log('Stats Triggered');

    if ($(".side-bar")[0]) {
        $('#side-bar').removeClass('side-bar');
        $('#side-bar').addClass('side-bar-mobile')
        $('#trigger-menu').css('right', '50%')
    } else {
        $('#side-bar').removeClass('side-bar-mobile');
        $('#side-bar').addClass('side-bar')
        $('#trigger-menu').css('right', '0')
    }


}

function startGame() {
    var gamesPlayed = 1;
    var previousTarget=null;
    var number_found = 0;
    var attempts = 0;
    var compare1 = '';
    var compare2 = '';
    var cardOne = null;
    var cardTwo = null;
    var counter = 0;
    var matches = 0;
    var accuracy = 0;
    var timer = 0;

    $('.back').hide();
    // console.log('starting game...' + '\n' + ' ');

    $('.games-played .value').text(gamesPlayed);
    $('.accuracy .value').text(accuracy + '%');
    move(accuracy);

    $('.attempts .value').text(attempts);

    $('.reset').click(resetGame);

    $('.card').on('click',function() {

    if(this === previousTarget) {
        // alert('BAD');
        // console.log('Double Clicked');
        counter = 1;
    }  else {
        counter++;
        // console.log('clicked' + ' '+counter);

        $(this).children('.back').show();
        $(this).children('.front').hide();

        var fullDiv = $(this).find(".back").css("background-image");
        var url = fullDiv.lastIndexOf("/") + 1;
        var filename = fullDiv.substr(url).replace('")', '');
        // console.log(filename);
        if (counter == 1) {
            cardOne = this;
            // console.log("regular this", this);
            // console.log($(this));
            compare1 = filename;
            previousTarget=this;
        } else if(counter == 2) {
            counter = 0;
            cardTwo = this;
            // debugger;
            if( $(cardOne).children().hasClass('matched') && !$(cardTwo).children().hasClass('matched')) {
                // console.log('Cheater! back is visible');
                $(cardTwo).children('.back').fadeOut(500);
                $(cardTwo).children('.front').fadeIn(500);

            } else if ($(cardTwo).children().hasClass('matched') && !$(cardOne).children().hasClass('matched')) {
                // console.log('Cheater! back is visible');
                $(cardOne).children('.back').fadeOut(500);
                $(cardOne).children('.front').fadeIn(500);
            } else if ($(cardTwo).children().hasClass('matched') && $(cardOne).children().hasClass('matched')) {
                // console.log('Cheater! back is visible');
            } else {
                window.setTimeout(
                    function() {
                        compare2 = filename;

                        if (compare1 == compare2){
                            previousTarget=this;
                            matches++;
                            number_found++;
                            // console.log('%c Same! '+number_found,'background: #222; color: firebrick');

                            // console.log('same!' + ' ' + number_found);
                            // console.log(compare1 +' '+ compare2);
                            // console.log('accuracy: '+accuracy);
                            $(cardOne).children().addClass('matched');
                            $(cardTwo).children().addClass('matched');
                        } else {
                            // console.log('different');
                            var newAttemptsValue = $('.attempts .value').text();

                            if(newAttemptsValue == 0 ) {
                                attempts = 0;
                                number_found = 0;
                                matches = 0;
                                accuracy = 0;
                            }
                            attempts++;

                            $('.attempts .value').text(attempts);

                            $(cardOne).children('.back').fadeOut(500);
                            $(cardOne).children('.front').fadeIn(500);
                            $(cardTwo).children('.back').fadeOut(500);
                            $(cardTwo).children('.front').fadeIn(500);
                            // $(this).children().find(".back").fadeOut;
                            // $(this).children().find(".front").fadeIn();
                        }
                        previousTarget=this;

                        if (matches > 0 || matches !==0 && attempts !==0) {
                            if (attempts <= 0) {
                                accuracy = 100;
                                $('.accuracy .value').text(accuracy + '%');
                                move(accuracy);
                            } else {
                                accuracy = Math.floor(matches / attempts * 100);
                                $('.accuracy .value').text(accuracy + '%');
                                move(accuracy);
                            }
                        } else {
                            // accuracy = 0;
                            $('.accuracy .value').text(accuracy + '%');
                            move(accuracy);
                        }

                        if(number_found === 9) {
                            // alert('You Won!' + '\n' + '# of attempts: ' + attempts + '\n' + 'Accuracy: ' + accuracy + '%');
                            winner_modal(attempts,accuracy);
                        }
                        counter = 0;
                    },
                    0
                );
            }

        }
    }
    }).on('dblclick', function() {
        // console.log('Double Click#2');

        if( !$(cardTwo).children().hasClass('matched') ) {
            // console.log('Double Click Flip');
            $(cardTwo).children('.back').fadeOut(500);
            $(cardTwo).children('.front').fadeIn(500);
        } else if( !$(cardOne).children().hasClass('matched') ) {
            // console.log('Double Click Flip');
            $(cardOne).children('.back').fadeOut(500);
            $(cardOne).children('.front').fadeIn(500);

        }

        // clearTimeout(timer);

        // if ($(this).children('.back').is(':visible')) {
        //     $(this).children('.front').show();
        //     $(this).children('.back').hide();
        //     counter = 0;
        //     console.log('.back is :visible');
        // }


    });
}

function animation() {
    $('.header-logo').click(function() {
        $('.header-logo').css({
            animation: 'spin 5s'
        });

        window.setTimeout(
            function() {
                $('.header-logo').css('animation', 'none');
            },
            5000
        );
    });
}

function winner_animation() {

    $('.header-logo').css({
        animation: 'spin 5s'
    });

    window.setTimeout(
        function() {
            $('.header-logo').css('animation', 'none');
        },
        5000
    );

    // $('#myPrompt').animate({left: '20vw', top: '80vw'}, 2000);


    $('#myPrompt').css({
        animation: 'spin 5s'
    });

    window.setTimeout(
        function() {
            $('#myPrompt').css('animation', 'none');
        },
        5000
    );
}

function load_animation() {

    $('.header-logo').animate({left: '100vw', top: '0'}, 2000).animate({left: '0', top: '0'}, 2000);
    // $(".ball").animate({left: distance, bottom: '+=0'}, 1000);

}

function randomizeImages() {
    // debugger;

    var images = [
        'images/star.png',
        'images/bowser.png',
        'images/mushroom.png',
        'images/yoshi.png',
        'images/coin.png',
        'images/flower.png',
        'images/luigi.png',
        'images/mario.png',
        'images/ghost.png'
    ];

    var nums = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
        ranNums = [],
        i = nums.length,
        j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        ranNums.push(nums[j]);
        nums.splice(j,1);
    }


    $(".back").each(function(i){
        var random_number = Math.floor((Math.random() * images.length) + 0);
        // console.log(ranNums[i] + ' ' + i);
        // $(this).css('background-image','url('+images[random_number]+')');
        $(this).css('background-image','url('+images[ranNums[i]]+')');

    });
}

function resetGame() {
    // debugger;
    $("div").each(function(i){
        $(this).removeClass('matched');
    });
    $('.back').hide();
    $('.front').show();
    // $('.reset').click(randomizeImages);
    randomizeImages();

    $('.attempts .value').text('0');

    var gamesPlayed = $('.games-played .value').text();
    gamesPlayed++;
    $('.games-played .value').text(gamesPlayed);
    move(0);
    $('.accuracy .value').text(0 + '%');
    $('.winner-text').empty();
    $('.leaderboard-users').empty();
    leaderboard_first_run();
}

function move(accuracy) {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 15);
    function frame() {
        if (width > accuracy) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function winner_modal(attempts, accuracy) {
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // var winner = 'You Won!' + '\n' + '# of attempts: ' + attempts + '\n' + 'Accuracy: ' + accuracy + '%';
    $('.winner-text').append('<div>' + '> You Won!!' + '</div>');
    $('.winner-text').append('<div>' + '> Attempts: '+ attempts + '</div>');
    $('.winner-text').append('<div>' + '> Accuracy: '+ accuracy + '%' + '</div>');

    modal.style.display = "block";

    leaderboard(accuracy);
    winner_animation();
    // revert('.card');
}

function leaderboard_first_run(){
    var default_value = [];

    default_value.push('none');
    default_value.push(0);

    if (localStorage.getItem("winner1") !== null){
        var winner_results1 = JSON.parse(localStorage.getItem("winner1"));
        winner_results1[0] = winner_results1[0].substring(0,10);
        $('.leaderboard-users').append('<div>'+ '1) ' + winner_results1[0] + ': ' + winner_results1[1]+ '%' +'</div>');
    } else {
        localStorage.setItem("winner1", JSON.stringify(default_value));
    }
    if(localStorage.getItem("winner2") !== null) {
        var winner_results2 = JSON.parse(localStorage.getItem("winner2"));
        winner_results2[0] = winner_results2[0].substring(0,10);
        $('.leaderboard-users').append('<div>'+ '2) ' + winner_results2[0] + ': ' + winner_results2[1]+ '%' +'</div>');
    } else {
        localStorage.setItem("winner2", JSON.stringify(default_value));
    }
    if(localStorage.getItem("winner3") !== null) {
        var winner_results3 = JSON.parse(localStorage.getItem("winner3"));
        winner_results3[0] = winner_results3[0].substring(0,10);
        $('.leaderboard-users').append('<div>'+ '3) ' + winner_results3[0] + ': ' + winner_results3[1]+ '%' +'</div>');
    } else {
        localStorage.setItem("winner3", JSON.stringify(default_value));
    }
}

function leaderboard(accuracy) {
    var value = [];

    document.getElementById('promptButton').addEventListener('click', submitPrompt);
    var prompt = document.getElementById('myPrompt');
    var promptAnswer = document.getElementById('promptAnswer');

    showSprompt();

    function showSprompt() {
        promptAnswer.value = ''; // Reset the prompt's answer
        document.getElementById('promptQuestion').innerText = "Enter your name:";
        prompt.style.display = 'block'; // Show the prompt
    }

    function submitPrompt() {
        var answer = promptAnswer.value; // Get the answer
        prompt.style.display = 'none';   // Hide the prompt
        // console.log(answer + ' ' + accuracy);
        value.push(answer);
        value.push(accuracy);

        $('.leaderboard-users').append('<div>'+ answer + ': ' + accuracy+ '%' +'</div>');

        if (localStorage.getItem("winner1") === null) {
            localStorage.setItem("winner1", JSON.stringify(value));
            // var winner_results = JSON.parse(localStorage.getItem("winner"));
        } else if ((localStorage.getItem("winner2") === null)) {
            localStorage.setItem("winner2", JSON.stringify(value));
            // var winner_results = JSON.parse(localStorage.getItem("winner"));
        } else if ((localStorage.getItem("winner3") === null)) {
            localStorage.setItem("winner3", JSON.stringify(value));
        }

        var winner_results1 = JSON.parse(localStorage.getItem("winner1"));
        var winner_results2 = JSON.parse(localStorage.getItem("winner2"));
        var winner_results3 = JSON.parse(localStorage.getItem("winner3"));

        if (localStorage.getItem("winner1") !== null && localStorage.getItem("winner2") !== null && localStorage.getItem("winner3") !== null) {
            if (winner_results1[1] < accuracy) {
                localStorage.setItem("winner2", JSON.stringify(winner_results1));
                localStorage.setItem("winner1", JSON.stringify(value));
            } else if (winner_results2[1] < accuracy) {
                localStorage.setItem("winner3", JSON.stringify(winner_results2));
                localStorage.setItem("winner2", JSON.stringify(value));
            } else if (winner_results3[1] < accuracy) {
                localStorage.setItem("winner3", JSON.stringify(value));
            }
        }
    }

    // var name = prompt('What is your name?');
    // console.log(name);

    // console.log(winner_results);
}

function revert(whatToFlip){
    var elements = $(whatToFlip);
    var currentDelay = 0;
    var delayDelta = 100;
    for( var i=0; i< elements.length; i++){
        $(elements[i])
            .addClass('hopFlipAnimation')
            .css('animation-delay', currentDelay+'ms');
        currentDelay+= delayDelta;
    }
}

function settings() {
    var counter = 0;

    $('.header-settings a').click(function() {
        $('.header-about-on-board-title').empty();
        $('.header-about-on-board-image').remove();
        $('.header-about-on-board').empty();
        $('.header-about a').css('color','');

        $('.header-settings a').css('color','red');


        counter++;
        // console.log('In Settings');

        if (counter === 1) {
            // console.log('In Settings - 1 click');
            $('.cardContainer').hide();
            counter++;

            $('#game-area').prepend('<div class="header-settings-on-board">'+ 'Pick a Background: ' +'</div>');
            $('#game-area').append('<img class="header-settings-on-board-images" src="images/background.gif">');
            $('#game-area').append('<img class="header-settings-on-board-images" src="images/background2.gif" >');
            $('#game-area').append('<img class="header-settings-on-board-images" src="images/background3.jpg">');
            $('#game-area').append('<img class="header-settings-on-board-images" src="images/background4.gif">');
            $('#game-area').append('<img class="header-settings-on-board-images" src="images/background5.gif">');
            $('#game-area').append('<img class="header-settings-on-board-images" src="images/background6.gif">');


            $('.header-settings-on-board-images').click( function() {
                // console.log('Image Clicked');
                // console.log(this);

                var image_path = $(this).attr('src');
                // console.log(image_path);

                $('body').css({
                    'background': 'url('+ image_path +') no-repeat center fixed',
                    'background-size': '100% 100%'
                });
            });

        } else if (counter >= 2) {
            // console.log('In Settings - 2 click');
            $('.header-settings-on-board').empty();
            $('.header-settings-on-board-images').remove();
            $('.cardContainer').show();
            $('.header-settings a').css('color','');

            counter = 0;
        }
    });
}

function about() {
    var counter = 0;

    $('.header-about a').click(function() {
        $('.header-settings-on-board').empty();
        $('.header-settings-on-board-images').remove();
        $('.header-settings a').css('color','');


        $('.header-about a').css('color','red');

        counter++;
        // console.log('in about section');

        if (counter === 1) {
            // console.log('In Settings - 1 click');
            $('.cardContainer').hide();
            counter++;

            $('#game-area').prepend('<div class="header-about-on-board-title">'+ 'About the author: ' +'</div>');
            $('#game-area').append('<img class="header-about-on-board-image" src="images/portrait.png">');
            $('#game-area').append('<div class="header-about-on-board">'+ 'I like to build applications ' +'</div>');

        } else if (counter >= 2) {
            // console.log('In Settings - 2 click');
            $('.header-about-on-board-title').empty();
            $('.header-about-on-board').empty();
            $('.header-about-on-board-image').remove();
            $('.cardContainer').show();
            $('.header-about a').css('color','');

            counter = 0;
        }
    });
}

function audio() {
    var counter = 0;

    $('.play-audio').click(function() {
        counter++;
        // console.log('audio clicked' + ' ' + counter);

        if (counter === 1) {
            // console.log('clicked' + ' ' + counter);
            // $('.play-audio').removeClass('pause-audio').addClass('play-audio');
            $('.play-audio').css({
                'background': 'url("images/pause.png") center center no-repeat',
                'background-size': '100% 100%'
            });
            $('audio#mario-music')[0].play();
            counter++;
        } else if (counter >= 2) {
            // console.log('clicked' + ' ' + counter);
            counter = 0;
            // $('.play-audio').removeClass('play-audio').addClass('pause-audio');
            $('.play-audio').css({
                'background': 'url("images/play.png") center center no-repeat',
                'background-size': '100% 100%'
            });
            $('audio#mario-music')[0].pause();
        }
        // counter++;

    }).on('dblclick', function() {
        // console.log('double click');
    });
}