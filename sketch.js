var score=0;
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  scubadiverAnimation=loadAnimation("1.png.png","2.png.png","3.png.png","4.png.png","5.png.png","6.png.png","7.png.png","8.png.png","9.png.png","10.png.png");
  bgImage=loadImage("underwater.jpg");
  coinImage=loadImage("coin.png");
  sharkImage=loadImage("shark.png");
  gameoverImage=loadImage("gameover.png");
  restartImage=loadImage("restart.png");
}

function setup() {
  createCanvas(600,400);
  bg=createSprite(300,-50,20,20);
  bg.addImage(bgImage);
  bg.scale=3;
  scubadiver=createSprite(70,200,20,20); 
  scubadiver.addAnimation("scubadiver",scubadiverAnimation);
  scubadiver.scale=0.7; 
  gameover= createSprite(200,200,20,20);
  gameover.addImage(gameoverImage);
  gameover.scale=0.2;
  gameover.visible=false;
  restart= createSprite(400,200,20,20);
  restart.addImage(restartImage);
  restart.scale=0.1;
  restart.visible=false;
  coinGroup=createGroup();
  sharkGroup=createGroup(); 
  scubadiver.setCollider("rectangle",0,0,200,80);
  scubadiver.debug=false;

}

function draw() {
background(255); 
camera.position.y=scubadiver.y;
camera.position.x=scubadiver.x; 
if(gameState===PLAY){
 // bg.velocityX=-5;  
    
  
  // if(bg.x<0){
   //bg.x=626;  
   //}  
    
   if(coinGroup.isTouching(scubadiver)){
    coinGroup.destroyEach();  
    score=score+1   
   }
    if(keyDown("up")){
    scubadiver.y=scubadiver.y-20;  
   }
    if(keyDown("down")){
    scubadiver.y=scubadiver.y+20;  
   }
   if(keyDown("right")){
    scubadiver.x=scubadiver.x+20;  
   }
  
   if(keyDown("left")){
    scubadiver.x=scubadiver.x-20;  
   }
  
  
  
   if(sharkGroup.isTouching(scubadiver)){
    sharkGroup.destroyEach();   
    coinGroup.destroyEach();  
    gameState = END;
   }   
}  
  
      
  if(gameState===END){
    gameover.visible=true;
    restart.visible=true; 
     
    bg.velocityX = 0;
    scubadiver.velocityY = 0;
    coinGroup.setVelocityXEach(0);
    sharkGroup.setVelocityXEach(0); 
     
    if(mousePressedOver(restart)) {
      reset();
    } 
     
  }
  

  
  
  
  
  
   
  drawSprites();
   fill("gold");
   textSize(16);
  text("Coins Collected: "+ score, 400,50);
//spawnCoin();
//spawnShark();
    
}

function spawnCoin(){
  if(frameCount%150===0){
  var rand=Math.round(random(50,550));   
   var coin=createSprite(700,rand,20,20);   
  coin.addImage(coinImage);
  coin.velocityX=-10;
  coin.scale=0.0500;
  coinGroup.add(coin);
  }
}
function spawnShark(){
  if(frameCount%100===0){
  var rand=Math.round(random(50,400));   
   var shark=createSprite(700,rand,20,20);   
  shark.addImage(sharkImage);
  shark.velocityX=-9;
  shark.scale=0.0600;
  sharkGroup.add(shark);
  }


}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  coinGroup.destroyEach();
  sharkGroup.destroyEach();
  
  
  score = 0;
  
}







