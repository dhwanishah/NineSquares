var buttons = [];
var i = 0;
affectsSelf = false;

function turnButton(n) {
    /* Turns the button on if it's off, and vice versa. */
    var btx = "b" + n;
    var btn = document.getElementById(btx);
    if (btn.getAttribute("class") === "button off") {
        btn.setAttribute("class", "button on");
    }
    else {
        btn.setAttribute("class", "button off");
    }
}

function turnAffects(bvar) {
    /* Should turn all the buttons that a given button affects. */
    for (j in bvar) {
        turnButton(bvar[j]);
    }
}

function pressButton(bvar) {
    /* Turn all the buttons a given button affects.
        If that turn won the game, tell the player. */
    turnAffects(bvar);
    if (checkWin()) {
        var msg = document.getElementById("message");
        msg.textContent = "You won!";
    }
}

function randomAffects() {
    /* This should add a random selection of 0-8 to an array
        and return the array to be held in one of the buttons */
    var affectsArray = [];
    for (var j = 0; j < 9; j++) {
        var randomizer = (Math.random() * (3 - 0) + 0);
        if (randomizer >= 2) {
            affectsArray.push(j);
            if (j === i) {
                affectsSelf = true;
            }
        }
    }
    return affectsArray;
}

function randomizeButtons() {
    /* Erase any win message.
        Randomize what each button affects.
        Make sure each button affects itself.
        Randomly decide whether buttons are off or on,
        By mashing buttons starting from a win state. */
    var msg = document.getElementById("message");
    msg.textContent = " ";

    for (i = 0; i < 9; i++) {
        affectsSelf = false;
        buttons[i] = randomAffects();
        if (affectsSelf === false) {
            buttons[i].push(i);
        }
    }

    for (var j = 0; j < 9; j++) {
        var btx = "b" + j;
        var btn = document.getElementById(btx);
        btn.setAttribute("class", "button on");
    }

    var randomizer = (Math.random() * (20 - 10) + 10);
    for (var j = 0; j < randomizer; j++) {
        var randomButton = parseInt(Math.random() * (8 - 0) + 0);
        turnAffects(buttons[randomButton]);
    }
    if (checkWin()) {
        var randomButton = parseInt(Math.random() * (8 - 0) + 0);
        turnAffects(buttons[randomButton]);
    }

}

function checkWin() {
    /* If all the buttons are 'on', then the player wins. */
    var won = true;
    for (var j = 0; j < 9; j++) {
        var btx = "b" + j;
        var btn = document.getElementById(btx);
        if (btn.getAttribute("class") === "button off") {
            won = false;
        }
    }
    return won;
}

randomizeButtons();
