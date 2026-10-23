import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommandExplorer } from '../command-explorer';
import { COMMANDS, WIKI_URL } from '../content';
import { Icon } from '../icon';

@Component({
  selector: 'app-commands-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommandExplorer, Icon],
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">Commands</p>
        <h1>{{ commandCount }} commands, <span>one direct message away</span></h1>
        <p class="lede">
          Command names are case-insensitive, and long replies arrive as numbered parts, at most 8.
          Commands are plugins, so new ones can be written and installed as separate packages. Each one
          links to its full usage and examples in the wiki.
        </p>
        <div class="cta">
          <a class="btn btn-ghost" [href]="wiki + '/Commands'" target="_blank" rel="noopener">Commands (A–Z) in the wiki <app-icon name="arrow" /></a>
        </div>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <app-command-explorer />
      </div>
    </section>
  `,
})
export class CommandsPage {
  protected readonly commandCount = COMMANDS.length;
  protected readonly wiki = WIKI_URL;
}
