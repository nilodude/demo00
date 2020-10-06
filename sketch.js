let width = 1920;
let height = 1080;
let choco;
let camX = 0;
let camY = -900;
let camZ;
let posX = 0;
let posY = 0;
let posZ = 0;
let dentroFuera = 0;
let limitao = 0;
let firstDraw = false;
const tam = 800;
const offsetY = -120;


function preload() {
  cover = loadImage('bazofia.jpg');
  back = loadImage('back.png')
  logoBazofia = loadImage('logoBazofia.png');
}

function setup() {
  createCanvas(width, height, WEBGL);
  let fov = PI / 6;
  camZ = 1.75 * (height / 2) / tan(fov / 2);
  perspective(fov, width / height, camZ / 2, camZ * 10);
  camera(camX, camY, camZ, posX, posY, posZ, 0, 1, 0);
}


function draw() {
  r = map(sin(radians(frameCount)), 0, 1, 0, 180);
  g = map(cos(radians(frameCount) + PI / 3), 0, 1, 0, 40);
  b = map(sin(radians(frameCount) + PI / 7), 0, 1, 0, 50);
  background(r, g, b, 70);
  // orbitControl();

  ambientLight(255);
  pointLight(10, 20, 20, -10000, 10000, 0);
  noStroke();


  push(); //para aplicar la rotación a los dos elementos
  rotateY(radians(frameCount) / 9);

  rotateX(0.15 * cos(radians(frameCount) / 2));

  //portada
  push(); {
    translate(0, offsetY, 1); // parriba (y) 
    texture(cover);
    box(tam, tam, 9, 1000, 1000);
  }
  pop();

  // dentroFuera = keyIsPressed && keyCode === SHIFT ? 0.7 * (mouseY - height) : dentroFuera;
  limitao = Math.min(Math.max(-0.75 * (mouseY - height), 0), height);
  dentroFuera = limitao;
  //disco
  push(); {
    push(); { //vinilo
      translate(dentroFuera, offsetY, -1.125);
      fill(0);
      rotateX(PI / 2);
      cylinder(tam / 2, 4, 1000, 1000);
    }
    pop();
    galletaSize = tam / 2.5;
    push(); { //galleta A
      translate(dentroFuera, offsetY, 1.126);
      fill(250, 250, 255);
      ellipse(0, 0, galletaSize);
      fill(r, g, b, 70);
      translate(0, 0, 0.007);
      ellipse(0, 0, galletaSize / 10);
    }
    pop();

    push(); { //galleta B
      translate(dentroFuera, offsetY, -5);
      fill(250, 250, 255);
      ellipse(0, 0, galletaSize);
      fill(r, g, b, 70);
      translate(0, 0, -0.1);
      ellipse(0, 0, galletaSize / 10);
    }
    pop();
  }
  pop();
  //contraportada
  push();
  translate(0, offsetY, -9); //idem + padentro (z)
  rotateY(PI);
  texture(back);
  box(tam, tam, 9, 1000, 1000);
  pop();
  pop();

  //suelo
  push();
  rotateX(-0.05 * cos(radians(frameCount) / 2));
  rotateY(0.05 * sin(radians(frameCount) / 2));

  translate(0, 500);
  rotateX(PI / 2);
  texture(logoBazofia);
  plane(logoBazofia.width / 1.2, logoBazofia.height / 1.2)
  pop();
}
