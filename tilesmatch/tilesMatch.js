console.log('home')

//levels are imported

import {level} from  '../level.js'
import {gameStartButton} from '../home.js'

// 
const main = document.getElementsByClassName('container')
const gameOverPopup = document.getElementById('gameOverPopup')

const homeButton = document.getElementById('homeButton')

// const gameStartButton = document.getElementById('gameStart')
const gameoverTitle = document.getElementById('gameoverTitle')
const gametimer = document.getElementById('gametimer')
const gamelevel = document.getElementById('gamelevel')
const gameview = document.getElementById('gameview')
const gameStartconatiner = document.getElementById('gameStartconatiner')
const replay = document.getElementById('replayButton')
const replayLife = document.getElementById('retryHearts').children
// console.log(replayLife)

//replay heart count
let replayLifeCount = 3
// replay inittalized for next level;
function restoreLifeNextLevel(){
  for(let value of replayLife)
  {
    value.style.color = 'red'
  }
}

let gameEndFlag = false
//store game level
let playGameLevel =  +localStorage.getItem('gamelevel') || 1

//select tiles 

let selectedTile = ''
let matchTile = ''
let restartLevelData = []
let isRestartDataAddded = false
let copyListData = []

//find random tiles position
function findTilesPosition(icon)
{
  const listData = []
 
  const num =()=> {
    const i = Math.floor(Math.random()*(icon.length*2));
    return i
  }

const checkInList = []
function checkIn (){
const tx = num()
if(checkInList.includes(tx))
{
   return checkIn()
}
else{
  checkInList.push(tx)
  return tx
}
}


  for(let i=0;i<icon.length;i++)
    {
      for(let j =0;j<2;j++)
        {
         
            

            listData.push([icon[i],checkIn()])
            
          }
        }
        copyListData = JSON.parse(JSON.stringify(listData))
        gamePlay(listData)
    if(listData.length ===0)
    {
      gameEndFlag = true
    }
}
//when game loaded
function gameload (data)
{
   const{icon} = data
  console.log(icon)
  main[0].innerHTML = ""
      // const noOfTiles = 5;
      // const  icon = ["#","$","%","&","@","^","(",")",";",":",".","<",">","?","/"]
      findTilesPosition(icon)
}




const gameTimer  =document.getElementById('gametimer')
let startFlag = false
//function of countdown timer 
function gameCountdownTimer (data){
  gameEndFlag = false


  const{gameTime}  =data
let t = gameTime
gameTimer.innerText = `00:${t}`
const timer =setInterval(()=>{
  t-=1
  gameTimer.innerText = `00:${t}`
  if(gameEndFlag)
  {
   
    clearInterval(timer)
    startFlag = false
  
     gameoverTitle.innerHTML = '<b><i>level completed !</i></b>'
     replay.innerText ='Next'
    gameOverPopup.style.display = 'flex'
   
  }
  else if(t==0)
  {
    clearInterval(timer)
    startFlag = false
    console.log("complted")
    gameOverPopup.style.display = 'flex'
    if(replayLifeCount===0)
    {
        replay.innerText = 'Restart'
    }
    else
    {
       replay.innerText ='Replay'
    }
    
    gameoverTitle.innerHTML = '<b><i>game over !</i></b>'

  }
   
},1000)
}



// when redirect ro page
 window.onload = function(){
  if(!startFlag){
    startFlag = true
    gameview.style.display = "block";
    gameStartButton.style.display = 'none'
    gametimer.style.visibility = 'visible'
    gamelevel.style.display = 'block'
    gamelevel.innerText = `level ${playGameLevel}`
    main[0].style.display = 'grid'
    
    gameload(level[playGameLevel])
    gameCountdownTimer(level[playGameLevel])
  }
  
}

let replayData = []
let chooseTile = []
// gameplay functions
function gamePlay(listData)
{
  // console.log(listData)
  replayData = listData
   if(isRestartDataAddded === false)
  {
      restartLevelData = JSON.parse(JSON.stringify(listData))
      console.log(restartLevelData)
      isRestartDataAddded  = true
  }
    main[0].innerHTML = ''
    for(let k = 0;k<listData.length;k++)
        {
          let name = ''
          for(let n = 0;n<listData.length;n++)
            {
              if(listData[n][1]==k)
              {
                name = listData[n][0]
              }
            }
          const div= document.createElement('div');
          // div.style = 'border:5px solid black;background-color:lightBlue;width:50px;height:50px;text-align:center;padding-top:30px'
          div.className = 'tiles-style'
          div.id = 'gam'+k
          div.addEventListener('click',function(){

            // console.log(selectedTile)
            // chooseTile = selectedTile
            // console.log(chooseTile)
            
            if(!selectedTile)
            {
              selectedTile = [name,k]
              div.style.backgroundColor = 'green'
            }
              else if(selectedTile[1] ===k)
              {
                    div.style.backgroundColor = 'lightBlue'
                selectedTile = ""
              }
            else if(!matchTile)
            {
             
    
              matchTile = [name,k]
              console.log(matchTile)
              if(selectedTile[0]===matchTile[0])
              {
              // matchTile = [name,k]
              // div.style.border = '3px solid brown'
    
                const newar = listData.filter((value,i,arr)=>{ return value[0]!==matchTile[0]})
    
                console.log(newar)
                
                findTilesPosition(findSymbol(newar))
                selectedTile = ''
              matchTile = ""
            }
            else 
            {
              console.log('tiles not matched')
              document.getElementById(`gam${selectedTile[1]}`).style.backgroundColor = 'lightBlue'
              selectedTile = ''
              matchTile = ""
            }
            
            
            }
            console.log(selectedTile,matchTile)
            })
          div.innerText = name
          main[0].appendChild(div)
        }
}

// console.log(listData)
//is home button is clicked


homeButton.addEventListener('click',function(){

  console.log('home button')

    if(chooseTile.length===0 && replayData.length===0)
  {
     localStorage.setItem('gamelevel',playGameLevel+1)
  }
  else if(gameEndFlag)
  {
    // playGameLevel+=1
    console.log(playGameLevel)
    localStorage.setItem('gamelevel',playGameLevel)
  }  
  window.location.pathname = "/index.html";
     
})

// 

//replay function
replay.addEventListener("click",function(){

  //if next button is clicked
  if(this.innerText ==='Next')
  {
    //herat replay count initialized
    isRestartDataAddded = false
    replayLifeCount = 3
    restoreLifeNextLevel()
    playGameLevel+=1
    localStorage.setItem('gamelevel',playGameLevel)
    gameOverPopup.style.display = 'none'
  gameStartButton.style.display='none'
    if(!startFlag){
      startFlag = true
      gameview.style.display = "block";
      gameStartButton.style.display = 'none'
      gametimer.style.visibility = 'visible'
      gamelevel.style.display = 'block'
       gamelevel.innerText = `level ${playGameLevel}`
      main[0].style.display = 'grid'
      gameEndFlag =false
      gameload(level[playGameLevel])
      gameCountdownTimer(level[playGameLevel])
    }
  }
  else if(this.innerText === 'Restart')
  {
    replayLifeCount=3
    restoreLifeNextLevel()
    localStorage.setItem('gamelevel',playGameLevel)
    gameOverPopup.style.display = 'none'
  gameStartButton.style.display='none'
    if(!startFlag){
      startFlag = true
      gameview.style.display = "block";
      gameStartButton.style.display = 'none'
      gametimer.style.visibility = 'visible'
      gamelevel.style.display = 'block'
       gamelevel.innerText = `level ${playGameLevel}`
      main[0].style.display = 'grid'
      gameEndFlag =false
      gameload(level[playGameLevel])
      gameCountdownTimer(level[playGameLevel])
  }}
  else{

    gameOverPopup.style.display = 'none'
  gameStartButton.style.display='none'
  gamePlay(replayData)
  gameCountdownTimer(level[playGameLevel])
  if(replayLifeCount>-1)
  {
    replayLife[replayLifeCount-1].style  = 'color:white'
    replayLifeCount -=1
  }
  else
  {
    console.log(replayLifeCount)
    // replay.innerText = 'Restart'
    replay.style = 'background:white;color:black;'
  }
  }
  
})

// check symbols 
const findSymbol = (arr)=>{
  console.log('findsymbol')
  let newarr = []
  for(let i = 0;i<arr.length;i++)
    {
      if(!newarr.includes(arr[i][0]))
      {
        newarr.push(arr[i][0])
      }
    }
  return newarr
}





