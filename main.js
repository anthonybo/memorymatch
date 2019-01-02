$(document).ready(initApp);

function initApp() {
    startGame();
    animation();
    randomizeImages();
    // resetGame();
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

    $('.back').hide();
    console.log('starting game...' + '\n' + ' ');

    $('.games-played .value').text(gamesPlayed);

    $('.reset').click(resetGame);

    $('.card').click(function() {

        if (gamesPlayed >= 2) {
            accuracy = 0;
            $('.accuracy .value').text(accuracy + '%');
        } else {
            $('.accuracy .value').text(accuracy + '%');
        }

        if(this===previousTarget) {
            // alert('BAD');
            console.log('Double Clicked');
            counter = 1;
        } else if(counter === 2) {
            // console.log('clicked' + ' '+counter);
            console.log('two clicks' + ' '+counter);
            counter = 0;
            $('.card').children('.back').hide();
            $('.card').children('.front').show();

        } else {
            counter++;
            console.log('clicked' + ' '+counter);

            $(this).children('.back').show();
            $(this).children('.front').hide();

            var fullDiv = $(this).find(".back").css("background-image");
            var url = fullDiv.lastIndexOf("/") + 1;
            var filename = fullDiv.substr(url).replace('")', '');
            console.log(filename);
            if (counter == 1) {
                cardOne = this;
                // console.log("regular this", this);
                // console.log($(this));
                compare1 = filename;
                previousTarget=this;
            }
            if(counter == 2) {
                cardTwo = this;
                window.setTimeout(
                    function() {
                        compare2 = filename;

                        if (compare1 == compare2){
                            matches++;
                            number_found++;
                            console.log('same!' + ' ' + number_found);
                            console.log(compare1 +' '+ compare2);
                            // console.log('accuracy: '+accuracy);



                            if(number_found === 9) {
                                alert('You Won!' + '\n' + '# of attempts: ' + attempts + '\n' + 'Accuracy: ' + accuracy + '%');
                            }

                        } else {
                            console.log('different');
                            var newAttemptsValue = $('.attempts .value').text();

                            if(newAttemptsValue == 0 ) {
                                attempts = 0;
                                number_found = 0;
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
                        if (matches !==0 && attempts !==0) {
                            accuracy = Math.floor(matches / attempts * 100);
                            $('.accuracy .value').text(accuracy + '%');
                        } else {
                            // accuracy = 0;
                            $('.accuracy .value').text(accuracy + '%');
                        }

                        counter = 0;
                    },
                    0
                );
            }

        }

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

function randomizeImages() {
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
    $('.back').hide();
    $('.front').show();
    $('.reset').click(randomizeImages);

    $('.attempts .value').text('0');

    var gamesPlayed = $('.games-played .value').text();
    gamesPlayed++;
    $('.games-played .value').text(gamesPlayed);

    // var accuracy = $('.accuracy .value').text() ;
    // $('.accuracy .value').text('0');
    // console.log(accuracy);

}