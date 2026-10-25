import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ChatDemo } from './chat-demo';
import { HERO_SLIDES } from './content';
import { Icon } from './icon';

const CONSOLE_MS = 6000;
const RADIO_MS = 9000;

// The hero's slides, the console, the phone app and the radio in turn. It advances by itself
// unless paused, hovered or focused, or the visitor prefers reduced motion.
@Component({
  selector: 'app-hero-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatDemo, Icon],
  styleUrl: './hero-carousel.scss',
  host: {
    role: 'region',
    'aria-roledescription': 'carousel',
    'aria-label': 'The web console, the phone app and the radio',
    '(mouseenter)': 'hovered.set(true); sync()',
    '(mouseleave)': 'hovered.set(false); sync()',
    '(focusin)': 'focused.set(true); sync()',
    '(focusout)': 'focused.set(false); sync()',
  },
  template: `
    <div class="stage" [attr.aria-live]="playing() ? 'off' : 'polite'">
      @for (s of slides; track $index; let i = $index) {
        <div
          class="slide"
          [class.on]="i === index()"
          [class]="s.kind"
          role="group"
          aria-roledescription="slide"
          [attr.aria-label]="i + 1 + ' of ' + slides.length + ': ' + s.label + ', ' + s.title"
          [attr.aria-hidden]="i !== index()"
          [attr.inert]="i !== index() ? '' : null"
        >
          @if (s.kind === 'console') {
            <figure class="browser">
              <div class="b-bar" aria-hidden="true"><i></i><i></i><i></i><span>127.0.0.1:8737</span></div>
              <img
                [src]="s.shot.src"
                [alt]="s.shot.alt"
                width="1280"
                height="900"
                [attr.loading]="i === 0 ? null : 'lazy'"
                [attr.fetchpriority]="i === 0 ? 'high' : null"
              />
            </figure>
          } @else if (s.kind === 'app') {
            <figure class="phone">
              <img [src]="s.shot.src" [alt]="s.shot.alt" width="780" height="1688" loading="lazy" />
            </figure>
          } @else if (i === index()) {
            <app-chat-demo [exchanges]="s.demo" [title]="s.device" [compact]="true" />
          }
        </div>
      }
    </div>

    <div class="caption">
      <span class="kind" [class]="slide().kind">
        <app-icon [name]="icons[slide().kind]" /> {{ slide().label }}
      </span>
      <strong>{{ slide().title }}</strong>
    </div>

    <div class="controls">
      <button type="button" class="round" aria-label="Previous slide" (click)="go(index() - 1)">
        <app-icon name="arrow" class="flip" />
      </button>
      <div class="dots" role="group" aria-label="Choose a slide">
        @for (s of slides; track $index; let i = $index) {
          <button
            type="button"
            [class.on]="i === index()"
            [class]="s.kind"
            [attr.aria-label]="'Slide ' + (i + 1) + ': ' + s.label + ', ' + s.title"
            [attr.aria-current]="i === index() ? 'true' : null"
            (click)="go(i)"
          >
            @if (i === index()) {
              <span class="fill" [style.animation-duration.ms]="duration()" [class.paused]="!playing()"></span>
            }
          </button>
        }
      </div>
      <button type="button" class="round" aria-label="Next slide" (click)="go(index() + 1)">
        <app-icon name="arrow" />
      </button>
      <button type="button" class="round" [attr.aria-label]="stopped() ? 'Play slides' : 'Pause slides'" (click)="stopped.set(!stopped()); sync()">
        <app-icon [name]="stopped() ? 'play' : 'pause'" />
      </button>
    </div>
  `,
})
export class HeroCarousel {
  protected readonly slides = HERO_SLIDES;
  protected readonly icons = { console: 'monitor', app: 'phone', radio: 'radio' };
  protected readonly index = signal(0);
  protected readonly slide = computed(() => this.slides[this.index()]);
  protected readonly duration = computed(() => (this.slide().kind === 'radio' ? RADIO_MS : CONSOLE_MS));

  protected readonly hovered = signal(false);
  protected readonly focused = signal(false);
  protected readonly stopped = signal(false);
  private readonly started = signal(false);
  protected readonly playing = computed(
    () => this.started() && !this.stopped() && !this.hovered() && !this.focused(),
  );

  private timer?: ReturnType<typeof setTimeout>;
  private left = 0;
  private since = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    afterNextRender(() => {
      // Reduced motion: the visitor moves through the slides themselves.
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) this.stopped.set(true);
      this.started.set(true);
      this.left = this.duration();
      this.sync();
    });
  }

  protected go(i: number): void {
    this.index.set((i + this.slides.length) % this.slides.length);
    this.left = this.duration();
    clearTimeout(this.timer);
    this.timer = undefined;
    this.sync();
  }

  // Starts or stops the timer to match playing(), keeping the time left on
  // this slide across a pause, as the progress bar does.
  protected sync(): void {
    if (this.playing()) {
      if (this.timer) return;
      this.since = Date.now();
      this.timer = setTimeout(() => {
        this.timer = undefined;
        this.go(this.index() + 1);
      }, this.left);
    } else if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
      this.left = Math.max(0, this.left - (Date.now() - this.since));
    }
  }
}
