
const http = require('http')
const port=4000
let cardDeck=require('./Deck')
let deck=new cardDeck();

const server=http.createServer((req, res) =>{
  switch(req.url)
  {
    case '/Draw':
      {
        let cardDrawn=deck.draw()
        res.write(JSON.stringify(cardDrawn)); //write a response to the client
        break
      }
    case '/DealerCards':
      {
        res.write(JSON.stringify(deck.getDealer()));
        break;
      }
    case '/DealerPlay':
      {
        res.write(JSON.stringify(deck.dealerTurn()));
        break;
      }
    case '/DeckLength':
      {
        res.write(JSON.stringify(deck.getDeckLength()))
        break
      }
    case '/DrawInit':
      {
        res.write(JSON.stringify(deck.drawInit()))
        break
      }
    case '/Reset':
      {
        deck.newGame()
        res.write("true");
        break
      }
    default:
      break
  }
  res.end(); //end the response
})

server.listen(port,function(error)
{
  if(error){
    console.log('Error found:',error)
  }
  else{
    console.log('Server is up on port '+port)
    console.log('\n http://localhost:4000/')
  }
})