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
const offsetY = -10;
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
  var cnv = createCanvas(width, height, WEBGL);
  fov = PI / 2;
  escala = 4;
  camZ = 13 / 4 * (height / 2) / tan(fov / 2);
  perspective(fov, width / height, camZ / 2, camZ * 10);
  camera(camX, camY, camZ, posX, posY, posZ, 0, 1, 0);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}


function draw() {
  //camZ = slider.value() / 4 * (height / 2) / tan(fov / 2);

  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  // pointLight(50, 70, 70, dirX, dirY, 100);
  directionalLight(250, 250, 250, -dirX, -dirY, -1);
  r = map(sin(radians(frameCount)), 0, 1, 0, 180);
  g = map(cos(radians(frameCount) + PI / 3), 0, 1, 0, 40);
  b = map(sin(radians(frameCount) + PI / 7), 0, 1, 0, 50);
  clear();
  // background(0, 0, 0);
  background(255);
  orbitControl();
  ambientLight(255);
  pointLight(10, 20, 20, -10000, 10000, 0);
  noStroke();


  push(); //para aplicar la rotación a los dos elementos
  rotateY(radians(frameCount) / 9);
  rotateX(0.15 * cos(radians(frameCount) / 2));

  //portada
  push(); {
    translate(0, offsetY, 2.4); // parriba (y) 
    texture(cover);
    box(tam, tam, 9, 10, 10);
  }
  pop();

  // dentroFuera = keyIsPressed && keyCode === SHIFT ? 0.7 * (mouseY - height) : dentroFuera;
  // limitao = Math.min(Math.max(-0.95 * (mouseY - height), 0), height);
  limitao = map(mouseY, 0, height, -tam + height / 2, height / 2);

  dentroFuera = limitao;

  //disco
  push(); {
    offsetDisco = Math.min(10 * offsetY - dentroFuera, offsetY);
    push(); { //vinilo
      translate(0, offsetDisco, -1.125);
      fill(20);
      // rotateX(PI / 2);
      // cylinder(tam / 2, 4, 1000, 1000);
      rotateY(PI / 2);
      scale(escala);
      model(discoM);
    }
    pop();
    galletaSize = tam / 2.5;
    push(); { //galleta A
      translate(0, offsetDisco, 2.9);
      fill(250, 250, 255);
      ellipse(0, 0, galletaSize);
      // fill(r, g, b, 70);
      // translate(0, 0, 0.007);
      // ellipse(0, 0, galletaSize / 10);
    }
    pop();

    push(); { //galleta B
      translate(0, offsetDisco, -5);
      fill(250, 250, 255);
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
    box(tam, tam, 9, 10, 10);
    // scale(escala);
    // model(coverM);
  }
  pop();
  pop();

  //suelo
  push(); {
    rotateX(-0.5 * cos(radians(frameCount) / 2));
    rotateY(0.5 * sin(radians(frameCount) / 2));

    translate(0, offsetY + 650);
    rotateX(PI / 2);
    fill('rgba(0,0,0,0');
    texture(logoBazofia);
    plane(logoBazofia.width / 1.2, logoBazofia.height / 1.2)
  }
  pop();

  // push(); {//habitacion
  //   stroke('rgba(0,255,0,0.25)');
  //   strokeWeight(4);
  //   fill('rgba(0,255,0, 0.25)');
  //   translate(0, offsetY + 950, 0);
  //   rotateX(PI / 2);
  //   box(2500, 9000, 1);
  // }
  // pop();
}
