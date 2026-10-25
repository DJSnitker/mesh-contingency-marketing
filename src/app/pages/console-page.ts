import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMMANDS, EQUIVALENTS, TOUR } from '../content';
import { Icon } from '../icon';
import { ScreenTour } from '../screen-tour';

@Component({
  selector: 'app-console-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink, ScreenTour],
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">The web console</p>
        <h1>Everything an admin does, <span>on one screen</span></h1>
        <p class="lede">
          No radio in hand, no 133-character replies. Turn the console on and open it in a browser on the
          node’s computer: the node’s health, its people and its radio, side by side. It works with no
          internet, and it’s off until you turn it on. Your people get their own screens: the
          <a routerLink="/app">phone app</a>.
        </p>
        <div class="cta">
          <a class="btn" routerLink="/setup" fragment="console">Turn it on <app-icon name="arrow" /></a>
          <a class="btn btn-ghost" routerLink="/security" fragment="console">How it’s kept private</a>
        </div>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Tour the pages</p>
          <h2>Grouped by what you’re doing</h2>
        </header>
        <app-screen-tour [stops]="tour" prefix="tour" label="Console pages" />
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Same commands, over the air</p>
          <h2>Every button is a radio command</h2>
          <p>
            The console runs the same commands an admin sends from a radio, as an admin called
            <code>console</code>: the same checks, rate limits and confirmations, and
            <code>history</code> records them <em>by console</em>. Away from the computer, the radio in
            your hand still does almost all of it.
          </p>
        </header>
        <ol class="equivalents">
          @for (e of equivalents; track e.command) {
            <li>
              <div class="button-side">
                <small>{{ e.page }}</small>
                <span class="fake-btn">{{ e.button }}</span>
              </div>
              <app-icon name="radio" class="eq-icon" />
              <div class="radio-side">
                <code class="cmd">&gt; {{ e.command }}</code>
                <code class="reply">{{ e.reply }}</code>
              </div>
            </li>
          }
        </ol>
        <p class="fine">
          The one exception is the radio’s own settings. Over the mesh, <code>radio</code> only shows
          them: a wrong frequency sent from your radio would cut you off from the node. The console
          reaches the radio over USB, so it can always set things back.
        </p>
        <div class="cta">
          <a class="btn btn-ghost" routerLink="/commands"><app-icon name="list" /> All {{ commandCount }} commands</a>
          <a class="btn btn-ghost" routerLink="/app"><app-icon name="phone" /> The phone app</a>
        </div>
      </div>
    </section>
  `,
})
export class ConsolePage {
  protected readonly tour = TOUR;
  protected readonly equivalents = EQUIVALENTS;
  protected readonly commandCount = COMMANDS.length;
}
