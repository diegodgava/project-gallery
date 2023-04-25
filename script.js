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
  const slider = document.getElementById('slider');
  const sliderValue = slider.value;

  // Calcular a distância mínima baseada no valor do slider
  const distanceMin = window.innerWidth / sliderValue;

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
    document.body.style.backgroundColor = 'white';
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
    document.body.style.backgroundColor = 'black';
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
document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();
}, { passive: false });

animate__fadeOutUp

/* const plus = document.getElementById('plus')
const modal = document.getElementById('modal')
const modalCont = document.getElementById('modal-container')

plus.addEventListener('click', () => {
modal.style.display = 'flex'
modalCont.style.display = 'flex'

modalCont.addEventListener('click', () => {
  setTimeout(function() {
  modalCont.style.display = 'none';
  modal.style.display = 'none';
  }, 100);
})

})
 */