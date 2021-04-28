const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.send('Access denied !!!');

  try {
    const authUser = jwt.verify(token, process.env.AUTH_SECRET_TOKEN);
    req.user = authUser;
    next();
  }
  catch (error) {
    res.send('An error occured !');
  }
}


module.exports = auth;