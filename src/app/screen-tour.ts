import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { TourStop } from './content';
import { Tabs } from './tabs';

// A tab per job, with each page's screenshot: the web console's in a browser
// window, the phone app's in a phone.
@Component({
  selector: 'app-screen-tour',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs],
  styleUrl: './screen-tour.scss',
  host: { '[class.on-phone]': "device() === 'phone'" },
  template: `
    <app-tabs [prefix]="prefix()" [label]="label()" [tabs]="tabs()" [selected]="stopId()" (selectedChange)="pick($event)" />
    <div class="panel" [id]="prefix() + '-panel'" role="tabpanel" [attr.aria-labelledby]="prefix() + '-tab-' + stop().id">
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
      @if (device() === 'phone') {
        <figure class="phone">
          <img [src]="shot().src" [alt]="shot().alt" width="780" height="1688" loading="lazy" />
          <figcaption>{{ shot().page }} · demo radio, made-up data</figcaption>
        </figure>
      } @else {
        <figure class="browser">
          <div class="b-bar" aria-hidden="true">
            <i></i><i></i><i></i>
            <span>127.0.0.1:8737</span>
          </div>
          <img [src]="shot().src" [alt]="shot().alt" width="1280" height="900" loading="lazy" />
          <figcaption>{{ shot().page }} · made-up demo data</figcaption>
        </figure>
      }
    </div>
  `,
})
export class ScreenTour {
  readonly stops = input.required<TourStop[]>();
  readonly device = input<'browser' | 'phone'>('browser');
  readonly prefix = input.required<string>();
  readonly label = input.required<string>();

  protected readonly tabs = computed(() => this.stops().map(({ id, label, icon }) => ({ id, label, icon })));
  protected readonly stopId = linkedSignal(() => this.stops()[0].id);
  protected readonly shotIndex = signal(0);
  protected readonly stop = computed(() => this.stops().find((t) => t.id === this.stopId())!);
  protected readonly shot = computed(() => this.stop().shots[this.shotIndex()]);

  protected pick(id: string): void {
    this.stopId.set(id);
    this.shotIndex.set(0);
  }
}
