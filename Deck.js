const types=["clubs","diamonds","hearts","spades"];
const values=['ace',2,3,4,5,6,7,8,9,10,'jack','queen','king'];

class Card{
    constructor(value,type){
        this.value=value
        this.type=type
    }
}


class Deck{
    constructor(){
        this.newGame();
    }
    
    newGame(){
        this.cards=[];

        for(let value=0;value<values.length;value++){
            for(let type=0;type<types.length;type++){
                this.cards.push(new Card(values[value],types[type]));
            }
        }
        this.shuffle();
        this.dealerCards=this.drawInit();
    }

    shuffle(){
        for(let i=0;i<this.cards.length;i++){
            let rng=parseInt(Math.random()*this.cards.length);
            let temp=this.cards[rng];
            this.cards[rng]=this.cards[i];
            this.cards[i]=temp;
        }
    }

    print(){
        for(let i=0;i<this.cards.length;i++){
            console.log(this.cards[i]+"\n");
        }
    }

    draw(){
        this.shuffleIfEmpty();
        return this.cards.shift();
    }

    shuffleIfEmpty()//create a new deck if deck is empty
    {
        if(this.cards.length===0)
            this.newGame();
    }

    getDeckLength()
    {
        return this.cards.length;
    }

    drawInit()//draw two cards | useful from game init
    {
        let hand=[],temp
        hand.push(this.draw())
        hand.push(this.draw())
        return hand
    }

    dealerTurn()
    {
        let myCards=this.dealerCards;
        while(this.calcScore(myCards)<17){
            myCards=[...myCards,this.draw()];
        }
        return this.dealerCards=myCards;
    }

    getDealer(){return this.dealerCards;}

    calcScore(cardsArray)
    {
        let score=0

        cardsArray.forEach(element => {
        switch(element.value)
        {
        case 'jack':
        case 'queen':
        case 'king':
          score+=10
          break;
        case 'ace':
          score+=11
          break;
        default:
          score+=element.value
          break;
      }
    });
    return score
    }
}

module.exports=Deck