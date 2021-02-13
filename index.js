const readlineSync = require('readline-sync');

class Person {
    constructor(type) {
        this.inWallet = 0;
        this.onTable = 0;
        this.type = type;
        this.score = 0;
        this.cards = [];
    }

    bet(amount) {
        this.onTable = amount;
    }

    getBet() {
        return this.onTable;
    }

    getWallet() {
        return this.inWallet;
    }

    addCards(cards) {
        this.cards = [...cards];
    }

    shuffle(num) {
        let cards = [];
        let i;
        for(i = 0; i < num; i++){
            let card = new Card();
            card.random();
            cards.push(card);
        }
        return cards;
    }

    getScore() {
        for(const card of this.cards) {
            this.score += card.getVal();
        }
        return this.score;
    }

    win() {
        this.inWallet += (this.onTable*2);
    }

    lose() {
        if(this.inWallet - this.onTable >= 0)
        {
            this.inWallet -= this.onTable;
        }
        else {
            this.inWallet = 0;
        }
    }
}

class Card{
    constructor(type, face) {
        this.type = type;
        this.face = face;
    }

    random() {
        let cardSequence = Math.floor(Math.random() * 51);
        let tmpFaceVal = (cardSequence % 13) + 1
        if (tmpFaceVal ==  1) {
            this.face = "A";
        }
        else if (tmpFaceVal ==  10) {
            this.face = "10";
        }
        else if (tmpFaceVal == 11) {
            this.face = "J";
        }
        else if (tmpFaceVal == 12) {
            this.face = "Q";
        }
        else if (tmpFaceVal == 13) {
            this.face = "K";
        }
        else {
            this.face = tmpFaceVal;
        }
        let tmpFaceType = (cardSequence % 4) + 1
        if(tmpFaceType == 1) {
            this.type = "Clubs";
        }
        else if(tmpFaceType == 2) {
            this.type = "Diamonds";
        }
        else if(tmpFaceType == 3) {
            this.type = "Hearts";
        }
        else {
            this.type = "Spades";
        }
    }

    getFace() {
        return this.face;
    }

    getType() {
        return this.type;
    }

    getVal() {
        if(["10", "J", "K", "Q"].includes(this.face)) {
            return 0;
        }
        else if(this.face == "A") {
            return 1;
        }
        else {
            return this.face;
        }
    }
}

async function main() {
    let playMore = "Yes";

    me = new Person("me");
    dealer = new Person("dealer");

    while(playMore === "Yes")
    {
        let bet = userName = readlineSync.question('> Please put your bet\n> ');
        me.bet(bet)
    
        let dealerShuffle = dealer.shuffle(4)
        me.addCards(dealerShuffle.slice(0,2))
        dealer.addCards(dealerShuffle.slice(2,4))
    
        let myScore = me.getScore()
        let dealerScore = dealer.getScore()
    
        console.log(`> You got ${me.cards[0].getType()}-${me.cards[0].getFace()}, ${me.cards[1].getType()}-${me.cards[1].getFace()}`)
        console.log(`> The dealer got ${dealer.cards[0].getType()}-${dealer.cards[0].getFace()}, ${dealer.cards[1].getType()}-${dealer.cards[1].getFace()}`)
        
        if(myScore > dealerScore) {
            console.log(`> You won!!!, received ${me.getBet()} chips`)
            me.win();
        }
        else if (myScore < dealerScore) {
            console.log(`> You lose!!!, lost ${me.getBet()} chips`)
            me.lose();
        }
        else {
            console.log(`> You tie!!!, received nothing`)
        }
    
        playMore = readlineSync.question('> Wanna play more (Yes/No)?\n> ');
    }
    console.log(`> You got total ${me.getWallet()}`)
}

main();