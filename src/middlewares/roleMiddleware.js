const authorize = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Accès interdit." });
    }

    next();
  };
};

module.exports = authorize;