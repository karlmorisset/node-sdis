const logoutForm = document.getElementById('logout-form');

console.log(logoutForm);

logoutForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    await fetch('/auth/logout', {
      method: 'POST',
    });

    location.assign('/auth/login');
  } catch (error) {
    console.warn(error);
  }
});
