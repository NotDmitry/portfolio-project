// Modal window
const modal = document.querySelector('dialog');
const closeButton = document.querySelector('.close-button');
const buttons = Array.from(document.querySelectorAll('button')).slice(1, -2);

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    document.body.classList.toggle('fixed-body');
    modal.showModal();
  })
})

modal.addEventListener('close', () => document.body.classList.toggle('fixed-body'));
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