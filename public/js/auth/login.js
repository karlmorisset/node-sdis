const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: loginForm.email.value,
        password: loginForm.password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (data.errors) {
      Object.keys(data.errors).forEach((field) => {
        const errorField = document.querySelector(`.form__error.${field}`);
        const inputField = document.getElementById(field);

        errorField.textContent = data.errors[field];
        errorField.classList.add('visible');

        inputField.addEventListener('focus', () => {
          errorField.classList.remove('visible');
        });
      });
    } else {
      location.assign('/matches');
    }
  } catch (error) {
    console.warn(error);
  }
});
