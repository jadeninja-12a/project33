var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle = null;
var turn = 0;
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var gameState;
function setup() {
  createCanvas(800, 800);
  gameState = "start";
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Division(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(20);
  push();
  stroke("red");
  line(0, 500, 800, 500);
  pop();
  text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   if(particle != null){
    particle.display();
    if(particle.body.position.y > 760){
      if(particle.body.position.x < 160 && particle.body.position.x > 0){
          score += 500;
          
      } else if(particle.body.position.x >= 160 && particle.body.position.x < 240){
        score += 200;
      } else if (particle.body.position.x >= 240 && particle.body.position.x < 640){
        score += 100;  
      } else if(particle.body.position.x >= 500 && particle.body.position.x < 720){
        score += 200;
      } else if(particle.body.position.x >= 720 && particle.body.position.x < 800){
        score += 400;
      } else{
        score -= 1000;
      }
      particle = null;
          if(turn  == 5 ){
            gameState = "end";
          }
    }
   }
   ground.display();
 
  
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
}
function mousePressed(){
  if(gameState == "start" && particle == null){
    turn++;
    particle = new Particle(random(mouseX- 50, mouseX+50), 10, 10, 10);
  }
}