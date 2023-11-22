const handleErrors = (error) => {
  const errors = {};

  if (
    error.errors.length > 0 &&
    error?.errors[0].constructor.name === 'ValidationErrorItem'
  ) {
    error.errors.forEach((e) => {
      errors[e.path] = e.message;
    });
  }

  return errors;
};

export default handleErrors;
