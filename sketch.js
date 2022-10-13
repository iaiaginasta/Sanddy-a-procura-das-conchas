//Estados do jogo
var PLAY=1;
var END=0;
var gameState=1;

//variavel de fundo
var fundo,fundoImg;
var invisibleGround;

// variaveis da Sanddy a tartaruga
var tartaruga,tartarugaImg;

//variaveis conchas
var c1,c1Img;
var c2,c2Img;
var c3,c3Img;
var c4,c4Img

// variaveis dos obstaculos
var tubarao,tubaraoImg;
var espinho,espinhoImg;

//pontuacao
var score = 0;

//variavel game over
var gameOverImage;



//carregar imagens
function preload(){

    //fundo
    fundoImg = loadImage("fundo.png");

    //Sanddy
    tartarugaImg = loadImage("tartaruga.png");

    //conchas
    c1Img = loadImage("c1.png");
    c2Img = loadImage("c2.png");
    c3Img = loadImage("c3.png");
    c4Img = loadImage("c4.png");

    //obstaculos
    tubaraoImg = loadImage("tubarao.png");
    espinhoImg = loadImage("espinho.png");

    //game over
    gameOverImage = loadImage("gameOver.png");

}

//criar
function setup() {
    createCanvas(400,400);
   
    //fundo
fundo = createSprite(200,200);
fundo.addImage( fundoImg);

//Sanddy
tartaruga = createSprite(200, 180, 20, 50);
tartaruga.addImage(tartarugaImg);
tartaruga.scale = 0.2;

//chao infinito
invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

conchaGroup=createGroup();
espinhoGroup=createGroup();




}

function draw() {

  
  if(gameState===PLAY){
    
    //Chamar função
    Conchas();
    Espinho();
    
    // Mover a Sanddy com o mouse
    tartaruga.y=World.mouseY;
    tartaruga.x=World.mouseX;
  
    // Aumenta a pontuação
    if(conchaGroup.isTouching(tartaruga)){
      conchaGroup.destroyEach();
      score = score + 2;
    }
    else
    {
      // Vá para o estado final
      if(espinhoGroup.isTouching(tartaruga)){
        gameState=END;
        
       
        
        conchaGroup.destroyEach();
        espinhoGroup.destroyEach();
        conchaGroup.setVelocityXEach(0);
        espinhoGroup.setVelocityXEach(0);
        
        // game over
       espinho.addImage(gameOverImage);
       espinho.scale=2;
       espinho.x=300;
       espinho.y=300;
      }
    }
  }
  
  drawSprites();
  //Exibir pontuação
  textSize(25);
  text("Score : "+ score,250,50);
}


function Conchas(){
    if(World.frameCount%80===0){
      position = Math.round(random(1,2));
      concha=createSprite(400,200,20,20);
      
      
      if(position==1)
      {
        concha.x=600;
        concha.velocityX=-(4+(score/10));
        concha.velocityX=-7
      }
      else
      {
        if(position==2){
            concha.x=0;

        concha.velocityX=-(4+(score/10));
        concha.velocityX= 7;
        }
      }
      
      concha.scale=0.2;
       //concha.debug=true;
       r=Math.round(random(1,4));
      if (r == 1) {
        concha.addImage(c1Img);
      } else if (r == 2) {
        concha.addImage(c2Img);
      } else if (r == 3) {
       concha.addImage(c3Img);
      } else {
      concha.addImage(c4Img);
      }
      
      concha.y=Math.round(random(50,550));
     
      
      concha.setLifetime=100;
      
      conchaGroup.add(concha);
    }
  }

  function Espinho(){
    if(World.frameCount%200===0){
      espinho=createSprite(400,200,20,20);
      espinho.addImage( espinhoImg);
      espinho.scale=0.2;
      espinho.y=Math.round(random(100,550));
      espinho.velocityX=-(10+(score/10));
      espinho.velocityX = -8;
      espinho.setLifetime=50;
      
      espinhoGroup.add(espinho);
    }
  }