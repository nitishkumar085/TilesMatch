function gameOverPopup(){

    const gameOverPopup = document.createElement('div')
    const gameoverTitle = document.createElement('h2')
    const replayButton = document.createElement('button')
    const homeButton = document.createElement('button')
    gameOverPopup.id  = 'gameOverPopup'
    gameoverTitle.id = 'gameoverTitle'
    replayButton.id = 'replayButton'
    homeButton.id = 'homeButton'
    
    gameOverPopup.append([gameoverTitle,replayButton,homeButton])



    // <div id='gameOverPopup'>
    //   <h2 id='gameoverTitle'><b><i>Game over !</i></b></h2>
    //   <button id='replayButton'>replay</button>
    //   <button id='homeButton'>home</button>
    // </div>

}