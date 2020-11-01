var bananaImg, obstacleImg;
var ground;
var obstacleGroup, foodGroup;
var background1, backImg;
var monkey, monkeyImg;
var survivalTime = 0;
function preload(){
  backImg=loadImage("images/jungle.jpg");
  
  monkeyImg = loadAnimation("images/Monkey_01.png", "images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png", "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png", "images/Monkey_10.png");
  
  bananaImg=loadImage("images/banana.png");
  obstacleImg=loadImage("images/stone.png");
}
function setup() {
  createCanvas(400, 400);
  
  background1 = createSprite(200, 385, 8000, 400);
  background1.addImage("backgr",backImg);
  //background1.x = background1.width/2;
 
  ground = createSprite(200, 390, 400, 20);
  ground.visible = false;
  
  monkey = createSprite(100, 370, 20, 20);
  monkey.addAnimation("monkey", monkeyImg);
  monkey.scale = 0.1;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  

}

function draw() {
  background(220);
  
  /*if(background1.x<0){
     background1.x = background1.width/2;
     }*/
   //background1.velocityX = -6;
   
   camera.position.x = monkey.x;
   camera.position.y = monkey.y;

   monkey.velocityX = 10;
   
  
  if(keyWentDown("SPACE")){
    monkey.velocityY = -20;  
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  
  
  if(foodGroup.isTouching(monkey)){
    survivalTime = survivalTime+2;
    foodGroup.destroyEach();
     }
  
  switch(survivalTime){
         case 10: monkey.scale=0.12;
         break;
         case 20: monkey.scale=0.14;
         break;
         case 30: monkey.scale=0.16;
         break;
         case 40: monkey.scale=0.18;
         break;
         default: break;
         }
  if(obstacleGroup.isTouching(monkey)){
     monkey.scale = 0.1;
     obstacleGroup.destroyEach();
  }
     


 
  
  monkey.collide(ground);
  
  food();
  obstacle();
 
   
  drawSprites();
     
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time "+survivalTime, monkey.x, 200);



}

function food(){
  if(camera.position.x%200 ===0){
    var banana = createSprite(camera.position.x+200, random(120, 200), 50, 50);
    banana.addAnimation("banana", bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -10;
    
    foodGroup.add(banana);

  }
}

function obstacle(){
  if(camera.position.x%300 === 0){
    var obstacle1 = createSprite(camera.position.x+200, random(100, 350), 50, 50);
    obstacle1.addAnimation("obstacle", obstacleImg);
    obstacle1.scale = 0.2;
    obstacle1.velocityX = -10;
  
    obstacle1.lifetime = 40;
    obstacleGroup.add(obstacle1);
  }
}