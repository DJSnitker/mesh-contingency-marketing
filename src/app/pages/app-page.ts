import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_EQUIVALENTS, APP_TOUR, APP_URL } from '../content';
import { Icon } from '../icon';
import { ScreenTour } from '../screen-tour';

@Component({
  selector: 'app-app-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink, ScreenTour],
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">The phone app</p>
        <h1>Everything your people do, <span>a tap away</span></h1>
        <p class="lede">
          The web console is for whoever runs the node; the phone app is for everyone else on the mesh.
          Join, check in, read the mailbox, email out, chat and get the weather from screens instead of
          typed commands, over Bluetooth to your own MeshCore radio. No cell signal, no internet: the
          radio carries every request to the node.
        </p>
        <div class="cta">
          <a class="btn" routerLink="/app" fragment="get">Get the app <app-icon name="arrow" /></a>
          <a class="btn btn-ghost" routerLink="/security" fragment="app">How it’s kept private</a>
        </div>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Tour the tabs</p>
          <h2>Grouped by what you’re doing</h2>
        </header>
        <app-screen-tour [stops]="tour" device="phone" prefix="app-tour" label="App tabs" />
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Same commands, over the air</p>
          <h2>Every button is a command to the node</h2>
          <p>
            The app sends the node the commands a user would type, one at a time, retried until delivered,
            and reads the replies the bot already sends: no new protocol, no extra airtime. So the node’s
            checks all apply, from the sender’s full key to rate limits and sealed messages. A reply the app
            can’t read is shown as it came, never lost.
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
          It sends only user commands: admin work stays on the
          <a routerLink="/console">web console</a> and the radio. Its Radio tab changes your own radio, never
          the node’s.
        </p>
      </div>
    </section>

    <section id="get" class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Get the app</p>
          <h2>Android first, iOS next</h2>
          <p>
            The app is in field testing on Android 7 and newer. A signed release is on its way; until then,
            every change builds a test APK you can install on any Android phone. iOS follows from the same
            code.
          </p>
        </header>
        <ol class="steps">
          <li>
            <span class="n">1</span>
            <h3>Install it</h3>
            <p>Download the APK from the latest build and open it on the phone; Android asks once to allow installing it.</p>
          </li>
          <li>
            <span class="n">2</span>
            <h3>Connect your radio</h3>
            <p>On the Node tab, find your MeshCore radio and pair it. One app holds a radio at a time, so close the MeshCore app first.</p>
          </li>
          <li>
            <span class="n">3</span>
            <h3>Pick the node and join</h3>
            <p>Choose the node from your radio’s contacts and press <strong>Join</strong>. Once an admin approves you, every tab is yours.</p>
          </li>
        </ol>
        <div class="cta">
          <a class="btn" [href]="appUrl" target="_blank" rel="noopener"><app-icon name="github" /> The app on GitHub</a>
          <a class="btn btn-ghost" routerLink="/people">What your people get</a>
        </div>
      </div>
    </section>
  `,
})
export class AppPage {
  protected readonly tour = APP_TOUR;
  protected readonly equivalents = APP_EQUIVALENTS;
  protected readonly appUrl = APP_URL;
}
