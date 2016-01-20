import { Router } from 'express';
import passport from 'passport';

export default function () {
  var router = Router();

  router.get('/', (req, res) => {
    res.render('index');
  });

  router.get('/account', ensureAuthenticated, (req, res) => {
    res.render('account', { user: req.user });
  });

  router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
  });

  // GET /auth/github
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in GitHub authentication will involve redirecting
  //   the user to github.com.  After authorization, GitHubwill redirect the user
  //   back to this application at /auth/github/callback
  router.get('/auth/github',
    passport.authenticate('github'), (req, res) => {
      // The request will be redirected to GitHub for authentication, so this
      // function will not be called.
    });

  // GET /auth/github/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  router.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
      res.redirect('/');
    });

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });


  return router;
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}
