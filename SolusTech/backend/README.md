# SolusTech Backend

API REST em Node.js + Express conectada ao SQL Server do banco `SolusTech`.

## Requisitos
- Node.js 18+
- SQL Server acessível a partir da máquina que executa a API
- Banco criado com o script `SolusTech_Completo.sql`

## Instalação
1. Extraia o projeto.
2. Abra um terminal dentro da pasta `solustech-backend`.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Copie `.env.example` para `.env` e preencha usuário/senha do SQL Server. Troque também `JWT_SECRET` por uma string aleatória com pelo menos 32 caracteres.
5. Execute:
   ```bash
   npm run dev
   ```
   ou `npm start` para iniciar sem nodemon.

A API ficará em `http://localhost:3000`.

## Importante sobre senhas do SQL fornecido
O script de exemplo insere senhas em texto puro (`senha123`). Isso não é adequado para produção. O login aceita temporariamente esses registros de demonstração para facilitar o teste; cadastros novos e alterações de senha usam bcrypt. Para produção, migre as senhas antigas para hashes e remova a compatibilidade com texto puro antes de publicar a API.

## Endpoints
Todos os endpoints abaixo, exceto `/api/health` e `/api/auth/login`, exigem:
`Authorization: Bearer SEU_TOKEN`

- `GET /api/health` — verifica API e banco
- `POST /api/auth/login` — login de cliente ou funcionário
- `POST /api/auth/cadastro` — cadastro público de cliente (senha armazenada com bcrypt)
- `/api/clientes`
- `/api/funcionarios`
- `/api/casas`
- `/api/tomadas`
- `/api/assinaturas`
- `/api/placas`
- `/api/pedidos`
- `/api/itens-pedido`
- `/api/notas-fiscais`
- `/api/manutencoes`

Cada recurso aceita `GET /api/recurso`, `GET /api/recurso/:id`, `POST /api/recurso`, `PUT /api/recurso/:id` e `DELETE /api/recurso/:id`. As listas aceitam `?pagina=1&limite=20` (máximo 100 por página). Exclusão exige token de funcionário.

## Exemplos

### Login
`POST http://localhost:3000/api/auth/login`
```json
{
  "email": "joao.silva@email.com",
  "senha": "senha123"
}
```
Resposta: `{ "token": "...", "usuario": { "id": 1, "nome": "Joao Silva", "email": "...", "tipo": "cliente" } }`

### Listar placas
`GET http://localhost:3000/api/placas?pagina=1&limite=20`

### Cadastrar cliente
`POST http://localhost:3000/api/clientes`
```json
{
  "cpf": "12345678901",
  "nome": "Cliente Exemplo",
  "email": "cliente@exemplo.com",
  "senha": "umaSenhaForte123"
}
```

### Criar uma casa
`POST /api/casas`
```json
{
  "id_cliente": 1,
  "endereco": "Rua Exemplo, 100",
  "planta_baixa": null
}
```

### Criar pedido
1. `POST /api/pedidos` com `id_cliente` e opcionalmente `status`.
2. `POST /api/itens-pedido` para cada item com `id_pedido`, `id_placa`, `quantidade` e `preco_unitario`.

Observação: para um sistema comercial real, o fluxo de criação de pedidos deve ser implementado numa operação transacional que valide estoque e grave pedido + itens atomicamente. Esta versão oferece CRUD básico e não reduz estoque automaticamente.

## Respostas e erros
A API retorna JSON. Erros comuns: `400` dados inválidos, `401` token ausente/inválido, `403` permissão insuficiente, `404` registro não encontrado, `409` violação de unicidade/relacionamento e `500` erro interno.

## Segurança antes de publicar
- Configure HTTPS e CORS para o domínio real do front-end.
- Use usuário SQL com privilégios mínimos, não `sa`.
- Configure `JWT_SECRET` forte e mantenha `.env` fora do Git.
- Migre senhas de demonstração para bcrypt e retire o fallback de texto puro.
- Adicione autorização por propriedade para garantir que clientes só consultem seus próprios dados.
- Revise regras fiscais, estoque e estados de pedidos antes de uso real.
