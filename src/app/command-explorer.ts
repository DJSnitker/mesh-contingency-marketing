import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { APP_COMMANDS, COMMANDS, Level, WIKI_URL } from './content';
import { Icon } from './icon';

// Searchable list of every command, filtered by who can run it.
@Component({
  selector: 'app-command-explorer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  styleUrl: './command-explorer.scss',
  template: `
    <div class="controls">
      <label class="search">
        <app-icon name="search" />
        <span class="sr-only">Search commands</span>
        <input
          type="search"
          placeholder="Search commands…"
          [value]="query()"
          (input)="query.set($any($event.target).value)"
        />
      </label>
      <div class="levels" role="radiogroup" aria-label="Who can run it">
        @for (l of levels; track l.value) {
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="level() === l.value"
            [class.on]="level() === l.value"
            (click)="level.set(l.value)"
          >
            {{ l.label }}
            <span class="count">{{ counts()[l.value] }}</span>
          </button>
        }
      </div>
    </div>

    <ul class="grid">
      @for (c of filtered(); track c.name) {
        <li>
          <a [href]="wiki + '/Commands#' + c.name" target="_blank" rel="noopener">
            <div class="top">
              <code>{{ c.usage }}</code>
              @if (inApp.has(c.name)) {
                <span class="in-app" title="In the phone app"><app-icon name="phone" /><span class="sr-only">In the phone app</span></span>
              }
              <span class="tag" [class]="c.level">{{ c.level }}</span>
            </div>
            <p>{{ c.description }}</p>
          </a>
        </li>
      } @empty {
        <li class="empty">No command matches “{{ query() }}”.</li>
      }
    </ul>

    <p class="note">
      Shown as in the example config. Who may run each command is set entirely by the node’s owner.
      <app-icon name="phone" class="note-icon" /> marks the commands the phone app sends from its screens.
    </p>
  `,
})
export class CommandExplorer {
  protected readonly wiki = WIKI_URL;
  protected readonly inApp = APP_COMMANDS;
  protected readonly levels: { value: Level | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'anyone', label: 'Anyone' },
    { value: 'users', label: 'Users' },
    { value: 'admins', label: 'Admins' },
  ];

  protected readonly query = signal('');
  protected readonly level = signal<Level | 'all'>('all');

  protected readonly counts = computed(() => {
    const counts: Record<string, number> = { all: COMMANDS.length };
    for (const c of COMMANDS) counts[c.level] = (counts[c.level] ?? 0) + 1;
    return counts;
  });

  protected readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const level = this.level();
    return COMMANDS.filter(
      (c) =>
        (level === 'all' || c.level === level) &&
        (!q || c.usage.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)),
    );
  });
}
