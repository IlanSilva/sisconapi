# Resumo

O SISCON(Sistema de Controle de Remessas Expressas) é um projeto pessoal feito para gerenciar todo um processo interno de uma empresa de logística/encomendas, o objetivo deste projeto é tornar fácil todas as operações desde postagem de encomendas até edições de informações e relatórios.

# Qual a função geral da API do projeto?

A API tem como função entregar todas as requisições(desde que devidamente autorizada via TOKEN) que o front-end realiza, como a requisição de uma lista de clientes com parâmetros ou não, requisição de cadastro de um cliente e etc.


# Métodos de requisição:

> Vale lembrar que toda a autenticação é feita através do header 'Bearer Token'. 

## Consulta de clientes

Para esta função a API utiliza QUERY STRINGS para realizar a consulta de clientes por nome, basta utilizar a QUERY STRING com a chave 'NAME' e seu valor em seguida.

##### Exemplo:
> MÉTODO HTTP 'GET': "http://localhost:8082/requests/customers?name=[VALUE]"

Deve-se receber um JSON como o exemplo abaixo:

```
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
```

## Cadastro de clientes

Para realizar o cadastro de clientes a nossa API espera um JSON no corpo de sua requisição.

#### Exemplo:
> MÉTODO HTTP 'POST': http://localhost:8082/requests/customers

#### Modelo padrão do corpo da requisição:

```
{
    "name": "[VALOR]",
    "birth": "[VALOR]",
    "gender": "[VALOR]",
    "cpf": "[VALOR]",
    "phone": "[VALOR]",
    "email": "[VALOR]",
    "address": {
        "cep": "[VALOR]",
        "city": "[VALOR]",
        "uf": "[VALOR]",
        "logradouro": "[VALOR]",
        "number": "[VALOR]",
        "complement": "[VALOR]",
        "reference": "[VALOR]",
    },
}
```
Caso a operação seja feita com sucesso a API deve retornar uma mensagem de sucesso e o id do novo cliente cadastrado.


### Atualizando um cadastro

Para atualizar um cliente é algo parecido com o processo de criação, basta seguir os passos abaixo:

1. Passar como parâmetro o ID do cliente conforme exemplo abaixo.
2. No corpo da requisição é necessário passar um JSON conforme exemplo abaixo.

#### Exemplo:

> MÉTODO HTTP PUT: http://localhost:8082/requests/customers/profile/[ID DO CLIENTE]

#### Modelo padrão do corpo da requisição:
```
{
    "name": "[VALOR]",
    "birth": "[VALOR]",
    "gender": "[VALOR]",
    "cpf": "[VALOR]",
    "phone": "[VALOR]",
    "email": "[VALOR]"
}
```
Nota:
> O endereço do cliente não é atualizado junto com o cliente por motivo de uma maior organização.




# Qual o status atual do projeto?

Abaixo alguns objetivos:

- [x] API SISCON(Feita mas passando por algumas otimizações)
- [ ] FRONT-END SISCON
