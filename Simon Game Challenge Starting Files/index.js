var buttonColours = ["red", "blue", "green", "yellow" ];

var userClickedPattern = [];

var gamePattern = [];

var level = 0;


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
};

var started = false;

$(".btn").click(function() {
    if(started === false) {
        var userChosenColour = this.id;
        animatePress(userChosenColour);
        playSound("wrong");
        wrongAnswer();
    } else {
        var userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        animatePress(userChosenColour);
        playSound(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }
});

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
});

function playSound(name) {
    // console.log("sounds/" + name + ".mp3");
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function wrongAnswer() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
}




function checkAnswer(indexOfLast) {
    if(gamePattern[indexOfLast] === userClickedPattern[indexOfLast]) {
        console.log("Success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Wrong");
        wrongAnswer();
        playSound("Wrong");
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}