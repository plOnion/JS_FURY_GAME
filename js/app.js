var Furry = require("./furry.js");
var Coin = require("./coin.js");

function startNewGame() {
    var newGameBtn = document.querySelector(".btn");
    newGameBtn.addEventListener("click", function () {
        newGameBtn.parentElement.classList.add("invisible");
        var game = new Game();
    });

};

var Game = function() {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;
    var list = [];

    this.Game = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function(){
        this.board[ this.Game(this.furry.x, this.furry.y) ].classList.add('furry');
    };

    this.hideVisibleFurry = function() {
        if(document.querySelector(".furry") !== null) {
            document.querySelector(".furry").classList.remove('furry')
        }
    };

    this.showCoin = function(){
        this.board[ this.Game(this.coin.x, this.coin.y) ].classList.add('coin');
    };

    this.moveFurry = function() {
        this.hideVisibleFurry();
        this.showFurry();

        const sound = new Audio("./assets/bacmusic.wav");
        sound.play();

        if (this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        }
        else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        }
        else if (this.furry.direction === "up") {
            this.furry.y = this.furry.y + 1;
        }
        else if (this.furry.direction === "down") {
            this.furry.y =  this.furry.y - 1;
        }

        this.gameOver();
        this.checkCoinCollision();
    };

    document.addEventListener('keydown', function(event){
        self.turnFurry(event);
    });

    this.turnFurry = function(event) {
        switch (event.which) {
            case 37:
                self.furry.direction = 'left';
                break;
            case 38:
                self.furry.direction = "down";
                break;
            case 39:
                self.furry.direction = 'right';
                break;
            case 40:
                self.furry.direction = 'up';
                break;
        }
    };

    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board [this.Game(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score++;

            const soundCoin = new Audio("./assets/chomp.wav");
            soundCoin.play();

            var scoreId = document.querySelector("#score div strong");
            scoreId.textContent = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function() {
        if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
            clearInterval(this.interval);

            const soundDeath = new Audio("./assets/death.wav");
            soundDeath.play();

            var over = document.getElementById("over");
            over.classList.remove("invisible");

            var scoreId = document.querySelector("#score > div > strong");
            scoreId.textContent = this.score;

            var hiScore = document.querySelector("#hiScore");
            hiScore.textContent = "Score: " + this.score;

            // list.push(scoreId.textContent);

            var newGameBtn = document.querySelector(".next");
            newGameBtn.addEventListener("click", function () {
                newGameBtn.parentElement.classList.add("invisible");
                var game = new Game();
                game.hideVisibleFurry();
                location.reload();
            });

            this.hideVisibleFurry();
        }
    };

    this.startGame = function () {
        this.interval = setInterval(function () {
            self.moveFurry()
        }, 250);
    };

    this.showCoin();
    this.startGame();
};

startNewGame();

