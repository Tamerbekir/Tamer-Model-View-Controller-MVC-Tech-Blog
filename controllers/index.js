const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');
const dashboardRoutes = require('./api/dashboardRoutes');
const homepageRoutes = require('./api/homepageRoutes');

router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/homepage', homepageRoutes)
router.use('/', homeRoutes);

module.exports = router;
