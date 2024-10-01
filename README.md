# Projeto Backend

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

Este projeto é uma aplicação backend construída com o framework [NestJS](https://nestjs.com/). Ele é projetado para ser eficiente e escalável, utilizando TypeScript e MongoDB como banco de dados.

## Funcionalidades

- **API RESTful**: Implementa endpoints para manipulação de dados.
- **Validação de Dados**: Utiliza DTOs e validação para garantir a integridade dos dados.
- **Armazenamento de Imagens**: Permite o upload e armazenamento de imagens localmente.
- **Configuração Dinâmica**: Utiliza variáveis de ambiente para configuração.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [Docker](https://www.docker.com/) (opcional, para execução em contêineres)
- [pnpm](https://pnpm.js.org/) (gerenciador de pacotes)

## Configuração do Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu_usuario/seu_projeto.git
   cd seu_projeto/backend
   ```

2. Instale as dependências:

   ```bash
   pnpm install
   ```

3. Crie um arquivo `.env` a partir do exemplo fornecido:

   ```bash
   cp .env.example .env
   ```

   Preencha as variáveis de ambiente conforme necessário.

## Executando o Projeto

### Modo de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento, execute:

```bash
pnpm run start:dev
```

### Modo de Produção

Para compilar e executar o projeto em modo de produção, execute:

```bash
pnpm run build
pnpm run start:prod
```

### Usando Docker Compose

Para rodar o projeto usando Docker Compose, siga os passos abaixo:

1. Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.
2. Na raiz do projeto, onde está localizado o arquivo `docker-compose.yml`, execute:

   ```bash
   docker-compose up --build
   ```

3. O backend estará disponível em `http://localhost:3000` e o MongoDB em `mongodb://localhost:27017`.

## Estrutura do Projeto

- `src/`: Contém o código-fonte da aplicação.
- `config/`: Configurações e validações.
- `confirm/`: Módulo de confirmação.
- `upload/`: Módulo de upload de imagens.
- `list/`: Módulo de listagem.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

- Autor: [Seu Nome](https://twitter.com/seu_usuario)
- Email: seu_email@example.com
