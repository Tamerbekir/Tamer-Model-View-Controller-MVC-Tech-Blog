const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');
const dashboardRoutes = require('./api/dashboardRoutes');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
