#!/bin/bash

if [ -z "$1" ]; then
  echo "$0 <swagger.json URL>"
  exit 1
fi

curl -v "$1" -o swagger.json
npx swagger-typescript-client-generator -f swagger.json models > models.tsx
npx swagger-typescript-client-generator -f swagger.json client BudgetApi > client.tsx
