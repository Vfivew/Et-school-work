## 1. Requirements

- [NodeJS](https://nodejs.org/en) (18.x.x);
- [npm](https://www.npmjs.com/) (>=9.x.x);
- [PostgreSQL](https://www.postgresql.org/) (15.5)

1. [Fastify](https://fastify.dev/) — a backend framework
2. [Knex](https://knexjs.org/) — a query builder
3. [Objection](https://vincit.github.io/objection.js/) — an ORM

1. [Zod](https://github.com/colinhacks/zod) — a schema validator

## 2. How to Run

### 2.1 Manually

1. Create and fill all .env files. These files are:

- apps/frontend/.env
- apps/backend/.env

You should use .env.example files as a reference.

1. Install dependencies: `npm install`.

2. Run database. You can run it by installing postgres on your computer.

3. Move to : `cd apps/backend` and apply migrations `npm run migrate:dev` and seeds `npm run seed:dev`

4. Run backend: `npm run start:dev -w apps/backend`

5. Run frontend: `npm run start:dev -w apps/frontend`

