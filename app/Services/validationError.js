const driver = `./${process.env.DB_DRIVER}-ValidationError.js`;

const getHandleErrors = async () => {
  const driverPromise = await import(driver);
  return driverPromise.default;
};

const handler = await getHandleErrors();

export default handler;
