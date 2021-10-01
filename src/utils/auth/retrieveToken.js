const retrieveToken = (req) => {
  let token = null;
  const bearer = req.headers.authorization || null;
  if (bearer) {
    token = bearer.split(" ", 2)[1];
  }

  return token;
};

module.exports = retrieveToken;
