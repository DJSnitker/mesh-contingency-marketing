import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { CONTACT_EMAIL, MESHCORE_URL, REPO_URL, WIKI_URL } from './content';
import { Icon } from './icon';

const SITE_URL = 'https://meshcontingency.com';

// The frame around every page: header, the page, a closing call to action, footer.
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly repo = REPO_URL;
  protected readonly wiki = WIKI_URL;
  protected readonly meshcore = MESHCORE_URL;
  protected readonly email = CONTACT_EMAIL;
  protected readonly year = new Date().getFullYear();

  protected readonly nav = [
    { link: '/console', label: 'Web console' },
    { link: '/app', label: 'Phone app' },
    { link: '/people', label: 'For your people' },
    { link: '/commands', label: 'Commands' },
    { link: '/security', label: 'Security' },
    { link: '/setup', label: 'Set up' },
  ];

  protected readonly menuOpen = signal(false);

  constructor() {
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    const meta = inject(Meta);
    // Each page's description and address, for search results and link previews.
    router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        let page = route.snapshot;
        while (page.firstChild) page = page.firstChild;
        const description: string = page.data['description'] ?? '';
        meta.updateTag({ name: 'description', content: description });
        meta.updateTag({ property: 'og:description', content: description });
        meta.updateTag({ property: 'og:title', content: page.title ?? 'Mesh Contingency' });
        meta.updateTag({ property: 'og:url', content: SITE_URL + e.urlAfterRedirects.replace(/\/$/, '') + '/' });
      });
  }
}
