# Angular Hello World Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
A minimal [Angular](https://angular.dev) static SPA deployed on [Zerops](https://zerops.io) — built with the Angular CLI and served by Nginx, with build-time metadata via `scripts/generate-build-env.js`.
Used within [Angular Hello World recipe](https://app.zerops.io/recipes/angular-hello-world) for [Zerops](https://zerops.io) platform.
<!-- #ZEROPS_EXTRACT_END:intro# -->

⬇️ **Full recipe page and deploy with one-click**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/angular-hello-world?environment=small-production)

![angular cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-angular.svg)

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yaml`
The main application configuration file you place at the root of your repository, it tells Zerops how to build, deploy and run your application.

```yaml
# The 'prod' setup builds optimized static assets for Nginx serving.
# The 'dev' setup deploys full source code for live development via SSH.
zerops:
  - setup: prod
    build:
      # Build with Node.js (npm/npx/ng), serve compiled output with Nginx.
      # The build container runs the Angular compiler — Node.js is NOT
      # present at runtime. Only static HTML/CSS/JS reaches Nginx.
      base: nodejs@22

      buildCommands:
        - npm ci
        # Generate src/environments/build-env.ts with the actual Angular
        # version, build timestamp, and environment — esbuild inlines
        # this into the client bundle at build time.
        - node scripts/generate-build-env.js
        - npm run build

      # Strip the 'dist/angular-hello-world/browser/' prefix — its
      # contents become the Nginx document root directly.
      deployFiles:
        - dist/angular-hello-world/browser/~

      # Angular cache: node_modules + .angular/cache (incremental
      # compilation state — significantly speeds up subsequent builds).
      cache:
        - node_modules
        - .angular/cache

    run:
      # Nginx serves the compiled static assets. No Node.js at runtime.
      base: static
      # Built-in SPA fallback: unmatched routes serve index.html.
      # Angular Router handles navigation client-side — no custom
      # run.routing needed for this recipe.

  - setup: dev
    build:
      base: nodejs@22
      os: ubuntu

      buildCommands:
        # npm install (not npm ci) — lock file may not exist yet in
        # a fresh dev workspace.
        - npm install

      # Deploy full source tree so the developer has everything ready
      # to run 'npm start' (ng serve) immediately via SSH.
      deployFiles: ./

      cache:
        - node_modules

    run:
      # nodejs@22 runtime so the developer can run 'npm start'
      # (ng serve) or any other Angular CLI command via SSH.
      base: nodejs@22
      os: ubuntu

      ports:
        - port: 4200
          httpSupport: true

      # Keep the container alive without starting a server.
      # The developer starts ng serve manually via SSH.
      start: zsc noop --silent
```
<!-- #ZEROPS_EXTRACT_END:integration-guide# -->
