// Generates src/environments/build-env.ts with build-time constants.
// Runs in buildCommands before ng build — esbuild inlines the result
// into the client bundle at build time.

const { readFileSync, writeFileSync } = require('fs');

const angPkg = JSON.parse(
  readFileSync('./node_modules/@angular/core/package.json', 'utf-8')
);

const environment =
  process.env.RUNTIME_APP_ENV || process.env.NODE_ENV || 'development';

const content = `// Auto-generated at build time by scripts/generate-build-env.js.
// Do not edit — this file is overwritten on every build.
export const BUILD_ENV = {
  version: '${angPkg.version}',
  buildTime: '${new Date().toISOString()}',
  environment: '${environment}',
};
`;

writeFileSync('src/environments/build-env.ts', content);
console.log('Build env generated: Angular', angPkg.version);
