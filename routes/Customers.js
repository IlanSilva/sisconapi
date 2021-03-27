const express = require('express')
const Router = express.Router()
const authverify = require('../middleware/auth')
const { query } = require('../database/index')
const secret = '869dc5e63173eee4ff96c55dc942c10c'
const models = require('../models/modelCustomer.js')


// GET METHODS


Router.get('/customers', authverify , models.findCustomers)

// POST METHODS

Router.post('/customers', authverify, models.createCustomers)


// PUT METHODS

Router.put('/customers/profile/:id', authverify, models.updateCustomers)

module.exports = Router