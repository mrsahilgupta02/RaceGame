const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

console.log(gameArea);
startScreen.addEventListener('click' ,start);
let keys = {ArrowUp : false , ArrowDown : false ,ArrowRight : false , ArrowLeft : false}
let player ={ speed:5 , score:0 };
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(e){
  e.preventDefault();
  keys[e.key] = true;
  // console.log(e.key);
  // console.log(keys);
}
 function keyUp(e){
   e.preventDefault();
   keys[e.key] = false;
   // console.log(e.key);
   // console.log(keys);
 }
 function start()
 {

   player.start =true;
   player.score =0;
   //gameArea.classList.remove('hide');
   startScreen.classList.add('hide');
   gameArea.innerHTML =" ";



   for(x=0;x<5;x++)
   {
     let roadLine =document.createElement('div');
     roadLine.setAttribute('class','lines');
     roadLine.y =(x*150);
     roadLine.style.top =(x*150) +"px";
     gameArea.appendChild(roadLine);
   }


    window.requestAnimationFrame(gamePlay);

    let car =document.createElement('div');
    car.setAttribute('class','car');

    gameArea.appendChild(car);//appendchild is used if we want to make a new div in previously created div

    // console.log("top position " +car.offsetTop);
    // console.log("left position " +car.offsetLeft);

    player.x =car.offsetLeft;
    player.y =car.offsetTop;

    for(x=0;x<3;x++)
    {
      let enemyCar = document.createElement('div');
      enemyCar.setAttribute('class','enemy');
      enemyCar.y =((x+1)* 350) * -1;
      enemyCar.style.top =(x*150) +"px";
      gameArea.appendChild(enemyCar);
      enemyCar.style.backgroundColor ='blue';
      enemyCar.style.left = Math.floor(Math.random() *350 ) +"px";
    }

 }

 function endGame()
 {
   player.start = false;
   startScreen.classList.remove('hide');
   startScreen.innerHTML = "Game Over <br> Your final score is " +player.score  + " <br>Press here to restart the Game" ;
 }


 function isCollide(a,b)
 {
   aRect = a.getBoundingClientRect();
   bRect = b.getBoundingClientRect();


   return !((aRect.top> bRect.bottom ) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
 }

function moveLines()
{
  let lines = document.querySelectorAll('.lines');

  lines.forEach(function(item){

    if(item.y>600)
    {
      item.y -=750;
    }
    item.y += player.speed;
    item.style.top =item.y +"px";

  })
}

function moveEnemy(car)
{
  let enemy = document.querySelectorAll('.enemy');

  enemy.forEach(function(item){

  if(isCollide(car ,item))
  {
    console.log("Boom");
    endGame();
  }

    if(item.y>600)
    {
      item.y =-450;
        item.style.left = Math.floor(Math.random() *350 ) +"px";
    }

    item.y += player.speed;
    item.style.top =item.y +"px";

  })
}

 function gamePlay(){
   let car = document.querySelector('.car');
   let road =gameArea.getBoundingClientRect();
   //console.log("hiheh");
   if(player.start)
   {
     moveLines();
     moveEnemy(car);
     if(keys.ArrowUp && player.y>70)   {player.y -=player.speed}
     if(keys.ArrowDown && player.y<(road.bottom -80) ) {player.y +=player.speed}
     if(keys.ArrowLeft && player.x>0) {player.x -=player.speed}
     if(keys.ArrowRight && player.x<(road.width - 60)){player.x +=player.speed}

    car.style.top =player.y + "px";
    car.style.left =player.x + "px";

     window.requestAnimationFrame(gamePlay);
     console.log(player.score++);

     player.score++;
     let ps =player.score -2;
     score.innerText ="Score:" +ps;
   }

 }
