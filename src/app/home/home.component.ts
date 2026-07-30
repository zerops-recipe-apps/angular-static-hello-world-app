import { Component } from '@angular/core';
import { BUILD_ENV } from '../../environments/build-env';
import { environmentBadgeClass, formatBuildTime } from '../../shared/status-page';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <main class="page">
      <div class="glow glow-angular" aria-hidden="true"></div>
      <div class="glow glow-zerops" aria-hidden="true"></div>

      <article class="card">
        <header class="brand">
          <div class="logo-strip">
            <img src="angular-logo.webp" alt="Angular" class="logo logo-angular" />
            <span class="sep" aria-hidden="true"></span>
            <img src="zerops-logo.webp" alt="Zerops" class="logo logo-zerops" />
          </div>

          <h1>Hello from Zerops!</h1>
          <p class="subtitle">
            Angular static SPA deployed on Zerops with Nginx.
          </p>
        </header>

        <dl class="stats">
          <div class="stat">
            <dt>Framework</dt>
            <dd>Angular {{ version }}</dd>
          </div>
          <div class="stat">
            <dt>Environment</dt>
            <dd>
              <span class="badge" [class]="environmentClass">{{ environment }}</span>
            </dd>
          </div>
          <div class="stat">
            <dt>Build time</dt>
            <dd>{{ formattedBuildTime }}</dd>
          </div>
        </dl>
      </article>
    </main>
  `,
})
export class HomeComponent {
  readonly version = BUILD_ENV.version;
  readonly environment = BUILD_ENV.environment;
  readonly formattedBuildTime = formatBuildTime(BUILD_ENV.buildTime);
  readonly environmentClass = environmentBadgeClass(BUILD_ENV.environment);
}
