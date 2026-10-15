/* =========================================================
   SOLUSTECH - Script de criação do banco de dados (SQL Server)
   Baseado no DER sugerido para o Documento Norteador PRIT
   ========================================================= */

IF DB_ID('SolusTech') IS NULL
    CREATE DATABASE SolusTech;
GO

USE SolusTech;
GO

-- =========================================================
-- CLIENTE
-- =========================================================
CREATE TABLE CLIENTE (
    id_cliente      INT IDENTITY(1,1) PRIMARY KEY,
    cpf             VARCHAR(11)   NOT NULL UNIQUE,
    nome            VARCHAR(150)  NOT NULL,
    email           VARCHAR(150)  NOT NULL UNIQUE,
    senha           VARCHAR(255)  NOT NULL,
    data_cadastro   DATETIME      NOT NULL DEFAULT GETDATE()
);
GO

-- =========================================================
-- FUNCIONARIO
-- =========================================================
CREATE TABLE FUNCIONARIO (
    id_funcionario  INT IDENTITY(1,1) PRIMARY KEY,
    nome            VARCHAR(150)  NOT NULL,
    cargo           VARCHAR(80)   NOT NULL,
    email           VARCHAR(150)  NOT NULL UNIQUE,
    senha           VARCHAR(255)  NOT NULL
);
GO

-- =========================================================
-- CASA (1 cliente -> N casas)
-- =========================================================
CREATE TABLE CASA (
    id_casa         INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente      INT           NOT NULL,
    endereco        VARCHAR(255)  NOT NULL,
    planta_baixa    VARCHAR(255)  NULL,   -- caminho/URL do arquivo
    CONSTRAINT FK_CASA_CLIENTE FOREIGN KEY (id_cliente)
        REFERENCES CLIENTE (id_cliente)
);
GO

-- =========================================================
-- TOMADA_INTELIGENTE (1 casa -> N tomadas)
-- =========================================================
CREATE TABLE TOMADA_INTELIGENTE (
    id_tomada       INT IDENTITY(1,1) PRIMARY KEY,
    id_casa         INT           NOT NULL,
    identificador   VARCHAR(60)   NOT NULL,
    status          VARCHAR(20)   NOT NULL DEFAULT 'ativa',
    CONSTRAINT FK_TOMADA_CASA FOREIGN KEY (id_casa)
        REFERENCES CASA (id_casa)
);
GO

-- =========================================================
-- ASSINATURA_PREMIUM (1 cliente -> 0..1 assinatura ativa)
-- =========================================================
CREATE TABLE ASSINATURA_PREMIUM (
    id_assinatura   INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente      INT           NOT NULL,
    data_inicio     DATE          NOT NULL,
    data_fim        DATE          NULL,
    status          VARCHAR(20)   NOT NULL DEFAULT 'ativa',
    CONSTRAINT FK_ASSINATURA_CLIENTE FOREIGN KEY (id_cliente)
        REFERENCES CLIENTE (id_cliente)
);
GO

-- =========================================================
-- PLACA_SOLAR (catálogo de produtos)
-- =========================================================
CREATE TABLE PLACA_SOLAR (
    id_placa        INT IDENTITY(1,1) PRIMARY KEY,
    modelo          VARCHAR(120)  NOT NULL,
    potencia        DECIMAL(10,2) NOT NULL,  -- em kWp/W
    preco           DECIMAL(10,2) NOT NULL,
    estoque         INT           NOT NULL DEFAULT 0
);
GO

-- =========================================================
-- PEDIDO
-- =========================================================
CREATE TABLE PEDIDO (
    id_pedido       INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente      INT           NOT NULL,
    id_funcionario  INT           NULL,      -- preenchido ao autorizar
    data_pedido     DATETIME      NOT NULL DEFAULT GETDATE(),
    status          VARCHAR(20)   NOT NULL DEFAULT 'pendente',
    CONSTRAINT FK_PEDIDO_CLIENTE FOREIGN KEY (id_cliente)
        REFERENCES CLIENTE (id_cliente),
    CONSTRAINT FK_PEDIDO_FUNCIONARIO FOREIGN KEY (id_funcionario)
        REFERENCES FUNCIONARIO (id_funcionario)
);
GO

-- =========================================================
-- ITEM_PEDIDO (1 pedido -> N itens; N itens -> 1 placa)
-- =========================================================
CREATE TABLE ITEM_PEDIDO (
    id_item         INT IDENTITY(1,1) PRIMARY KEY,
    id_pedido       INT           NOT NULL,
    id_placa        INT           NOT NULL,
    quantidade      INT           NOT NULL CHECK (quantidade > 0),
    preco_unitario  DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_ITEM_PEDIDO FOREIGN KEY (id_pedido)
        REFERENCES PEDIDO (id_pedido),
    CONSTRAINT FK_ITEM_PLACA FOREIGN KEY (id_placa)
        REFERENCES PLACA_SOLAR (id_placa)
);
GO

-- =========================================================
-- NOTA_FISCAL (1 pedido -> 0..1 nota)
-- =========================================================
CREATE TABLE NOTA_FISCAL (
    id_nota         INT IDENTITY(1,1) PRIMARY KEY,
    id_pedido       INT           NOT NULL UNIQUE,
    data_emissao    DATETIME      NOT NULL DEFAULT GETDATE(),
    valor_total     DECIMAL(10,2) NOT NULL,
    CONSTRAINT FK_NOTA_PEDIDO FOREIGN KEY (id_pedido)
        REFERENCES PEDIDO (id_pedido)
);
GO

-- =========================================================
-- SOLICITACAO_MANUTENCAO
-- =========================================================
CREATE TABLE SOLICITACAO_MANUTENCAO (
    id_solicitacao   INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente       INT           NOT NULL,
    id_funcionario   INT           NULL,     -- preenchido ao avaliar
    data_solicitada  DATETIME      NOT NULL DEFAULT GETDATE(),
    descricao        VARCHAR(500)  NULL,
    status           VARCHAR(20)   NOT NULL DEFAULT 'pendente',
    CONSTRAINT FK_SOLICITACAO_CLIENTE FOREIGN KEY (id_cliente)
        REFERENCES CLIENTE (id_cliente),
    CONSTRAINT FK_SOLICITACAO_FUNCIONARIO FOREIGN KEY (id_funcionario)
        REFERENCES FUNCIONARIO (id_funcionario)
);
GO

/* =========================================================
   DADOS DE TESTE E CONSULTAS
   ========================================================= */

-- INSERT --
INSERT INTO CLIENTE (cpf, nome, email, senha)
VALUES
('11111111101', 'Joao Silva', 'joao.silva@email.com', 'senha123'),
('11111111102', 'Maria Souza', 'maria.souza@email.com', 'senha123'),
('11111111103', 'Carlos Lima', 'carlos.lima@email.com', 'senha123'),
('11111111104', 'Ana Costa', 'ana.costa@email.com', 'senha123'),
('11111111105', 'Pedro Alves', 'pedro.alves@email.com', 'senha123'),
('11111111106', 'Juliana Martins', 'juliana.martins@email.com', 'senha123'),
('11111111107', 'Fernanda Rocha', 'fernanda.rocha@email.com', 'senha123'),
('11111111108', 'Ricardo Gomes', 'ricardo.gomes@email.com', 'senha123');


INSERT INTO FUNCIONARIO (nome, cargo, email, senha)
VALUES
('Rafael Santos', 'Agente Solustech', 'rafael.santos@solustech.com', 'senha123'),
('Patricia Lopes', 'Agente Solustech', 'patricia.lopes@solustech.com', 'senha123'),
('Marcos Teixeira', 'Tecnico de Manutencao', 'marcos.teixeira@solustech.com', 'senha123');


INSERT INTO CASA (id_cliente, endereco, planta_baixa)
VALUES
(1, 'Rua das Flores, 120 - Sao Paulo/SP', 'plantas/casa1.pdf'),
(1, 'Av. Brasil, 450 - Sorocaba/SP', 'plantas/casa2.pdf'),
(2, 'Rua Sete de Setembro, 88 - Campinas/SP', 'plantas/casa3.pdf'),
(3, 'Rua XV de Novembro, 300 - Santos/SP', 'plantas/casa4.pdf'),
(4, 'Rua das Acacias, 45 - Osasco/SP', 'plantas/casa5.pdf'),
(5, 'Av. Paulista, 1500 - Sao Paulo/SP', NULL),
(6, 'Rua do Comercio, 210 - Guarulhos/SP', 'plantas/casa7.pdf'),
(7, 'Rua Bahia, 77 - Jundiai/SP', 'plantas/casa8.pdf'),
(8, 'Rua Minas Gerais, 19 - Barueri/SP', NULL),
(2, 'Estrada do Sol, 900 - Ibiuna/SP', 'plantas/casa10.pdf');


INSERT INTO TOMADA_INTELIGENTE (id_casa, identificador, status)
VALUES
(1, 'TOM-0001', 'ativa'),
(1, 'TOM-0002', 'ativa'),
(2, 'TOM-0003', 'ativa'),
(3, 'TOM-0004', 'ativa'),
(3, 'TOM-0005', 'inativa'),
(4, 'TOM-0006', 'ativa'),
(5, 'TOM-0007', 'manutencao'),
(6, 'TOM-0008', 'ativa'),
(7, 'TOM-0009', 'ativa'),
(8, 'TOM-0010', 'ativa'),
(9, 'TOM-0011', 'inativa'),
(10, 'TOM-0012', 'ativa');


INSERT INTO ASSINATURA_PREMIUM (id_cliente, data_inicio, data_fim, status)
VALUES
(1, '20260101', NULL, 'ativa'),
(2, '20260215', NULL, 'ativa'),
(3, '20260310', NULL, 'ativa'),
(5, '20250601', '20260601', 'cancelada'),
(7, '20260420', NULL, 'ativa');


-- potencia em Watts
INSERT INTO PLACA_SOLAR (modelo, potencia, preco, estoque)
VALUES
('Placa Monocristalina 550W', 550.00, 899.90, 40),
('Placa Monocristalina 450W', 450.00, 749.90, 55),
('Placa Policristalina 330W', 330.00, 529.90, 30),
('Placa Bifacial 600W', 600.00, 1099.90, 25),
('Placa Flexivel 100W', 100.00, 389.90, 15),
('Placa Monocristalina 670W', 670.00, 1299.90, 20);


INSERT INTO PEDIDO (id_cliente, id_funcionario, data_pedido, status)
VALUES
(1, 1, '20260810', 'concluido'),
(2, 2, '20260818', 'concluido'),
(3, 1, '20260901', 'autorizado'),
(4, NULL, '20260912', 'pendente'),
(5, 2, '20260905', 'recusado'),
(6, 1, '20260820', 'concluido'),
(7, NULL, '20260922', 'pendente'),
(8, 2, '20260924', 'autorizado');


INSERT INTO ITEM_PEDIDO (id_pedido, id_placa, quantidade, preco_unitario)
VALUES
(1, 1, 4, 899.90),
(1, 5, 1, 389.90),
(2, 2, 6, 749.90),
(3, 4, 3, 1099.90),
(4, 3, 2, 529.90),
(5, 6, 10, 1299.90),
(6, 1, 2, 899.90),
(6, 2, 2, 749.90),
(7, 5, 3, 389.90),
(8, 6, 2, 1299.90);


-- Notas emitidas apenas para pedidos autorizados/concluidos
INSERT INTO NOTA_FISCAL (id_pedido, data_emissao, valor_total)
VALUES
(1, '20260811', 3989.50),
(2, '20260819', 4499.40),
(3, '20260902', 3299.70),
(6, '20260821', 3299.60),
(8, '20260925', 2599.80);


INSERT INTO SOLICITACAO_MANUTENCAO (id_cliente, id_funcionario, data_solicitada, descricao, status)
VALUES
(1, 3, '20260820', 'Tomada TOM-0001 nao responde ao comando', 'concluida'),
(2, 3, '20260901', 'Queda de rendimento nas placas do telhado', 'autorizada'),
(3, NULL, '20260915', 'Inversor emitindo alerta sonoro', 'pendente'),
(5, 2, '20260910', 'Limpeza e revisao geral das placas', 'recusada'),
(7, NULL, '20260922', 'Verificar conexao da tomada inteligente', 'pendente'),
(1, 3, '20260925', 'Revisao preventiva semestral', 'autorizada');


-- VER TODAS AS TABELAS --
SELECT * FROM INFORMATION_SCHEMA.TABLES;

SELECT * FROM CLIENTE;
SELECT * FROM FUNCIONARIO;
SELECT * FROM CASA;
SELECT * FROM TOMADA_INTELIGENTE;
SELECT * FROM ASSINATURA_PREMIUM;
SELECT * FROM PLACA_SOLAR;
SELECT * FROM PEDIDO;
SELECT * FROM ITEM_PEDIDO;
SELECT * FROM NOTA_FISCAL;
SELECT * FROM SOLICITACAO_MANUTENCAO;


-- SELECT --
SELECT *
FROM CLIENTE;


SELECT *
FROM TOMADA_INTELIGENTE
WHERE status = 'ativa';


SELECT *
FROM FUNCIONARIO
WHERE cargo = 'Agente Solustech';


SELECT *
FROM FUNCIONARIO
WHERE cargo <> 'Agente Solustech';


SELECT *
FROM PLACA_SOLAR;


SELECT *
FROM PLACA_SOLAR
WHERE potencia >= 550;


SELECT *
FROM PLACA_SOLAR
WHERE preco > 800;


SELECT *
FROM PLACA_SOLAR
WHERE preco BETWEEN 500 AND 1000;


SELECT *
FROM PLACA_SOLAR
WHERE modelo LIKE '%Monocristalina%';


SELECT *
FROM PLACA_SOLAR
WHERE preco > 700
AND estoque > 30;


SELECT *
FROM PLACA_SOLAR
WHERE modelo LIKE '%Bifacial%'
OR modelo LIKE '%Flexivel%';


SELECT *
FROM PEDIDO
WHERE NOT status = 'concluido';


SELECT *
FROM SOLICITACAO_MANUTENCAO
WHERE NOT status = 'concluida';


SELECT *
FROM CLIENTE
ORDER BY nome;


SELECT *
FROM PLACA_SOLAR
ORDER BY preco DESC;


SELECT *
FROM NOTA_FISCAL
ORDER BY valor_total DESC;


SELECT
    status,
    COUNT(*) AS total_tomadas
FROM TOMADA_INTELIGENTE
GROUP BY status;


SELECT
    status,
    COUNT(*) AS total_pedidos
FROM PEDIDO
GROUP BY status;


SELECT
    status,
    COUNT(*) AS total_solicitacoes
FROM SOLICITACAO_MANUTENCAO
GROUP BY status;


SELECT
    id_pedido,
    SUM(quantidade * preco_unitario) AS total_itens
FROM ITEM_PEDIDO
GROUP BY id_pedido;


SELECT
    p.status,
    AVG(n.valor_total) AS media_valor
FROM NOTA_FISCAL n
INNER JOIN PEDIDO p ON p.id_pedido = n.id_pedido
GROUP BY p.status;


SELECT MAX(valor_total) AS maior_nota
FROM NOTA_FISCAL;


SELECT MIN(valor_total) AS menor_nota
FROM NOTA_FISCAL;


SELECT SUM(valor_total) AS total_faturado
FROM NOTA_FISCAL;


SELECT AVG(valor_total) AS media_faturada
FROM NOTA_FISCAL;


-- UPDATES --
UPDATE CLIENTE
SET email = 'carlos.lima@novoemail.com'
WHERE id_cliente = 3;


UPDATE PLACA_SOLAR
SET preco = 849.90
WHERE id_placa = 1;


UPDATE PEDIDO
SET status = 'autorizado', id_funcionario = 1
WHERE id_pedido = 4;


UPDATE SOLICITACAO_MANUTENCAO
SET status = 'concluida'
WHERE id_solicitacao = 2;


UPDATE TOMADA_INTELIGENTE
SET status = 'ativa'
WHERE id_tomada = 7;


UPDATE ASSINATURA_PREMIUM
SET status = 'cancelada', data_fim = '20260928'
WHERE id_assinatura = 3;