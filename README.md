<p align="center">
  <img src="https://github.com/user-attachments/assets/f9b94ac9-1dce-4e06-8e79-6919fdaf2813" alt="Descrição da Imagem">
</p>
<br><br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/eadacb82-9bec-4897-9911-00bed69e41ae" alt="Descrição da Imagem">
</p>
<br><br>

## MANUAL DE USO DA API

### Configuração do .env:

```bash
NODE_ENV=
PORT=
DATABASE=
DATABASE_PASSWORD=
DATABASE_PORT=
JWT_SECRET=
```

### Instalação do projeto

```bash
$ npm install
```

### Compilação e Start

```bash
# development
$ npm run start
```

### Rodar testes

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Montagem do container

```bash
# criar imagem docker 
$ npm run docker:up

# recriar imagem docker
$ npm run docker:rebuild
```
<br><br>

# ARQUITETURA DA APLICAÇÃO
## 1 . Diagrama de componentes:

A api é dividida em dois componentes principais:
- **Backend**: contém a regra de negócios da api, construído em Node.JS utilizando o NestJS;
- **Banco de dados**: banco de dados relacional Postgres para persistência das informações. 

## 2 . Principais módulos e camadas
### **Módulos**
A aplicação foi desenvolvida visando a segregação de funcionalidades e regras de negócio por contexto. para tanto possui um módulo principal denominado **AppModule** em que configura banco de dados e importa os demais módulos, como por exemplo o primeiro módulo da api denominado **BlogModule**, responsável pelo cadastro de usuários, de alunos ou de professores, e também de gerenciamento de postagens do 
-  **AppModule**: responsável pelas configurações gerais da api, como por exemplo a implementação das variáveis de ambiente e a integração com o banco de dados Postgres por meio do TypeOrm, e também pela importação dos demais módulos existentes ou que venham a ser criados.
-  **BlogModule**: específico para a funcionalidade de blog, com as entidades, repositórios, serviços e controladores relacionados a usuários, posts e pessoas (alunos e professores).

### **Entidades**  
**User**: a entidade representa um usuário do sistema, e possui uma relação "one to one" com a entidade `Person`.

| Atributo | Tipo de dados | Descrição |
| :-----------| :---:| :--- |
| `id`   | *number*     | (PK) identificador único, numérico e sequencial, da entidade    |
| `username`   | *varchar(255)*     | identificador textual do usuário  |
| `password`   | *varchar(255)*     | senha para autenticação do usuário    |
| `person`   | *number*     | (FK: person_id) identificador da `pessoa` pertencente ao usuário    |

**Person**: representa uma postagem no blog, e possui uma relação "many to one" com a entidade `Person` (autor do post). 

| Atributo | Tipo de dados | Descrição |
| :--- | :---:| :--- |
| `id`   | *number*     | (PK) identificador único, numérico e sequencial, da entidade    |
| `name`   | *varchar(255)*     | nome da pessoa    |
| `surname`   | *varchar(255)*     | sobrenome da pessoa   |
| `email`   | *number*     | endereço eletrônico da pessoa    |
| `professor`   | *boolean*     | valor lógico para identificação de docentes    |

**Post**: representa uma pessoa e suas informações, além de identificar se é aluno ou professor, essa entidade serve às entidades `users` e `persons`.

| Atributo | Tipo de dados | Descrição |
| :--- | :---:| :--- |
| `id`   | *number*     | (PK) identificador único, numérico e sequencial, da entidade    |
| `title`   | *varchar(255)*     | título da postagem no blog   |
| `content`   | *text*    | conteúdo textual da postagem no blog    |
| `author`   | *number*     | (FK: person_id) identificador da `pessoa` pertencente ao usuário    |
| `created_at`   | *timestamp*    | identificador único da entidade    |
| `updateD_at`   | *timestamp*   | identificador único da entidade    |

### **Camadas**
- **Repositórios**: implementações concretas para interação com o banco de dados PostgreSQL;
- **Serviços**: camada que contém as regras de negócio e utilizam os repositórios para realizar operações em banco de dados;
- **Controladores**: lidam com as requisções http fazendo o roteamento e utilizam os serviços para retornar as respostas apropriadas;
- **Filtros**: filtro global para trtamento de exceções HTTP;
- **Pipes**: para validação de dados utilizando a biblioteca Zod.
- **Guards**: controla o acesso de usuários autenticados e validações de permissão de administrador (docente).
- **Utils**: funções comuns reutilizaveis. 

### Devops
- **Docker**: elaboração do *Dockerfile*, script para construção da imagem e configuração de ambiente, e do *Docker-Compose* para definição dos serviços da api e banco de dados a serem executados em contêineres.
- **CI/CD com GitHub Actions**: configuração do workflow com a pipeline CI/CD para construção e push da imagem Docker para o repositório de imagens e posterior deploy.

## 3 . Fluxo de dados e Interações

Para o melhor uso da API é recomendado o seguinte fluxo para cadastro das informações:

1 - Cadastro da pessoa (POST /person)
2 - Cadastro do usuário (POST /user)
3 - Adição da postagem (POST /post)
4 - Consultas nas rotas de GET para posts, pessoas e usuários. 

Para conhecer mais funcionalidades, realização de testes, e mais detalhes sobre as rotas disponíveis, verifique o `SWAGGER` da aplicação na porta "PORTA"

## 4 . Desafios da equipe

- Integração com o banco de dados postgres;
- Gerenciamento das variáveis de ambientes, e
- Elaboração dos testes automatizados.

## 5 . Experiências de desenvolvimento

- Aprendizado de boas práticas e arquitetura do NestJS, como a organização modular do código, o uso de repositories e TypeOrm;
- Conhecimento adquirido em padrões de arquiteturas como Factories e princípios SOLID com maior prática a respeito de inversão de dependência e responsabilidade única.
- O uso de tecnologias para CI/CD por meio do GitHub Actions e Docker;
