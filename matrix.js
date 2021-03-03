let i = [0.2, 1];
let j = [1, 0];


function setup() {
  createCanvas(500, 500);
  background(180);
}


function draw() {
  // tranforming to use "normalish cordinates"
  translate(width/2, height/2);
  scale(1,-1);
  
  background(180);
  
  point(0, 0);
  
  let resolution = 30;
  let adjustX = (width/2) %resolution;
  let adjustY = (height/2) %resolution;


  strokeWeight(1);
  stroke(100);
  let px, py = 0;
  
  for(let x=-width/2 + adjustX;x < width/2; x+=resolution) {
    for(let y=-height/2 + adjustY; y< height/2; y+=resolution) {
      
       let [nx , ny] = transform(x, y, i, j);
       let [pnx, pny] = transform(x, y-1*resolution, i, j);
       let [tnx, tny] = transform(x-1*resolution, y, i, j);
       strokeWeight(1);
       stroke(0,0,300);
       point(nx , ny);
       line(pnx, pny, nx, ny);
       line(tnx, tny, nx, ny);

       strokeWeight(1);
       stroke(100);
       point(x , y);
       line(x, py, x, y);
       line(px, y, x, y);
       py = y;
    }
    px = x;
    py = height/2;
  }
  
  strokeWeight(2);
  stroke(0);
  line(0, height/2, 0, -height/2);
  line(width/2, 0, -width/2, 0);
 
}

function transform(x, y, i, j) {
  let nx = j[0] * x + i[0] * y;
  let ny = j[1] * x + i[1] * y;
  return [nx, ny];
}
