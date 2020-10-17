const router = require('express').Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const auth = require('../middlewares/auth');

router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

module.exports = router;
