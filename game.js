var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];



var gameIsOn = false;

$(document).on('keydown', function(){
    if (!gameIsOn){
        $('h1').text('Level ' + level);
        nextSequence();
        gameIsOn = true;
    }
})

$('.btn').click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour)
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswers(userClickedPattern.length-1)
})


function checkAnswers(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    } else {
        var audio = new Audio('sounds/wrong.mp3')
        audio.play();

        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 200)
        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];

    level ++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.random();
    randomNumber *= 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $('#'+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameIsOn = false;
}


function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour){
    $('#' + currentColour).addClass('pressed')    
    
    setTimeout(function() {
        $('#' + currentColour).removeClass('pressed');
      }, 100);
    
}
