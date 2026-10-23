import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WIKI_URL } from '../content';
import { FeaturePicker } from '../feature-picker';
import { Icon } from '../icon';

@Component({
  selector: 'app-people-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePicker, Icon, RouterLink],
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">What your people get</p>
        <h1>Everything they need, <span>over the air</span></h1>
        <p class="lede">
          Anyone with a MeshCore radio sends the node a direct message and it replies over the mesh: no
          phone signal, no internet on their end, no new app.
        </p>
        <div class="cta">
          <a class="btn" [href]="wiki + '/User-Guide'" target="_blank" rel="noopener">Read the User Guide <app-icon name="arrow" /></a>
          <a class="btn btn-ghost" routerLink="/commands">Every command</a>
        </div>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Try it</p>
          <h2>Pick one and watch it work</h2>
        </header>
        <app-feature-picker />
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Getting started</p>
          <h2>Three steps for anyone on the mesh</h2>
        </header>
        <ol class="steps">
          <li>
            <span class="n">1</span>
            <h3>Get connected</h3>
            <p>Send an advert from the MeshCore app and wait for the node to show up in contacts. Then send <code>help</code>.</p>
          </li>
          <li>
            <span class="n">2</span>
            <h3>Join</h3>
            <p>Anyone can use <code>wx</code>, <code>verse</code>, <code>ok</code> and <code>status</code>. Send <code>join</code> and an admin approves you for the rest, under your radio’s name.</p>
          </li>
          <li>
            <span class="n">3</span>
            <h3>Stay in touch</h3>
            <p>Check in, leave messages that wait for people, and email family off the mesh. Add <code>#contingency-wx</code> and <code>#contingency-comm</code> in the app for the weather alerts and news the node posts for everyone.</p>
          </li>
        </ol>
      </div>
    </section>
  `,
})
export class PeoplePage {
  protected readonly wiki = WIKI_URL;
}
