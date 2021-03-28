# Resumo

O SISCON(Sistema de Controle de Remessas Expressas) é um projeto pessoal feito para gerenciar todo um processo interno de uma empresa de logística/encomendas, o objetivo deste projeto é tornar fácil todas as operações desde postagem de encomendas até edições de informações e relatórios.

# Qual a função geral da API do projeto?

A API tem como função entregar todas as requisições(desde que devidamente autorizada via TOKEN) que o front-end realiza, como a requisição de uma lista de clientes com parâmetros ou não, requisição de cadastro de um cliente e etc.


# Métodos de requisição:

> Vale lembrar que toda a autenticação é feita através do header 'Bearer Token'. 

### Consulta de clientes

Para esta função a API utiliza QUERY STRINGS para realizar a consulta de clientes por nome, basta utilizar a QUERY STRING com a chave 'NAME' e seu valor em seguida.

##### Exemplo:
> "http://localhost:8082/requests/customers?name=[VALUE]"

Deve-se receber um JSON como o exemplo abaixo:

{
    "message": "Busca realizada com sucesso!",
    "client": [
        {
            "id": 1,
            "name": "ilan",
            "birth": "2021-10-11"
            "cpf": "12345678912",
            "email": "ilan@teste.com",
            "phone": "(84)9988-5555",
            "gender": "M",
            "createdin": "2021-03-27",
        },
    ],
    "error": ""
}




# Qual o status atual do projeto?

Abaixo alguns objetivos:

- [x] API SISCON(Feita mas passando por algumas otimizações)
- [ ] FRONT-END SISCON
