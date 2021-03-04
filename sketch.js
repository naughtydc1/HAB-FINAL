var balloon,bg,balloonimg,position,height,database;

function preload(){
bg = loadImage("image/Hot Air Ballon-01.png");
balloonimg = loadAnimation("image/Hot Air Ballon-02.png","image/Hot Air Ballon-03.png","image/Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1320,650);
  balloon = createSprite(150, 200, 50, 50);
  balloon.addAnimation("balloonimage",balloonimg);
  balloon.scale = 0.5;

   
var balloonPosition=database.ref('balloon/height');
balloonPosition.on("value",readHeight, showError);

}

function draw() {

  background(bg); 
  if (keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("HAB",balloonimg);
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("HAB",balloonimg);
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("HAB",balloonimg);
    balloon.scale = balloon.scale -0.004;
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("HAB",balloonimg);
    balloon.scale = balloon.scale +0.004;
  }

  fill("red");
  stroke("black");
  textSize(20);
  text("USE CURSOR KEYS TO CONTROL THE MOVEMENT OF HOT AIR BALLOON ",20,20);

  
  drawSprites();
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x ,
    'y': height.y + y 
  })
}
function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}

