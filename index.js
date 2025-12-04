function toggleBodyScroll() {
  document.documentElement.classList.toggle('fixed-body');
  document.body.classList.toggle('fixed-body');
}

// Burger menu
const menuIcon = document.querySelector('.burger-icon');
const burgerMenu = document.querySelector('.burger-wrapper');
const menuLinks = document.querySelectorAll('.burger-menu a');
const mediaQuery = window.matchMedia("screen and (max-width: 768px)");

function toggleMenu() {
  menuIcon.classList.toggle('active');
  burgerMenu.classList.toggle('opened');
  toggleBodyScroll();
}

mediaQuery.addEventListener('change', () => {
  if (!mediaQuery.matches && burgerMenu.classList.contains('opened')) {
    toggleMenu();
  }
});

menuIcon.addEventListener('click', toggleMenu);
menuLinks.forEach(link => link.addEventListener('click', (e) => {
  e.preventDefault();
  toggleMenu();
  setTimeout(() => {
    window.location.href = link.href;
  }, 100);
}));

// Slider
const hoverZones = Array.from(document.querySelectorAll('.slider-hover-zone'));
const slider = document.querySelector('.slider-wrapper');

if (window.matchMedia('not ((hover: hover) and (pointer: fine))').matches) {
  window.addEventListener('load', () => {
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.scrollLeft = (sliderContainer.scrollWidth - sliderContainer.clientWidth) / 2;
  });
}

let delta = 0;
let speed = 10;
let timer = null;

function calculateBoundaries() {
  const sliderContainerWidth = slider.offsetParent.clientWidth;
  const sliderWidth = slider.clientWidth;
  return (sliderWidth - sliderContainerWidth) / 2;
}

function slide(direction) {
  let bound = calculateBoundaries();

  if (delta >= bound && direction === 1) {
    clearTimeout(timer);
    return;
  }

  if (delta <= -bound && direction === -1) {
    clearTimeout(timer);
    return;
  }

  delta += speed * direction;
  delta = Math.max(Math.min(delta, bound), -bound);
  slider.style.transform = `translateX(${delta}px)`;
  timer = setTimeout(() => slide(direction), 30);
}

hoverZones[0].addEventListener('mouseover', () => {
  slide(1);
})

hoverZones[1].addEventListener('mouseover', () => {
  slide(-1);
})

hoverZones[0].addEventListener('mouseout', () => clearTimeout(timer));
hoverZones[1].addEventListener('mouseout', () => clearTimeout(timer));

// Modal window
const modal = document.querySelector('dialog');
const closeButton = document.querySelector('.close-button');
const buttons = Array.from(document.querySelectorAll('button')).slice(1, -2);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    toggleBodyScroll();
    modal.showModal();
  })
})

modal.addEventListener('close', toggleBodyScroll);
modal.addEventListener('click', (e) => {
  if (e.target.contains(modal)) modal.close();
})
closeButton.addEventListener('click', () => modal.close());

// Accordion
const accordionQuestions = Array.from(document.querySelectorAll('details'));

const activeQuestion = +sessionStorage.getItem('question');
if (activeQuestion !== -1) {
  accordionQuestions[activeQuestion].setAttribute('open', '');
} else {
  accordionQuestions[0].removeAttribute('open');
}

accordionQuestions.forEach((question, _, accordion) => {
  question.addEventListener('toggle', () => {
    const openId = accordion.findIndex((question) => question.open);
    sessionStorage.setItem('question', String(openId));
  })
})