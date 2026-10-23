import { ChangeDetectionStrategy, Component, ElementRef, inject, input, model } from '@angular/core';
import { Icon } from './icon';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
}

// A tab list with arrow-key navigation. The parent renders the panel, with
// id `<prefix>-panel` and aria-labelledby `<prefix>-tab-<selected id>`.
@Component({
  selector: 'app-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  host: {
    role: 'tablist',
    '[attr.aria-label]': 'label()',
    '[attr.aria-orientation]': 'vertical() ? "vertical" : "horizontal"',
    '[class.vertical]': 'vertical()',
    '(keydown)': 'key($event)',
  },
  styles: `
    :host {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      scrollbar-width: none;
    }

    :host(.vertical) {
      flex-direction: column;
    }

    button {
      display: inline-flex;
      flex: none;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: rgb(255 255 255 / 3%);
      color: var(--muted);
      font: inherit;
      font-size: 0.95rem;
      font-weight: 600;
      text-align: left;
      white-space: nowrap;
      cursor: pointer;
      transition: color 0.15s, border-color 0.15s, background 0.15s;

      &:hover {
        color: var(--text);
        border-color: rgb(242 245 248 / 25%);
      }

      &[aria-selected='true'] {
        border-color: rgb(255 95 31 / 55%);
        background: rgb(255 95 31 / 12%);
        color: var(--text);

        app-icon {
          color: var(--orange);
        }
      }

      app-icon {
        font-size: 0.8rem;
      }
    }

    :host(.vertical) button {
      white-space: normal;
    }

    @media (max-width: 960px) {
      :host(.vertical) {
        flex-direction: row;
      }

      :host(.vertical) button {
        white-space: nowrap;
      }
    }
  `,
  template: `
    @for (t of tabs(); track t.id) {
      <button
        type="button"
        role="tab"
        [id]="prefix() + '-tab-' + t.id"
        [attr.aria-selected]="selected() === t.id"
        [attr.aria-controls]="prefix() + '-panel'"
        [tabIndex]="selected() === t.id ? 0 : -1"
        (click)="selected.set(t.id)"
      >
        @if (t.icon) {
          <app-icon [name]="t.icon" />
        }
        {{ t.label }}
      </button>
    }
  `,
})
export class Tabs {
  readonly tabs = input.required<Tab[]>();
  readonly prefix = input.required<string>();
  readonly label = input.required<string>();
  readonly vertical = input(false);
  readonly selected = model.required<string>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected key(event: KeyboardEvent): void {
    const tabs = this.tabs();
    const at = tabs.findIndex((t) => t.id === this.selected());
    const moves: Record<string, number> = {
      ArrowRight: at + 1,
      ArrowDown: at + 1,
      ArrowLeft: at - 1,
      ArrowUp: at - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = tabs[(moves[event.key] + tabs.length) % tabs.length];
    this.selected.set(next.id);
    this.host.nativeElement.querySelector<HTMLElement>(`#${this.prefix()}-tab-${next.id}`)?.focus();
  }
}
