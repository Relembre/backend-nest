# RelembreAPP

## Description

RELEMBRE: SOFTWARE PARA AVALIAÇÃO E ACOMPANHAMENTO DO TRATAMENTO DA DOENÇA DE ALZHEIMER EM SEUS ESTÁGIOS INICIAIS.

Este website é uma fonte de apoio e informações essenciais destinada a indivíduos que vivenciam a jornada do Alzheimer, bem como às suas famílias e cuidadores. Desenvolvido com uma abordagem empática e centrada no paciente, este recurso online visa fornecer orientação abrangente, suporte emocional e recursos educacionais para melhor compreender, gerenciar e enfrentar os desafios associados à doença de Alzheimer.

## Installation (Configure o mysql no .env)

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
