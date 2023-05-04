const express = require('express')

const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/category', require('./category.routes'))
router.use('/product', require('./product.routes'))
router.use('/user', require('./user.routes'))

module.exports = router
