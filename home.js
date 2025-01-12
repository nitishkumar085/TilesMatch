console.log('home')

import {level} from  './level.js'
const main = document.getElementsByClassName('container')
const gameOverPopup = document.getElementById('gameOverPopup')

const homeButton = document.getElementById('homeButton')

const gameStartButton = document.getElementById('gameStart')
const gameoverTitle = document.getElementById('gameoverTitle')
const gametimer = document.getElementById('gametimer')
const gamelevel = document.getElementById('gamelevel')
const gameview = document.getElementById('gameview')
const gameStartconatiner = document.getElementById('gameStartconatiner')
const replay = document.getElementById('replayButton')
console.log(level)

let selected = ""

// function check()
// {
//     if()
// }
let gameEndFlag = false
let playGameLevel = 1

let selectedTile = ''
let matchTile = ''

function gameload (data)
{
   const{icon} = data
  console.log(icon)
  main[0].innerHTML = ""
      // const noOfTiles = 5;
      // const  icon = ["#","$","%","&","@","^","(",")",";",":",".","<",">","?","/"]
      findTilesPosition(icon)
}

let copyListData = []
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


const gameTimer  =document.getElementById('gametimer')
let startFlag = false
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
     replay.innerText ='Replay'
    gameoverTitle.innerHTML = '<b><i>game over !</i></b>'

  }
   
},1000)
}







gameStartButton.addEventListener('click',function(){
  if(!startFlag){
    startFlag = true
    gameview.style.display = "block";
    gameStartButton.style.display = 'none'
    gametimer.style.visibility = 'visible'
    gamelevel.style.display = 'block'
    gamelevel.innerText = `level ${playGameLevel}`
    main[0].style.display = 'flex'
    
    gameload(level[playGameLevel])
    gameCountdownTimer(level[playGameLevel])
  }
  
})

let replayData = []

function gamePlay(listData)
{
  // console.log(listData)
  replayData = listData
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
            
            if(!selectedTile)
            {
              selectedTile = [name,k]
              div.style.border = '3px solid brown'
            }
              else if(selectedTile[1] ===k)
              {
                    div.style.border = '1px solid black'
                selectedTile = ""
              }
            else if(!matchTile)
            {
              // for(let f= 0;f<listData.length;f++)
              // {
              //   if(listData[f][0]==name)
              //   {
              //     console.log()
              //   }
              // }
    
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
              document.getElementById(`gam${selectedTile[1]}`).style.border = '1px solid black'
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
 
  gameOverPopup.style.display = 'none'
   gameview.style.display = 'none'
  gameStartButton.style.display='inline-block'
  if(gameEndFlag)
  {
    playGameLevel+=1
  }
     
})

// 

//replay function
replay.addEventListener("click",function(){
  //if next button is clicked
  if(this.innerText ==='Next')
  {
    playGameLevel+=1
    gameOverPopup.style.display = 'none'
  gameStartButton.style.display='none'
    if(!startFlag){
      startFlag = true
      gameview.style.display = "block";
      gameStartButton.style.display = 'none'
      gametimer.style.visibility = 'visible'
      gamelevel.style.display = 'block'
       gamelevel.innerText = `level ${playGameLevel}`
      main[0].style.display = 'flex'
      gameEndFlag =false
      gameload(level[playGameLevel])
      gameCountdownTimer(level[playGameLevel])
    }
  }
  else{

    gameOverPopup.style.display = 'none'
  gameStartButton.style.display='none'
  gamePlay(replayData)
  gameCountdownTimer(level[playGameLevel])
  }
  
})


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





