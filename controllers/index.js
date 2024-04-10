const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');
const dashboardRoutes = require('./api/dashboardRoutes');
const userComments = require('./api/commentRoutes');
const blogPost = require('./api/blogPostRoutes')

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/comments', userComments)
router.use('/blogpost', blogPost)
router.use('/', homeRoutes);

module.exports = router;
