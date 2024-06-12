# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el archivo `.env.template` a `.env` y completar los valores
3. Ejecutar el SEED para [cargar datos de prueba](localhost:3000/api/seed)

# Prisma commands

```

npx prisma init
npx prisma migrate dev
npx prisma generate

```

```

```
