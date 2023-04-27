const images = document.getElementsByClassName("image");
const body = document.getElementById("background");
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

let controle = 25
const handleOnMove = e => {
  const slider = document.getElementById('slider');
  const sliderValue = slider.value;

  const distanceMin = window.innerWidth / controle;

  if(distanceFromLast(e.clientX, e.clientY) > distanceMin) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];

    activate(lead, e.clientX, e.clientY);

    if(tail) tail.dataset.status = "inactive";
    
    globalIndex++;
  }
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



const darkmode = document.getElementById('darkmode')

let isDarkMode = false;

darkmode.addEventListener('click', () => {
  if (isDarkMode) {
    body.style.backgroundColor = 'white';
    document.getElementById('menu').style.backgroundColor = 'white';
    document.getElementById('menu').style.color = 'black';
    document.getElementById('sun').classList.add('animate__fadeOutUp')
    document.getElementById('moon').classList.remove('animate__fadeOutUp')

    setTimeout(() => {
      document.getElementById('sun').style.display = 'none'
      document.getElementById('moon').style.display = 'flex'
    }, 400); 
    isDarkMode = false; 
  }
  else {
    body.style.backgroundColor = 'black';
    document.getElementById('menu').style.backgroundColor = 'black';
    document.getElementById('menu').style.color = 'white';
    document.getElementById('moon').classList.add('animate__fadeOutUp')
    document.getElementById('sun').classList.remove('animate__fadeOutUp')

    setTimeout(() => {
      document.getElementById('moon').style.display = 'none'
      document.getElementById('sun').style.display = 'flex'
    }, 400);    
    isDarkMode = true; 
  }
});
body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });


const background = document.getElementById("background");



for (let i = 0; i < images.length; i++) {
  const image = images[i];
  image.addEventListener("click", () => {
    if (image.classList.contains("active")) {
      image.classList.remove("active");
      controle = 25
      for (let j = 0; j < images.length; j++) {
        const otherImage = images[j];
        otherImage.classList.remove("opaque");
      }
      document.querySelector("body").classList.remove("opaque");
    } else {
      image.classList.add("active");
      controle = 0
      for (let j = 0; j < images.length; j++) {
        const otherImage = images[j];
        if (otherImage !== image) {
          otherImage.classList.add("opaque");
        }
      }
    }
  });
}




