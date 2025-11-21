<div align="center">
    <img height="150cm" src="/mov-frontend/src/assets/mov-logo.png" alt="MOV - Logo Oficial"/>
</div>

<br>
Projeto desenvolvido para matéria de Residencia em parceria com a Startup Azzz. MOV é um sistema de monitoramento preventivo para evitar roubo de cabos e vandalismo em infraestrutura subterrânea.
<br>

## Resumo do Projeto

**MOV** é uma plataforma full-stack desenhada para monitorar em tempo real a abertura de bueiros, diferenciando eventos de **Manutenção Agendada** (Autorizada) de eventos de **Violação** (Não Autorizada) detectados por sensores IoT (Internet das Coisas).

O objetivo principal foi criar um painel de controle robusto, seguro e reativo, com foco na **Gestão de Incidentes** e na **Visualização Geográfica** dos ativos.

## Funcionalidades e Regras de Negócio

- **Autenticação (Login & RBAC):** Login seguro com `bcrypt` e gerenciamento de permissões baseado em funções (Role-Based Access Control - RBAC).
- **Permissões e Acessos:** A visibilidade das telas é definida pela função do usuário:
  - **Admin/SuperAdmin:** Acesso total (Gestão de Usuários, Bueiros, Manutenções e Eventos).
  - **GestorManutencao:** Acesso a Agendamentos e Visualização de Eventos.
  - **GestorBueiros:** Acesso a Cadastro de Bueiros e Visualização de Eventos.
- **Gestão de Ativos (CRUD):** Cadastro, visualização no mapa e exclusão de bueiros (que também remove os eventos relacionados via backend).
- **Dashboards de Incidentes:**
  - **Alertas:** Exibe os eventos mais recentes (Violação em Vermelho, Manutenção em Laranja).
  - **Lógica de Prioridade:** O backend calcula a prioridade do alerta (`Alta`, `Média`, `Baixa`) com base no tempo decorrido desde a ocorrência.
- **Visualização Geográfica:** Mapas interativos (Leaflet) para plotar a localização exata dos bueiros e modais para ver detalhes e histórico de eventos por local.
- **Upload de Foto:** Sistema de upload de foto de perfil com `multer` e atualização imediata no Contexto React.

---

## Arquitetura e Tecnologia

O projeto é construído sobre uma arquitetura modular de **Cliente-Servidor (Frontend/Backend)** e utiliza uma pilha moderna para garantir desempenho e segurança.

### Backend (Servidor) - `mov-backend/`

| Tecnologia                       | Função                                                              |
| :------------------------------- | :------------------------------------------------------------------ |
| **Node.js** com **Express.js**   | Criação da API RESTful e lógica de Controllers.                     |
| **MySQL** (via `mysql2/promise`) | Banco de dados relacional para armazenar dados persistentes.        |
| **`bcryptjs`**                   | Criptografia segura de senhas de usuários.                          |
| **`multer`**                     | Middleware para tratamento de upload de arquivos (fotos de perfil). |
| **`Vitest`** e **`Supertest`**   | Ferramentas de desenvolvimento e testes unitários.                  |

### Frontend (Cliente) - `mov-frontend/src`

| Tecnologia                           | Função                                                        |
| :----------------------------------- | :------------------------------------------------------------ |
| **React** (com **Vite**)             | Interface de Usuário rápida e reativa.                        |
| **React Router DOM**                 | Gerenciamento de rotas e rotas protegidas (Protected Routes). |
| **Context API**                      | Gerenciamento de estado global (Autenticação/Usuário Logado). |
| **`react-leaflet`** / **`chart.js`** | Mapas geográficos e visualização de dados (gráficos).         |
| **`Axios`**                          | Cliente HTTP para comunicação com a API do Backend.           |

<div>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo"/>
    <img height="35cm" src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-1-logo-png-transparent.png" alt="Node.js Logo"/>
    <img height="35cm" src="https://img.icons8.com/color/512/express-js.png" alt="Express.js Logo"/>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/MySQL_logo.svg/2560px-MySQL_logo.svg.png" alt="MySQL Logo"/>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg" alt="Vite Logo"/>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Axios_logo_%282020%29.svg/2560px-Axios_logo_%282020%29.svg.png" alt="Axios Logo"/>
</div>
<br>

---

## Como Fazer para Rodar Localmente

O projeto é configurado em um ambiente de monorepo local. Certifique-se de estar na pasta principal (`MOV/`).

### Pré-requisitos

- **Node.js (v18+):** Necessário para rodar os servidores.
- **MySQL Server:** Um servidor MySQL rodando localmente (WAMP/XAMPP/Docker).

### 1. Configurar o Banco de Dados

1.  Crie um schema (banco de dados) chamado `mov_db`.
2.  Execute o script SQL fornecido para criar as tabelas (Usuários, Bueiros, Eventos, Manutenções).

### 2. Configurar o Backend

1.  Navegue até a pasta do backend:
    ```bash
    cd mov-backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Crie um arquivo **`.env`** na raiz da pasta `mov-backend` e preencha com suas credenciais locais do MySQL:
    ```env
    # mov-backend/.env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha_do_mysql_aqui
    DB_NAME=mov_db
    DB_PORT=3306
    ```
4.  Inicie o Servidor Backend:
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3001`. Mantenha este terminal aberto.

### 3. Configurar o Frontend

1.  Abra um novo terminal e navegue até a pasta do frontend:
    ```bash
    cd ../mov-frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

O Frontend abrirá automaticamente (geralmente em `http://localhost:5173`).

---

### Credenciais Padrão (Após Rodar `seed.js`)

Se você executar o script `seed.js` no backend:
| Função | E-mail | Senha |
| :--- | :--- | :--- |
| **Admin** | `admin@mov.com` | `123` |
| **SuperAdmin** | `superadmin@mov.com` | `super123` |

<div>   
  <a href="https://mickeiascharles.github.io/MOV/">
    Hospedagem
  </div>
      
<div>   
  <a href="https://mov-production.up.railway.app/api">
    API
  </div>
