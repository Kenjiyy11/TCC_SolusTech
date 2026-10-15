# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# SolusTech — React + Express + SQL Server

## Estrutura
- `frontend/`: painel React + Vite responsivo.
- `backend/`: API Node.js + Express, se incluída no pacote.
- Banco: SQL Server `SolusTech`, criado pelo script SQL fornecido anteriormente.

## Iniciar o back-end
No terminal:
```bash
cd backend
npm install
```
Copie `backend/.env.example` para `backend/.env` e configure as credenciais reais do SQL Server e `JWT_SECRET` (pelo menos 32 caracteres). Depois:
```bash
npm run dev
```
A API padrão é `http://localhost:3000/api`.

## Iniciar o front-end
Em outro terminal:
```bash
cd frontend
npm install
```
Copie `frontend/.env.example` para `frontend/.env` se precisar mudar a URL da API. Em seguida:
```bash
npm run dev
```
Abra o endereço exibido pelo Vite (normalmente `http://localhost:5173`).

## Funcionalidades
- Login de clientes/funcionários e cadastro de cliente.
- Dashboard com contagens baseadas nas tabelas da API.
- Navegação por casas, tomadas, placas solares, pedidos, manutenção, assinaturas e notas fiscais.
- Busca nas tabelas, atualização e formulários básicos de cadastro para casas, tomadas, placas e manutenção.
- Layout responsivo para desktop e celular.

## Banco e segurança
O projeto usa os endpoints e os nomes de tabela/coluna do SQL fornecido. O banco não é recriado automaticamente. O SQL de demonstração contém senhas em texto puro; a compatibilidade no login é temporária e deve ser removida após migração para bcrypt. Antes de publicar, implemente autorização por propriedade (clientes só podem acessar os próprios registros), revise permissões, HTTPS e regras de negócio. O dashboard não exibe consumo real, pois as tabelas fornecidas não incluem telemetria dos dispositivos.
