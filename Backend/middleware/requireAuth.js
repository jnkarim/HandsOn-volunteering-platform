const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  // Verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    // Verify token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Attach user to the request object
    req.user = await User.findOne({ _id }).select('_id name email bio skills causes');
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = requireAuth;