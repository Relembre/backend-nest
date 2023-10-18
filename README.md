# RelembreAPP

## Description

RELEMBRE: SOFTWARE PARA AVALIAÇÃO E ACOMPANHAMENTO DO TRATAMENTO DA DOENÇA DE ALZHEIMER EM SEUS ESTÁGIOS INICIAIS.

Este website é uma fonte de apoio e informações essenciais destinada a indivíduos que vivenciam a jornada do Alzheimer, bem como às suas famílias e cuidadores. Desenvolvido com uma abordagem empática e centrada no paciente, este recurso online visa fornecer orientação abrangente, suporte emocional e recursos educacionais para melhor compreender, gerenciar e enfrentar os desafios associados à doença de Alzheimer.

## Tech

### Backend
- O Backend foi feito na tecnologia **[NodeJS](https://tecnoblog.net/responde/o-que-e-node-js-guia-para-iniciantes/)**, junto ao framework **[NestJS](https://nestjs.com/)**
- Temos uma documentação em tempo real, com o **[Swagger](https://swagger.io/)**, você consegue fazer suas requisições quando estiver rodando o backend na host **http://localhost:3000/docs**
- Enviamos email via **[MAILTRAP](https://mailtrap.io/)** de maneira Sandbox (não é enviado realmente no email real, porém usamos o sandbox para teste. Porém, adicionando o cartão de crédito, de maneira gratuita conseguimos realizar este envio)
- Usamos CRON JOB para todos os dias (ou determinado tempo), realizar alguma ação/função dentro do backend, tendo a nossa lógica sendo para enviar um email se o lembrete for cadastrado no determinado dia (lembrete é segunda e o dia é segunda, logo o email é enviado)
- O Frontend foi feito com HTML, CSS (SCSS) e Javascript Nativo, fazendo as requisições com a FetchAPI do próprio navegador
- O Site é responsivo, ou seja, o visual consegue se adaptar para a maioria dos dispositivos (PC, Tablet e Celular)

## Installation (Configure o mysql no .env)

#### Faça a instalação do **[NodeJS](https://nodejs.org/en)** na versão LTS mais recente 

#### Faça a instalação do **[XAMPP](https://www.apachefriends.org/download.html)** na versão do seu sistema operacional, depois inicie no apache2 e o banco de dados MYSQL, ambos precisam ficar com a **COR VERDE**. 

#### Crie um banco de dados com nome `relembre`

#### No arquivo .env, configure de acordo com o seu servidor de MYSQL

#### Exemplo: DATABASE_URL="mysql://${userMysql}:{senhaMysql}@localhost:3306/relembre"

#### Por padrão, se utilizar o xampp utilize assim: DATABASE_URL="mysql://root:@localhost:3306/relembre"

```bash
$ npm install
$ npx prisma db push
```

## See saved data

```bash
# prisma ORM interface
$ npx prisma studio
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

##### Se quiser alterar a frequência de envio de email de lembrete, vá no src\services\lembreteMedicamento\lembrete-medicamento.jobs.ts e altere a frequencia na anotação @Cron("10 \* \* \* \* "), veja na internet quando você quer colocar... Exemplo: a cada 1 minuto @Cron(" 1 \* \* \* \* ")

#### Site de ajuda: https://crontab.cronhub.io/

## API Docs -> http://localhost:3000/docs

## License

Nest is [MIT licensed](LICENSE).
