var monkey, monkey_moving;
var ground, invisibleGround, groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart,gameOverImg,restartImg;

var BananaGroup,banana,bananaImage;
var StoneGroup,stone,stoneImage;
var score,jungle;


function preload(){
  monkey_moving = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  groundImage = loadImage("ground.jpg");
  //jungleImage = loadImage("jungle.jpg");  
  bananaImage = loadImage("Banana.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  stoneImage = loadImage("stone.png");
  }

function setup() {
  createCanvas(600, 300);
  
  monkey = createSprite(50,280,20,50);
  monkey.addAnimation("moving", monkey_moving);
  monkey.scale = 0.1;
  
  //jungle = createSprite(500,300);
  //jungle.addImage("jungle",jungleImage);
  
  gameOver = createSprite(300,150,20,20);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  restart = createSprite(300,175,20,20);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  score = 0;
  ground = createSprite(200,500,400,20);
  ground.addImage("ground",groundImage);
  ground.scale = 0.5;
  ground.x = ground.width /2;
  ground.velocityX = -(6 + (3*score)/100);
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  BananaGroup = new Group();
  StoneGroup = new Group();
}

function draw() {
  background(255);
if(gameState == PLAY) {
    if(keyDown("space") && monkey.y > 254) {
    monkey.velocityY = -10;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnBanana();
  spawnStone();
  
  if(BananaGroup.isTouching(monkey)) {
    score = score + 1;
  }
  if(StoneGroup.isTouching(monkey)) {
    gameState = END;
  }
}
  
  if(gameState == END) {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    StoneGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
    StoneGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  text("Score: "+ score, 500,50);
  
  monkey.collide(invisibleGround);
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    banana = createSprite(600,180,40,10);
    banana.y = Math.round(random(220,280));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -(6 + (3*score)/100);
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    BananaGroup.add(banana);
  }
  
}

function spawnStone() {
  if(frameCount % 200 === 0) {
    stone = createSprite(600,280,20,20);
    stone.scale = 0.1;
    stone.lifetime = 300;
    stone.velocityX = -(6 + (3*score)/100);
    stone.addImage(stoneImage);
    StoneGroup.add(stone);
    }
    
    //assign scale and lifetime to the obstacle           
    //add each obstacle to the group
  }

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  StoneGroup.destroyEach();
  BananaGroup.destroyEach();
  score = 0;
  ground.velocityX = -(6 + (3*score)/100);
}