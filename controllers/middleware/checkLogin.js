function checkLogin(req, res, next) {
    if (req.session.user && req.session.loggedIn) {
      next();
    } else {
      res.send("No tienes acceso a esta página");
    }
  }
  
  module.exports = checkLogin;