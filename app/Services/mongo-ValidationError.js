const handleErrors = (error) => {
  const errors = {};

  if (error.code && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    errors[field] = 'Cet email existe déjà';
  } else {
    Object.keys(error.errors).forEach((field) => {
      errors[field] = error.errors[field].message;
    });
  }

  return errors;
};

export default handleErrors;
