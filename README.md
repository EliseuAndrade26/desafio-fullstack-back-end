# desafio-fullstack

este trabalho consiste na criação de uma API com Node.js onde podemos fazer a criação de usuários e a adição de contatos com relação direta entre o usuário e o contato adicionado.

## Instalação De Dependencias

```bash
# yarn
yarn

# npm
npm run i
```

## configuração do Arquivo .env

```
O arquivo .env.example possui os exemplos sitados
```

DATABASE_URL: Foi configurado para receber um baco de dado por meio do PostgreSQL, deve receber seu usuário, sua senha, um host de sua escolha, uma porta de sua escolha e um banco de dados pré-existente, o local para colocar cada dado está representado pela palavra-chave em inglês entre <>. OBS: Para alterar qual gerenciador de banco de dados será usado, altere o type que está presente no retorno do arquivo data-source.ts

PORT: Aqui será passado a porta na qual sua aplicação irá rodar, podendo ser alterado a sua escolha.

SECRET_KEY: Sua chave secreta para criação do Token de autorização.

EXPIRES_IN: Tempo de expiração do Token de autorização.

## Iniciar API

```Bash

# yarn
yarn dev

# npm
npm run dev
```
