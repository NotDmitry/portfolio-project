function fixBody() {
  document.documentElement.classList.toggle('fixed-body');
  document.body.classList.toggle('fixed-body');
}

function releaseBody() {
  document.documentElement.classList.toggle('fixed-body');
  document.body.classList.toggle('fixed-body');
}

function toggleBodyScroll() {
  if (document.body.classList.contains('fixed-body')) {
    releaseBody();
  } else {
    fixBody();
  }
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
menuLinks.forEach(link => link.addEventListener('click', toggleMenu));

// Modal window
const modal = document.querySelector('dialog');
const closeButton = document.querySelector('.close-button');
const buttons = Array.from(document.querySelectorAll('button')).slice(1, -2);

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    fixBody();
    modal.showModal();
  })
})

modal.addEventListener('close', () => {
  releaseBody();
});
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