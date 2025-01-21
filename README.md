<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

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

### Devops
- **Docker**: elaboração do *Dockerfile*, script para construção da imagem e configuração de ambiente, e do *Docker-Compose* para definição dos serviços da api e banco de dados a serem executados em contêineres.
- **CI/CD com GitHub Actions**: configuração do workflow com a pipeline CI/CD para construção e push da imagem Docker para o repositório de imagens e posterior deploy.

## 3 . Fluxo de dados e Interações

Para o melhor uso da API é recomendado o seguinte fluxo para cadastro das informações:

1 - Cadastro do usuário (POST /user)
2 - Cadastro da pessoa (POST /person)
3 - Vínculo da pessoa ao usuário (PUT /user/:id)
4 - Adição da postagem (POST /post)

Para conhecer mais funcionalidades, realização de testes, e mais detalhes sobre as rotas disponíveis, verifique o `SWAGGER` da aplicação na porta "PORTA"

## 4 . Desafios da equipe

- Integração com o banco de dados postgres;
- Gerenciamento das variáveis de ambientes, e
- Elaboração dos testes automatizados.

## 5 . Experiências de desenvolvimento

- Aprendizado de boas práticas e arquitetura do NestJS, como a organização modular do código, o uso de repositories e TypeOrm;
- Conhecimento adquirido em padrões de arquiteturas como Factories e princípios SOLID com maior prática a respeito de inversão de dependência e responsabilidade única.
- O uso de tecnologias para CI/CD por meio do GitHub Actions e Docker;


# MANUAL DE USO DA API



## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
