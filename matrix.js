let i = [0, 1];
let j = [1, 0];
let resolution = 30;

let ixInput ;
let iyInput ;

let jxslider ;
let jyslider ;

let resSlider ;

function setup() {
  createCanvas(500, 500);
  background(200);

  strokeWeight(0);
  textSize(12);
  textStyle(NORMAL);
  text('resolution', 10, 15);
  
  resSlider = createSlider(5, 80, 30, 0.1);
  resSlider.position(width + 50, 50);
  resSlider.style('width', '80px');
  
  ixInput = createSlider(-1, 1, 0, 0.01);
  ixInput.position(width + 50, 100);
  ixInput.style('width', '80px');
  
  iyInput = createSlider(-1, 2, 1, 0.01);
  iyInput.position(width + 50, 150);
  iyInput.style('width', '80px');
  iyInput.input(iyinput);

  jxslider = createSlider(0, 2, 1, 0.01);
  jxslider.position(width + 50, 250);
  jxslider.style('width', '80px');
  
  jyslider = createSlider(-1, 1, 0, 0.01);
  jyslider.position(width + 50, 300);
  jyslider.style('width', '80px');

}


function draw() {
  // tranforming to use "normalish cordinates"
  translate(width/2, height/2);
  scale(1,-1);
  
  background(50);
  
  point(0, 0);
 
  let adjustX = (width/2) %resolution;
  let adjustY = (height/2) %resolution;
  
  
  strokeWeight(1);
  stroke(100);
  let px = 0;
  let py = 0;
  
  for(let x=-width/2 + adjustX;x < width/2; x+=resolution) {
    for(let y=-height/2 + adjustY; y< height/2; y+=resolution) {
      
       strokeWeight(0.7);
       stroke(100);
       point(x , y);
       line(x, py, x, y);
       line(px, y, x, y);
      
       let [nx , ny] = transform(x, y, i, j);
       let [pnx, pny] = transform(x, y-1*resolution, i, j);
       let [tnx, tny] = transform(x-1*resolution, y, i, j);
       strokeWeight(1);
       stroke(50 ,190 , 50);
       point(nx , ny);
       line(pnx, pny, nx, ny);
       line(tnx, tny, nx, ny);

       py = y;
    }
    px = x;
    py = height/2;
  }
  
  strokeWeight(2);
  stroke(0);
  line(0, height/2, 0, -height/2);
  line(width/2, 0, -width/2, 0);
  
  i[0] = ixInput.value();
  //i[0] = 0;
  i[1] = iyInput.value();
  
  j[0] = jxslider.value();
  j[1] = jyslider.value();
  //j[0] = i[1];
  //j[1] = i[0];
  
  resolution = resSlider.value();
}

function transform(x, y, i, j) {
  let nx = j[0] * x + i[0] * y;
  let ny = j[1] * x + i[1] * y;
  return [nx, ny];
}

function iyinput() {
  if (this.value){
    i[1] = pareseInt(this.value);
  }
    //i[0] = parseInt(this.value);
}
