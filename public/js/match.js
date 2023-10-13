const commentForm = document.getElementById('comment-form');
const deleteForms = document.querySelectorAll('.comment-delete');

commentForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment: commentForm.comment.value,
        match: commentForm.match.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (!data.errors) location.reload();

    Object.keys(data.errors).forEach((field) => {
      const errorField = document.querySelector(`.form__error.${field}`);
      const inputField = document.getElementById(field);

      errorField.textContent = data.errors[field];
      errorField.classList.add('visible');

      inputField.addEventListener('focus', () => {
        errorField.classList.remove('visible');
      });
    });
  } catch (error) {
    console.warn(error);
  }
});

deleteForms.forEach((f) => {
  f.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      await fetch('/comments', {
        method: 'DELETE',
        body: JSON.stringify({
          comment: f.comment.value,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      location.reload();
    } catch (error) {
      console.warn(error);
    }
  });
});
