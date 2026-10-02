# AutoFix - Projeto escolar

## Tecnologias
- HTML, CSS e JavaScript
- Node.js
- Express
- Prisma
- JWT
- bcryptjs
- MySQL

Não há Java, Python, PHP ou SQL escrito manualmente no projeto.

## Como executar

### 1. Banco
Instale MySQL e crie um banco vazio chamado `autofix`.

### 2. Backend
Entre em `backend`, copie `.env.example` para `.env` e ajuste `DATABASE_URL`.

Depois:

```bash
npm install
npx prisma generate
npx prisma migrate dev --name inicial
node prisma/seed.js
npm start
```

### 3. Frontend
Abra `frontend/index.html` com um servidor local (por exemplo, Live Server do VS Code).

Login de teste:
- E-mail: admin@autofix.com
- Senha: 123456

## Observação
O trabalho usa Prisma para o banco, então o aluno não precisa escrever consultas SQL manualmente. A senha não é guardada em texto puro: é gerado hash com bcrypt. O CPF é criptografado no backend.
