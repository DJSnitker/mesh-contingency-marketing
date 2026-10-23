import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { TOUR } from './content';
import { Tabs } from './tabs';

// The web console's pages, a tab per job, with each page's screenshot.
@Component({
  selector: 'app-console-tour',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs],
  styleUrl: './console-tour.scss',
  template: `
    <app-tabs prefix="tour" label="Console pages" [tabs]="tabs" [selected]="stopId()" (selectedChange)="pick($event)" />
    <div class="panel" id="tour-panel" role="tabpanel" [attr.aria-labelledby]="'tour-tab-' + stop().id">
      <div class="copy">
        <h3>{{ stop().title }}</h3>
        <p>{{ stop().body }}</p>
        @if (stop().shots.length > 1) {
          <div class="pages" role="group" aria-label="Pages">
            @for (s of stop().shots; track s.page; let i = $index) {
              <button type="button" [attr.aria-pressed]="shotIndex() === i" (click)="shotIndex.set(i)">
                {{ s.page }}
              </button>
            }
          </div>
        }
      </div>
      <figure class="browser">
        <div class="b-bar" aria-hidden="true">
          <i></i><i></i><i></i>
          <span>127.0.0.1:8737</span>
        </div>
        <img [src]="shot().src" [alt]="shot().alt" width="1280" height="900" loading="lazy" />
        <figcaption>{{ shot().page }} · made-up demo data</figcaption>
      </figure>
    </div>
  `,
})
export class ConsoleTour {
  protected readonly tabs = TOUR.map(({ id, label, icon }) => ({ id, label, icon }));
  protected readonly stopId = signal(TOUR[0].id);
  protected readonly shotIndex = signal(0);
  protected readonly stop = computed(() => TOUR.find((t) => t.id === this.stopId())!);
  protected readonly shot = computed(() => this.stop().shots[this.shotIndex()]);

  protected pick(id: string): void {
    this.stopId.set(id);
    this.shotIndex.set(0);
  }
}
