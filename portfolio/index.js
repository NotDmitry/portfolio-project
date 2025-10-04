const modal = document.querySelector('dialog');
const closeButton = document.querySelector('.close-button');
let buttons = document.querySelectorAll('button');
buttons = Array.from(buttons);
buttons = buttons.slice(1, -2);

// Modal window
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    document.body.classList.toggle('fixed-body');
    modal.showModal();
  })
})

modal.addEventListener('click', (e) => {
  if (e.target.contains(modal)) modal.close();
})
closeButton.addEventListener('click', () => modal.close());
modal.addEventListener('close', () => document.body.classList.toggle('fixed-body'));

// Accordion
