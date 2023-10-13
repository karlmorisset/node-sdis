const signUpForm = document.getElementById('signup-form');

signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: signUpForm.email.value,
        password: signUpForm.password.value,
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
      location.assign('/auth/login');
    }
  } catch (error) {
    console.warn(error);
  }
});
