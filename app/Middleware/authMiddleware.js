import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.redirect('/auth/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.redirect('/auth/login');
    next();
  });
};

export const authUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.locals.user = null;
    next();
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        res.locals.user = decodedToken.user;
        next();
      }
    });
  }
};
