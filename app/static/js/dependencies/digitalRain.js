const digitalRainOverlay = document.getElementById("digitalRainOverlay");

// CODE CREDIT TO: https://ruletheweb.co.uk/matrix.html
function rand_int(a, b) {
  return Math.floor(Math.random() * (b - a) + a);
}

const character_set =
  " 0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";

export function rain() {
  for (let i = 0; i < 90; i++) {
    const trail = document.createElement("div");
    trail.classList.add("digital-rain-drop");
    for (let j = rand_int(20, 50); j; j--) {
      const x = document.createElement("pre");
      const y = document.createTextNode(character_set[rand_int(0, 56)]);
      x.appendChild(y);
      x.style.opacity = 0;
      trail.appendChild(x);
    }
    trail.id = "trail" + i;
    trail.timer = rand_int(-99, 0);
    trail.style.left = rand_int(0, window.innerWidth) + "px";
    trail.style.top = rand_int(-window.innerHeight, 0) + "px";
    trail.style.fontSize = rand_int(10, 25) + "px";

    digitalRainOverlay.appendChild(trail);
    const intervalId = setInterval(() => update(i), rand_int(60, 120));
    setTimeout(() => clearInterval(intervalId), 10000);
  }
}

function update(j) {
  const trail = document.getElementById("trail" + j);
  let chars = trail.childNodes;
  let timer = trail.timer + 1;
  let age = timer - chars.length - 50;
  if (age > 0) {
    if ((trail.style.opacity = 1 - age / 32) == 0) {
      for (let character_set in chars)
        if (chars[character_set].style) chars[character_set].style.opacity = 0;
      trail.style.left = rand_int(0, window.innerWidth) + "px";
      trail.style.top =
        rand_int(-window.innerHeight / 2, window.innerHeight / 2) + "px";
      trail.style.opacity = 1;
      timer = -50;
    }
  }
  trail.timer = timer;
  if (timer < 0 || timer > chars.length + 12) return;
  for (let i = timer; i > 0 && i > timer - 12; i--) {
    let opacity = 1 - (timer - i) / 16;
    if (i < chars.length && chars[i].style) {
      chars[i].style.opacity = opacity;
    }
  }
}
