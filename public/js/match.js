const socket = io();

const commentForm = document.getElementById('comment-form');
const deleteForms = document.querySelectorAll('.comment-delete');

const addComment = (newComment) => {
  const commentsContainer = document.querySelector('.comments');
  const comment = document.createElement('div');

  const commentTemplate = `
    <div class="username">
      ${newComment.author.email}
    </div>

    <div class="comment-item">
      ${newComment.comment}
    </div>
  `;

  comment.innerHTML = commentTemplate;

  commentsContainer.appendChild(comment);
};

socket.on('commentAddedfromBack', (data) => {
  addComment(data.newComment);
});

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

    const newComment = await res.json();

    if (!newComment.errors) {
      commentForm.reset();
      socket.emit('commentAddedFromFront', { newComment });
    }

    if (newComment.errors) {
      Object.keys(newComment.errors).forEach((field) => {
        const errorField = document.querySelector(`.form__error.${field}`);
        const inputField = document.getElementById(field);

        errorField.textContent = newComment.errors[field];
        errorField.classList.add('visible');

        inputField.addEventListener('focus', () => {
          errorField.classList.remove('visible');
        });
      });
    }
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
