# Jetstore

Jetstore é uma aplicação simples de e-commerce construída com **Laravel** no back-end e **React + Inertia.js** no front-end.

## Stack

- **Back-end:** PHP 8.3, Laravel 13, Laravel Fortify (autenticação), Pest (testes)
- **Front-end:** React 19, TypeScript, Inertia.js, Vite
- **UI:** Tailwind CSS v4, Radix UI, componentes estilo shadcn/ui, Lucide Icons
- **Ferramentas:** ESLint, Prettier, Laravel Pint, PHPStan
- **Infra:** Docker (`compose.yaml`)

## Requisitos

- PHP 8.3+
- Composer
- Node.js 18+ e npm (ou pnpm)
- Docker e Docker Compose (opcional, para rodar em containers)

## Instalação

Clone o repositório:

```bash
git clone https://github.com/jv-ramos/jetstore.git
cd jetstore
```

Instale as dependências e configure o projeto:

```bash
composer install
cp .env.example .env
php artisan key:generate
npm install
```

> Alternativamente, basta rodar `composer run setup`, que executa `composer install`, copia o `.env`, gera a chave da aplicação, roda as migrations e instala/builda as dependências front-end automaticamente.

## Rodando em desenvolvimento

Para subir o servidor PHP, a fila, os logs e o Vite ao mesmo tempo:

```bash
composer run dev
```

A aplicação ficará disponível em `http://localhost`.

### Rodando o projeto

```bash
./vendor/bin/sail up -d
```
