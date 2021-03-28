const express = require('express')
const Router = express.Router()
const db = require('../database/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = '869dc5e63173eee4ff96c55dc942c10c'



Router.post('/register', function (req, res, next) {
    if (!req.body.name || !req.body.corp_id || !req.body.password ){
      console.log(req.body.name, req.body.corp_id, req.body.password)
      return res.status(400).json({erro: 'Há falta de parâmetros!'})
    }
    
    bcrypt.hash(req.body.password, 14, (err, hash) => {
      if (err){return res.status(400).json({erro: `Oops! Houve um erro, ${err}`})}
      db.query
      ('INSERT INTO sisconapi.clients (CLI_NAME, CLI_CORP_ID, CLI_PASSWORD) VALUES ($1, $2, $3) RETURNING CLI_ID, CLI_NAME;', [req.body.name, req.body.corp_id, hash], (error, resol) => {
          if (error) {return res.status(400).json({erro: error})}
          return res.status(200).json({message: 'Usuário criado com sucesso!', usuario: {
              id: resol.rows[0].CLI_ID,
              name: resol.rows[0].CLI_NAME}})
    })
  })
})

Router.get('/getatoken', function(req, res, next) {
  const [hashType, hash] = req.headers.authorization.split(' ')
  const [id, password] = Buffer.from(hash, 'base64').toString().split(':')
  const query = 'SELECT * FROM sisconapi.clients WHERE CLI_CORP_ID = $1;'
  console.log(id, password)
  const start = Date.now()
  db.query(query, [id], (e, r) => {

    console.log(`QUERY EXECUTED in ${Date.now() - start}ms | ${query}`)
    if (e) {
      console.log(e)
      res.json({erro: e})
      return
    }
    if (r) {

      bcrypt.compare(password, r.rows[0].cli_password, (err, resolve) => {
        if (err) {
          console.log(err)
          res.json({mensagem: 'Falha na autenticação!'})
          return
        }
        if(resolve == true){
          const token = jwt.sign(r.rows[0].cli_id, secret)
          res.json({message: 'Autenticação realizada com sucesso!', client: {id: r.rows[0].CLI_CORP_ID, name: r.rows[0].CLI_NAME }, token: token})
          return
        }else if(resolve == false){
          console.log(err)
          res.json({mensagem: 'Falha na autenticação!'})
          return
        }

      })
    }
  })
})


module.exports = Router