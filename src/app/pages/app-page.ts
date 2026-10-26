import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_EQUIVALENTS, APP_TOUR, REPO_URL, RELEASES_URL } from '../content';
import { Icon } from '../icon';
import { ScreenTour } from '../screen-tour';

// Where to get the app: each system's file on the release, and what to know
// installing it (the builds aren't signed yet).
const DOWNLOADS = [
  {
    icon: 'phone',
    system: 'Android',
    files: 'APK, Android 7 or newer',
    note: 'Open it on the phone; Android asks once to allow installing apps from that source.',
  },
  {
    icon: 'laptop',
    system: 'Windows',
    files: 'Installer (.exe)',
    note: 'Windows warns about an unknown publisher: More info, then Run anyway.',
  },
  {
    icon: 'laptop',
    system: 'Mac',
    files: 'Disk image (.dmg), Apple silicon or Intel',
    note: 'Drag it to Applications. The first time, allow it in System Settings, Privacy & Security (Open Anyway).',
  },
  {
    icon: 'terminal',
    system: 'Linux',
    files: 'AppImage, .deb or .pacman',
    note: 'For a radio on USB, your user needs to be in the dialout group (uucp on Arch).',
  },
];

@Component({
  selector: 'app-app-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink, ScreenTour],
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">The app</p>
        <h1>Everything your people do, <span>a tap away</span></h1>
        <p class="lede">
          The web console is for whoever runs the node; the app is for everyone else on the mesh, on an
          Android phone or a Windows, Mac or Linux computer. Join, check in, read the mailbox, email out,
          chat and get the weather from screens instead of typed commands, through your own MeshCore radio
          over Bluetooth or a USB cable. No cell signal, no internet: the radio carries every request to the
          node.
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
        <app-screen-tour [stops]="tour" device="phone" note="demo radio, made-up data" prefix="app-tour" label="App tabs" />
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">On a computer</p>
          <h2>The same app, beside your radio</h2>
          <p>
            For a radio on the desk, the app runs in a window on Windows, Mac and Linux: the same tabs, a
            wider layout, and your radio over Bluetooth or plugged in with a USB cable. It remembers which
            way the radio was connected and finds it again when it opens, and it never connects to a radio
            you didn’t pick.
          </p>
          <ul class="checks">
            <li>Bluetooth, with a box for the radio’s PIN the first time</li>
            <li>USB: pick the radio’s port once; it reconnects to it after that</li>
            <li>Chats and starred counties kept on that computer</li>
          </ul>
        </div>
        <figure class="browser window">
          <div class="b-bar" aria-hidden="true"><i></i><i></i><i></i><span>Mesh Contingency</span></div>
          <img src="app/desktop-chat.png" alt="The desktop app's Chat tab: chats with people, newest first, kept on this computer" width="880" height="620" loading="lazy" />
          <figcaption>Chat · demo radio, made-up data</figcaption>
        </figure>
      </div>
    </section>

    <section class="section alt">
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

    <section id="get" class="section">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Get the app</p>
          <h2>Android, Windows, Mac and Linux</h2>
          <p>
            Every release of Mesh Contingency attaches the app for each system. They aren’t signed with a
            publisher’s certificate yet, so each system asks once before it opens. iOS is to come.
          </p>
        </header>
        <ul class="downloads">
          @for (d of downloads; track d.system) {
            <li>
              <span class="f-icon"><app-icon [name]="d.icon" /></span>
              <h3>{{ d.system }}</h3>
              <small>{{ d.files }}</small>
              <p>{{ d.note }}</p>
            </li>
          }
        </ul>
        <div class="cta">
          <a class="btn" [href]="releases" target="_blank" rel="noopener">Download the latest release <app-icon name="arrow" /></a>
          <a class="btn btn-ghost" [href]="appUrl" target="_blank" rel="noopener"><app-icon name="github" /> Installing, in detail</a>
        </div>

        <ol class="steps after-downloads">
          <li>
            <span class="n">1</span>
            <h3>Install it</h3>
            <p>Download your system’s file from the release and open it, past the one-time warning above.</p>
          </li>
          <li>
            <span class="n">2</span>
            <h3>Connect your radio</h3>
            <p>On the Node tab, find your MeshCore radio over Bluetooth, or on a computer pick its USB port. One app holds a radio at a time, so close the MeshCore app first.</p>
          </li>
          <li>
            <span class="n">3</span>
            <h3>Pick the node and join</h3>
            <p>Choose the node from your radio’s contacts and press <strong>Join</strong>. Once an admin approves you, every tab is yours.</p>
          </li>
        </ol>
      </div>
    </section>
  `,
})
export class AppPage {
  protected readonly tour = APP_TOUR;
  protected readonly equivalents = APP_EQUIVALENTS;
  protected readonly downloads = DOWNLOADS;
  protected readonly appUrl = `${REPO_URL}/blob/main/app/README.md#installers`;
  protected readonly releases = RELEASES_URL;
}
