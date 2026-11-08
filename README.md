# TypeScript Inventory Validator

A small TypeScript project that validates inventory records using typed business rules.

## What it demonstrates

- TypeScript interfaces
- Enums and union-safe values
- Type-safe functions
- Array methods
- Business-rule validation
- Error reporting
- Summary generation
- Strict compiler configuration

## Features

- Validates required product codes and names
- Detects negative stock and prices
- Checks active/inactive product status
- Reports issues by product
- Calculates totals for valid inventory records

## Run

Install TypeScript and build the project:

```bash
npm install
npm run build
npm start
```

## Project structure

- `src/index.ts` — typed inventory validation logic
- `tsconfig.json` — strict TypeScript compiler configuration
- `package.json` — build and run scripts
- `.gitignore` — excludes generated files, dependencies and secrets

## Project purpose

This repository demonstrates practical TypeScript problem solving through inventory and business-rule validation. The example data is fictional and contains no private business information.
