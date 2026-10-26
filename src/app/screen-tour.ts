import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal } from '@angular/core';
import { Frame, TourStop } from './content';
import { Tabs } from './tabs';

// A tab per job, with each page's screenshot in its frame: a browser window,
// a phone, or the desktop app's window. Each shot can name its own frame.
@Component({
  selector: 'app-screen-tour',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs],
  styleUrl: './screen-tour.scss',
  host: { '[class.on-phone]': "frame() === 'phone'" },
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
      @switch (frame()) {
        @case ('phone') {
          <figure class="phone">
            <img [src]="shot().src" [alt]="shot().alt" width="390" height="844" loading="lazy" />
            <figcaption>{{ shot().page }} · {{ note() }}</figcaption>
          </figure>
        }
        @default {
          <figure class="browser" [class.window]="frame() === 'window'">
            <div class="b-bar" aria-hidden="true">
              <i></i><i></i><i></i>
              <span>{{ frame() === 'window' ? 'Mesh Contingency' : '127.0.0.1:8737' }}</span>
            </div>
            <img [src]="shot().src" [alt]="shot().alt" [attr.width]="frame() === 'window' ? 880 : 1280" [attr.height]="frame() === 'window' ? 620 : 900" loading="lazy" />
            <figcaption>{{ shot().page }} · {{ note() }}</figcaption>
          </figure>
        }
      }
    </div>
  `,
})
export class ScreenTour {
  readonly stops = input.required<TourStop[]>();
  // The frame for shots that don't name their own.
  readonly device = input<Frame>('browser');
  readonly note = input('made-up demo data');
  readonly prefix = input.required<string>();
  readonly label = input.required<string>();

  protected readonly tabs = computed(() => this.stops().map(({ id, label, icon }) => ({ id, label, icon })));
  protected readonly stopId = linkedSignal(() => this.stops()[0].id);
  protected readonly shotIndex = signal(0);
  protected readonly stop = computed(() => this.stops().find((t) => t.id === this.stopId())!);
  protected readonly shot = computed(() => this.stop().shots[this.shotIndex()]);
  protected readonly frame = computed(() => this.shot().frame ?? this.device());

  protected pick(id: string): void {
    this.stopId.set(id);
    this.shotIndex.set(0);
  }
}
