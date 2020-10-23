let width = 600;
let height = 500;
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
let fov = 0;
let coverM;
let discoM;
let escala;

function preload() {
  cover = loadImage('bazofia.jpg');
  back = loadImage('back.png')
  logoBazofia = loadImage('logoBazofia.png');
  coverM = loadModel('cover.obj', true);
  discoM = loadModel('disco.obj', true);
}

function setup() {
  // slider = createSlider(0, 30, 100);
  // slider.position(10, 10);
  // slider.style('width', '80px');
  createCanvas(width, height, WEBGL);
  fov = PI / 6;
  escala = 4;
  camZ = 13 / 4 * (height / 2) / tan(fov / 2);
  perspective(fov, width / height, camZ / 2, camZ * 10);
  camera(camX, camY, camZ, posX, posY, posZ, 0, 1, 0);

}


function draw() {
  //camZ = slider.value() / 4 * (height / 2) / tan(fov / 2);


  r = map(cos(radians(frameCount / random(1, 8))), 0, 1, 100, 180);
  g = map(cos(radians(frameCount / random(1, 7)) + PI / 7.1), 0, 1, 50, 140);
  b = map(cos(radians(frameCount / random(1, 9)) + PI / 7), 0, 1, 50, 150);
  clear();
  background(r, g, b, 70);
  // orbitControl();
  ambientLight(r, g, b);
  pointLight(10, 20, 20, -10000, 10000, 0);
  noStroke();


  push(); //para aplicar la rotación a los dos elementos
  rotateY(radians(frameCount) / 9);
  rotateX(0.15 * cos(radians(frameCount) / 2));

  //portada
  push(); {
    translate(0, offsetY, 2.4); // parriba (y) 
    texture(cover);
    box(tam, tam, 9, 1000, 1000);
  }
  pop();

  // dentroFuera = keyIsPressed && keyCode === SHIFT ? 0.7 * (mouseY - height) : dentroFuera;
  limitao = Math.min(Math.max(-0.95 * (mouseY - height), 0), height);
  dentroFuera = limitao;
  //disco
  push(); {
    push(); { //vinilo
      translate(0, offsetY - dentroFuera, -1.125);
      fill(0);
      // rotateX(PI / 2);
      // cylinder(tam / 2, 4, 1000, 1000);
      rotateY(PI / 2);
      scale(escala);
      model(discoM);
    }
    pop();
    galletaSize = tam / 2.5;
    push(); { //galleta A
      translate(0, offsetY - dentroFuera, 2.9);
      fill(250, 250, 255);
      ellipse(0, 0, galletaSize);
      // fill(r, g, b, 70);
      // translate(0, 0, 0.007);
      // ellipse(0, 0, galletaSize / 10);
    }
    pop();

    push(); { //galleta B
      translate(0, offsetY - dentroFuera, -5);
      fill(50, 50, 55);
      ellipse(0, 0, galletaSize);
      // fill(r, g, b, 70);
      // translate(0, 0, -0.1);
      // translate(0, 0, -0.1);
      // ellipse(0, 0, galletaSize / 10);
    }
    pop();
  }
  pop();
  //contraportada
  push(); {
    translate(0, offsetY, -5); //idem + padentro (z)
    rotateY(PI);
    // rotateY(PI / 2);
    texture(back);
    box(tam, tam, 9, 1000, 1000);
    // scale(escala);
    // model(coverM);
  }
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
