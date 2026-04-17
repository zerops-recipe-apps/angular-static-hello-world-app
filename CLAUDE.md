# angular-static-hello-world-app

Angular 19 SPA — static build served by nginx in prod; dev container runs `ng serve` over SSH.

## Zerops service facts

- HTTP port: dev `4200` (ng serve) / prod `80` (nginx)
- Siblings: —
- Runtime base: dev `nodejs@22` / prod `static`

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm start`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- Build-time values (`APP_ENV`, `BUILD_TIME`, `ANGULAR_VERSION`) are injected into `src/environments/environment.ts` via `sed` before `ng build` — baked into the compiled bundle, not readable at runtime. Set `APP_ENV` as a service runtime env var; Zerops exposes it as `RUNTIME_APP_ENV` in the build shell.
- `deployFiles: dist/angular-hello-world/browser/~` strips the prefix so `index.html` lands at the nginx document root.
- Build cache includes `.angular/cache` for Angular's incremental compilation state — skipping it slows repeat builds noticeably.
