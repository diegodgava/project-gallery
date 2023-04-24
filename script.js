const images = document.getElementsByClassName("image");

let globalIndex = 0,
    last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;

  image.dataset.status = "active";

  last = { x, y };
}

const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}

const handleOnMove = e => {
  if(distanceFromLast(e.clientX, e.clientY) > (window.innerWidth / 25)) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}
const darkmode = document.getElementById('darkmode')

let isDarkMode = false;

darkmode.addEventListener('click', () => {
  if (isDarkMode) {
    document.body.style.backgroundColor = 'white';
    document.getElementById('menu').style.backgroundColor = 'white';
    document.getElementById('menu').style.color = 'black';
    isDarkMode = false; 
  }
  else {
    document.body.style.backgroundColor = 'black';
    document.getElementById('menu').style.backgroundColor = 'black';
    document.getElementById('menu').style.color = 'white';
    isDarkMode = true; 
  }
});
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

