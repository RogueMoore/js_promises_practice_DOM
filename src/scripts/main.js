'use strict';

const logo = document.querySelector('.logo');

function createNotificationDiv(message, type) {
  const div = document.createElement('div');
  div.setAttribute('data-qa', 'notification');
  div.classList.add(type);
  div.textContent = message;
  document.body.appendChild(div);
}

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  logo.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  logo.addEventListener('mousedown', (e) => {
    if (e.button === 0 || e.button === 2) {
      resolve(`Second promise was resolved`);
    }
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClick = false;
  let rightClick = false;

  logo.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      leftClick = true;
    } else if (e.button === 2) {
      rightClick = true;
    }

    if (leftClick === true && rightClick === true) {
      resolve('Third promise was resolved');
    }
  });
});

firstPromise
  .then((result) => {
    createNotificationDiv(result, 'success');
  })
  .catch((error) => {
    createNotificationDiv(error.message, 'error');
  });

secondPromise.then((result) => {
  createNotificationDiv(result, 'success');
});

thirdPromise.then((result) => {
  createNotificationDiv(result, 'success');
});
