import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Exchange } from './content';

// A radio-app style transcript that plays its exchanges in turn and loops.
// With reduced motion, the whole transcript is shown at once.
@Component({
  selector: 'app-chat-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './chat-demo.scss',
  template: `
    <div class="device">
      <div class="bar">
        <span class="dot"></span>
        <div class="who">
          <strong>{{ title() }}</strong>
          <small>direct message · via mesh</small>
        </div>
        <span class="signal" aria-hidden="true"><i></i><i></i><i></i></span>
      </div>
      <ol class="log" #log aria-live="off">
        @for (m of shown(); track $index) {
          <li [class]="m.from">
            <span class="bubble">{{ m.text }}</span>
          </li>
        }
        @if (typing()) {
          <li class="node typing" aria-hidden="true">
            <span class="bubble"><i></i><i></i><i></i></span>
          </li>
        }
      </ol>
    </div>
  `,
})
export class ChatDemo {
  readonly title = input('Contingency node');
  readonly exchanges = input.required<Exchange[]>();

  private readonly count = signal(0);
  protected readonly typing = signal(false);
  protected readonly shown = computed(() => this.exchanges().slice(0, this.count()));

  private readonly log = viewChild.required<ElementRef<HTMLElement>>('log');
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.count.set(this.exchanges().length);
      } else {
        this.step();
      }
    });
  }

  private step(): void {
    const all = this.exchanges();
    const n = this.count();
    if (n >= all.length) {
      this.timer = setTimeout(() => {
        this.count.set(0);
        this.step();
      }, 4500);
      return;
    }
    const next = all[n];
    if (next.from === 'node') {
      // The reply takes a moment to come back over the air.
      this.typing.set(true);
      this.scroll();
      this.timer = setTimeout(() => {
        this.typing.set(false);
        this.reveal();
      }, 1300);
    } else {
      this.timer = setTimeout(() => this.reveal(), n === 0 ? 600 : 1100);
    }
  }

  private reveal(): void {
    this.count.update((n) => n + 1);
    this.scroll();
    this.step();
  }

  private scroll(): void {
    requestAnimationFrame(() => {
      const el = this.log().nativeElement;
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    });
  }
}
