import { Router } from 'express';

export default function () {
  var router = Router();

  router.get('/', (req, res) => {
    res.render('index', {
      title: 'Showcase',
      content: 'We\'re all civic hackers'
    });
  });

  return router;
};