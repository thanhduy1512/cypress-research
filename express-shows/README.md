Intruct

after change entity structure run:

- npx typeorm-ts-node-commonjs migration:generate -d .\src\ormconfig.ts .\src\migrations\NewMigrate
- npx typeorm-ts-node-commonjs migration:create -d .\src\ormconfig.ts .\src\migrations\NewMigrate

to migrate the change run:

- npx typeorm-ts-node-commonjs migration:run -d .\src\ormconfig.ts

to revert the change run:

- npx typeorm-ts-node-commonjs migration:revert -d .\src\ormconfig.ts

docker:

- docker-compose up -d
