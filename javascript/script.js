let player1current = document.querySelector('#player1 .current');
let player2current = document.querySelector('#player2 .current');

let player1dice1 = document.querySelector('#player1 .dice1');
let player2dice1 = document.querySelector('#player2 .dice1');
let player1dice2 = document.querySelector('#player1 .dice2');
let player2dice2 = document.querySelector('#player2 .dice2');

let player1total = document.querySelector('#player1 .total');
let player2total = document.querySelector('#player2 .total');
let playbutton = document.querySelector('#play-button');
let resetbutton = document.querySelector('#reset-button');

class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.turn = 0;

    }

    play() {

        let result = this.player1.play();
        player1dice1.innerHTML = `<img src="./img/dice${result.first}.png"/>`;
        player1dice2.innerHTML = `<img src="./img/dice${result.second}.png"/>`;
        player1current.innerText = (result.first + result.second);
        player1total.innerText = this.player1.total;
        let result2 = this.player2.play();
        player2dice1.innerHTML = `<img src="./img/dice${result2.first}.png"/>`;
        player2dice2.innerHTML = `<img src="./img/dice${result2.second}.png"/>`;
        player2current.innerText = (result2.first + result2.second);
        player2total.innerText = this.player2.total;
        this.turn++;
        // debugger;
        if(this.player1.total>this.player2.total){
            
            $( "#player1 .title" ).animate({
                // backgroundColor: "#000000",
                color: "#05F400"
                
              }, 500 ).animate({
                // backgroundColor: "#000000",
                color: "#000"
                
              }, 500 );
        }else{
            $( "#player2 .title" ).animate({
                // backgroundColor: "#000000",
                color: "#05F400"
                
              }, 500 ).animate({
                // backgroundColor: "#000000",
                color: "#000"
                
              }, 500 );
        }
        if (this.turn == 3) {
            setTimeout(() => {
                let victory = this.calculateVictory();
                if (victory < 0) {
                    alert('player1 wins!');
                } else if (victory > 0) {
                    alert("player2 wins!");
                } else {
                    alert('it is a tie!');
                }
            }, 1000);

        }
    }

    calculateVictory() {

        player1current.innerText = null;
        player1total.innerText = null;
        player2current.innerText = null;
        player2total.innerText = null;
        this.turn = 0;
        let flag;
        if (this.player1.total > this.player2.total) {
            flag = -1;
        } else if (this.player1.total < this.player2.total) {
            flag = 1;
        } else {
            flag = 0;
        }
        this.player1.total = 0;
        this.player2.total = 0;
        console.log('flag', flag);
        return flag;
    }
}

class Player {
    constructor() {
        this.total = 0;
    }
    play() {
        let first = Math.floor(Math.random() * 6 + 1);
        let second = Math.floor(Math.random() * 6 + 1);
        console.log('first', first);
        console.log('second', second);
        let total = 0;
        if (first == 1 || second == 1) {
            total = 0;
        } else if (first == second) {
            total = (first + second) * 2;

        } else {
            total = first + second;

        }
        this.total = total;

        return {
            first,
            second
        }
    }
}

let player1 = new Player();
let player2 = new Player();
let game = new Game(player1, player2);


playbutton.addEventListener('click', function () {
    console.log('click play');
    game.play();
});

resetbutton.addEventListener('click', function () {
    player1 = new Player();
    player2 = new Player();
    game = new Game(player1, player2);
    player1dice1.innerHTML = null;
    player1dice2.innerHTML = null;
    player1current.innerText = null;
    player1total.innerText = null;
    
    player2dice1.innerHTML = null;
    player2dice2.innerHTML = null;
    player2current.innerText = null;
    player2total.innerText = null;
});