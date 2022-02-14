# express-template-ts

Build your production reaady Express.js server in few hours.

## Features

This template contains

- Written in [Typescript](https://github.com/microsoft/TypeScript).

- Collaborative project structure with simple path-alias (eg. `@config/*`, `@middlewares/*`).

- Unit-test using [jest](https://github.com/facebook/jest).

- Documentation generator using [apidoc](https://github.com/apidoc/apidoc).

- Sort rules with eslint & prettier.

- Built-in logger configuration using [moran](https://github.com/expressjs/morgan) and [winston](https://github.com/winstonjs/winston).

- Customized `ApiError` class and error handling middlewares. [see details](/src/utils/api-error.ts).

## Usage

1. Create your new repository by clicking `Use this template` button in top of the page or by cloning this repository.

2. Install the packages using `yarn`.

   ```sh
   yarn install
   ```

3. Start your dev server.

   ```sh
   yarn dev
   ```

4. When preparing production, you should build all files in `src/*`.

   ```sh
   yarn build
   ```

5. Start the production server.

   ```sh
   yarn start
   ```
