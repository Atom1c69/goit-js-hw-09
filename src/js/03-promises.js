import Notiflix from 'notiflix';

const button = document.querySelector('button');
const form = document.querySelector('.form');

button.classList.add('form-btn');

form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const firstDelay = parseInt(
    document.querySelector('input[name="delay"]').value
  );
  const delayStep = parseInt(
    document.querySelector('input[name="step"]').value
  );
  const amount = parseInt(document.querySelector('input[name="amount"]').value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const delay = firstDelay + i * delayStep;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
