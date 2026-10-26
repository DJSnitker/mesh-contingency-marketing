import { ChangeDetectionStrategy, Component, input } from '@angular/core';

// Stroke icons, 24x24, drawn in currentColor.
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  styles: `
    :host { display: inline-flex; width: 1.5em; height: 1.5em; }
    svg { width: 100%; height: 100%; }
  `,
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
         stroke-linecap="round" stroke-linejoin="round">
      @switch (name()) {
        @case ('weather') {
          <path d="M8 18h9a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 11.2 3.5 3.5 0 0 0 8 18Z" />
          <path d="M9 21l1-2M13 21l1-2" />
        }
        @case ('check') {
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12.5 2.6 2.5L16 9.5" />
        }
        @case ('inbox') {
          <path d="M4 13V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" />
          <path d="M4 13h4l1.5 3h5L16 13h4v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        }
        @case ('lock') {
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          <circle cx="12" cy="16" r="1.2" />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
        }
        @case ('book') {
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
          <path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" />
          <path d="M12 7v6M9.5 9.5h5" />
        }
        @case ('radio') {
          <rect x="6" y="8" width="12" height="14" rx="2" />
          <path d="M9 8V2" />
          <path d="M9 13h6M9 17h6" />
        }
        @case ('shield') {
          <path d="M12 2.5 20 5.5v6.5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V5.5Z" />
        }
        @case ('list') {
          <path d="M9 6h11M9 12h11M9 18h11" />
          <circle cx="4.5" cy="6" r="1" />
          <circle cx="4.5" cy="12" r="1" />
          <circle cx="4.5" cy="18" r="1" />
        }
        @case ('terminal') {
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m7 9 3 3-3 3M13 15h4" />
        }
        @case ('github') {
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
        }
        @case ('arrow') {
          <path d="M5 12h14M13 6l6 6-6 6" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        }
        @case ('menu') {
          <path d="M4 7h16M4 12h16M4 17h16" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6 6 18" />
        }
        @case ('gauge') {
          <path d="M4.5 18a9 9 0 1 1 15 0" />
          <path d="m12 14 4-5" />
          <circle cx="12" cy="14" r="1.2" />
        }
        @case ('users') {
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 14a6.5 6.5 0 0 1 3 6" />
        }
        @case ('send') {
          <path d="M21 3 10 14" />
          <path d="M21 3l-7 18-4-7-7-4Z" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        }
        @case ('play') {
          <path d="M7 4.5v15l12-7.5Z" />
        }
        @case ('pause') {
          <path d="M8 5v14M16 5v14" />
        }
        @case ('compass') {
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5Z" />
        }
        @case ('phone') {
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
          <path d="M10.5 18.5h3" />
        }
        @case ('laptop') {
          <rect x="4" y="5" width="16" height="11" rx="1.5" />
          <path d="M2 19h20" />
        }
        @case ('chat') {
          <path d="M20 12a8 8 0 0 1-11.5 7.2L4 20l1-4.2A8 8 0 1 1 20 12z" />
          <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
        }
        @case ('sliders') {
          <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
          <circle cx="16" cy="6" r="2" />
          <circle cx="10" cy="12" r="2" />
          <circle cx="18" cy="18" r="2" />
        }
        @case ('monitor') {
          <rect x="2.5" y="4" width="19" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<string>();
}
