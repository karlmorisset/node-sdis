import express from 'express';
import 'dotenv/config';

const init = (port = null) => {
  const app = express();
  app.listen(port || process.env.NODE_PORT);

  return app;
};

export default init;
