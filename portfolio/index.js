const modal = document.querySelector('.modal-window');
let buttons = document.querySelectorAll('button');
buttons = Array.from(buttons);
buttons.pop();

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    document.body.classList.toggle('fixed-body');
    modal.showModal();
  })
})

modal.addEventListener('close', (e) => document.body.classList.toggle('fixed-body'));