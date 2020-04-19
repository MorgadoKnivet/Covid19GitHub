module.exports.routeException = (err, req, res, next) => {
  let error;
  try {
    error = typeof err.message === 'string' ? JSON.parse(err.message) : err;
  } catch (tryCatchErr) {
    error = err;
  }

  if (
    error !== null &&
    error !== undefined &&
    error.msg !== null &&
    error.msg !== undefined &&
    error.code !== null &&
    error.code !== undefined
  ) {
    res.status(error.code).json({ error: error.msg });
    console.log(`Exception error code ${error.code} -> ${error.msg}`);
  } else {
    res.status(500).json({ error: 'Algo deu errado' });
    console.log(`Exception error code 500 -> ${error}`);
  }
};
