# angular-static-hello-world-app

Angular 22 static SPA built with the Angular CLI and served by Nginx on Zerops, using a build-time environment generator.

## Zerops service facts

- HTTP port: dev `4200` (`npm start` / `ng serve`) / prod `80` (Nginx static runtime)
- Runtime base: dev `nodejs@22` / prod `static` (Nginx)

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm start`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- Production deploys only `dist/angular-hello-world/browser/` — no Node.js at runtime.
- `scripts/generate-build-env.js` writes `src/environments/build-env.ts` at build time; esbuild inlines it into the client bundle.
- Static assets (logos, favicon, status-page.css) live in `public/` and are copied to the build output by the Angular CLI.
