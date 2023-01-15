//represents spheres by determining discriminant

function difference(a, b) {
  let output = [];
  if (a.length == b.length) {
    for (let i = 0; i < a.length; i++) {
      output.push(a[i] - b[i]);
    }
  }
  return output;
}

function Dot(a, b) {
  let output = 0;
  if (a.length == b.length) {
    for (let i = 0; i < a.length; i++) {
      output += a[i] * b[i];
    }
  }
  return output;
}

function Norm(a) {
  let output = 0;
  for (let i = 0; i < a.length; i++) {
    output += a[i] ** 2;
  }
  output = output ** (1 / 2);
  return output;
}

function product(k, A) {
  let output = [];
  for (let i = 0; i < A.length; i++) {
    output.push(k * A[i]);
  }
  return output;
}

function setup() {
  createCanvas(800, 800);
  //windowWidth, windowHeight
}

function draw() {
  background(0);
  loadPixels();
  pixelDensity(1);
  let s = 9;
  let O = [1 / 2, 1 / 2, 0];
  let centroid = [1 / 2, 1 / 2, 5];
  let light1 = [-mouseX + 400, -mouseY + 400, 1];
  let max = 4 * width * height;
  let R = 1 / 2;
  let distance = 1;
  for (let i = 0; i < max; i += 4) {
    let V = [
      ((i / 4) % width) / parseFloat(width),
      i / 4 / width / height,
      distance,
    ];
    let a = 0;
    let b = 0;
    let c = 0;
    for (let j = 0; j < 3; j++) {
      a += (V[j] - O[j]) ** 2;
      b += 2 * (O[j] - centroid[j]) * (V[j] - O[j]);
      c += (O[j] - centroid[j]) ** 2;
    }
    c -= R ** 2;
    let D = b ** 2 - 4 * a * c;
    if (D >= 0) {
      let t = (-b + D ** (1 / 2)) / 2 / a;
      let r = [
        (V[0] - O[0]) * t + O[0],
        (V[1] - O[1]) * t + O[1],
        (V[2] - O[2]) * t + O[2],
      ];
      let N = [r[0] - centroid[0], r[1] - centroid[1], r[2] - centroid[2]];
      let view = [(O[0] - V[0]) * t, (O[1] - V[1]) * t, (O[2] - V[2]) * t];
      let I1 = difference(r, light1);
      if (Dot(N, I1) != 0) {
        let R1 = difference(
          product(2, N),
          product(Norm(N) ** 2 / parseFloat(Dot(N, I1)), I1)
        );
        let speculance = 0;
        if (Dot(R1, view) >= 0) {
          speculance =
            (Dot(R1, view) / parseFloat(Norm(R1)) / parseFloat(Norm(view))) **
            s;
        }
        let diffusion = 0;
        if (Dot(N, I1) >= 0) {
          diffusion = Dot(N, I1) / parseFloat(Norm(N)) / parseFloat(Norm(I1));
        }
        let intensity = 0 + (diffusion + speculance);
        let silver = color(200 * intensity, 0 * intensity, 0 * intensity);
        pixels[i] = red(silver);
        pixels[i + 1] = green(silver);
        pixels[i + 2] = blue(silver);
        pixels[i + 3] = alpha(silver);
      }
    }
  }
  updatePixels();
}

//For future reference
/*for(let x = -width/2; x <= width/2; x++) {
  for(let y = -height/2; y <= height/2; y++) {
    let V = [x, y, distance];
    let a = b = c = 0;
    for (let j = 0; j < 3; j++) {
      a += (V[j] - O[j])**2
      b += 2*(O[j] - centroid[j])*(V[j] - O[j])
      c += (O[j] - centroid[j])**2
    }
  }
  let i = 4*((x+width/2)+(y+height/2)*width)
  c -= R**2
  //b**2 - 4*a*c
  if (x**2+x**2 <= 100) {
    pixels[i] = red(silver);
    pixels[i + 1] = green(silver);
    pixels[i + 2] = blue(silver);
    pixels[i + 3] = alpha(silver);
  }
}*/
