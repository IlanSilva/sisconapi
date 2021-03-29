const db = require('../database/index')


exports.findCustomers = async function (req, res) {
  console.log('A request has been received | ', Date())
  const client = await db.connect()
  let start = Date.now()
  try{
    const textQuery = "SELECT * FROM customer.customers WHERE cst_name LIKE $1;"
    const values = [`${req.query.name}%`]
    const query = await db.query(textQuery, values)
    let end = Date.now()
    console.log(`Query executed in ${end-start}ms`)
    const returningValue = []
    
    for (index in query.rows) {
      returningValue.push({
        id: query.rows[index].cst_id_pk,
        name: query.rows[index].cst_name,
        birth: query.rows[index].cst_bith,
        cpf: query.rows[index].cst_cpf,
        gender: query.rows[index].cst_gender,
        email: query.rows[index].cst_email,
        phone: query.rows[index].cst_phone,
        createdin: query.rows[index].createdin
      })
    }
    
    res.status(200).json({message: 'Busca realizada com sucesso!', client: returningValue, error: ''})
  }catch(error) {
    console.log(error)
    res.status(404).json({message: `Oops! Error executing query | ${Date()}`, client: [], error: err})
  }finally{
	  client.release()
  }
}

exports.createCustomers = async function(req, res) {
	console.log('A request has been received | ', Date())
	const client = await db.connect()
    const start = Date.now()
    try{
      // Cadastrando o cliente
      await client.query('BEGIN')
      const insertCustomer = 'INSERT INTO customer.customers (CST_NAME, CST_BIRTH, CST_CPF, CST_EMAIL, CST_PHONE, CST_GENDER) VALUES ($1, $2, $3, $4, $5, $6) RETURNING CST_ID_PK'
      const customerValues = [req.body.name, req.body.birth, req.body.cpf, req.body.email, req.body.phone, req.body.gender]
      const query = await client.query(insertCustomer, customerValues)
      console.log(query.rows[0])
      // Cadastrando o endereço
      
      const insertAddress = "INSERT INTO customer.address (COD_CUSTOMER, ADR_CEP, ADR_CITY, ADR_UF, ADR_LOGRADOURO, ADR_NUMBER, ADR_COMPLEMENT, ADR_REFERENCE) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ADR_ID_PK"
      const addressValues = [query.rows[0].cst_id_pk, req.body.address.cep, req.body.address.city, req.body.address.uf,
                            req.body.address.logradouro, req.body.address.number, req.body.address.complement,
                            req.body.address.reference]
      await client.query(insertAddress, addressValues)
      await client.query('COMMIT')
      const end = Date.now()
      console.log(`Query executed in ${end-start}ms`)
      res.status(200).json({message: 'Sucesso na criação do cliente!', client: query.rows[0], error: ''})
    
    
    }catch(err){  
      await client.query('ROLLBACK')
      const date = Date()
      res.status(404).json({message: `Oops! Error executing query | ${Date()}`, client: [], error: err})
      console.log(err)
      
    }finally{
      client.release()
    }
  }

exports.updateCustomers =  async function(req, res) {
    console.log('A request has been received | ', Date())
	if (!req.params.id){
      res.status(404).json({message: 'Id do cliente não informado', client: [], error: ''})
      return
    }
    const client = await db.connect()
    let start = Date.now()
    try{
      await client.query('BEGIN')
      const insertCustomer = 'UPDATE customer.customers SET CST_NAME = $1, CST_BIRTH = $2, CST_CPF = $3, CST_EMAIL = $4, CST_PHONE = $5, CST_GENDER = $6 WHERE CST_ID_PK = $7 RETURNING CST_ID_PK'
      const customerValues = [req.body.name, req.body.birth, req.body.cpf, req.body.email, req.body.phone, req.body.gender, req.params.id]
      const query = await client.query(insertCustomer, customerValues)
      res.status(200).json({message: 'Cliente atualizado com sucesso!', client: query.rows[0].cst_id_pk, error: ''})
      console.log(query.rows[0])
      await client.query('COMMIT')
      let end = Date.now()
      console.log(`Query executed in ${end-start}ms`)
    }catch(err){
      await client.query('ROLLBACK')
      let date = Date()
      res.status(404).json({error: `Oops! Error executing query | ${Date()}`, client: [], error: err})
      console.log(err)
    }finally{
      client.release()
    }
  }
