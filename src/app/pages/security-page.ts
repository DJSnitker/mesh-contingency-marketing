import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatDemo } from '../chat-demo';
import { APP_TOUR, FEATURES, SAFEGUARDS } from '../content';

@Component({
  selector: 'app-security-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatDemo],
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">Built for bad days</p>
        <h1>Built to be <span>trusted</span></h1>
        <p class="lede">
          A node on a shared, noisy channel has to cope with impostors, floods of requests, mistakes and
          dead disks, and keep people’s messages private from everyone, its owner included.
        </p>
      </div>
    </header>

    <section id="console" class="section alt">
      <div class="wrap split">
        <div>
          <p class="kicker">The web console</p>
          <h2>Only on the node’s computer</h2>
          <p>
            The console is for whoever sits at the node. Other computers can’t reach it, by design, and
            it’s off until you turn it on.
          </p>
          <ul class="checks">
            <li>It answers only on <code>127.0.0.1</code>, so nothing on the network can reach it.</li>
            <li>It needs the key in the link the bot prints, then a cookie. Each restart makes a new key.</li>
            <li>It refuses other hosts and origins and sends a strict Content-Security-Policy, so other web pages can’t use it.</li>
            <li>It can’t read sealed messages or change <code>config.toml</code>.</li>
            <li>The radio’s settings change only here. It reaches the radio over USB, so a setting that cuts the node off from the mesh can’t cut off the console, and a new frequency waits for the node’s name to be typed.</li>
            <li>Its fonts are bundled, so it works with no internet.</li>
          </ul>
        </div>
        <div class="terminal" aria-label="The bot's startup lines">
          <div class="t-bar"><i></i><i></i><i></i><span>mesh-contingency</span></div>
<pre><code>Connected to Ridgeview Relay.
<span class="s">Web console: http://127.0.0.1:8737/?key=...</span>
<span class="c">  (also in ~/mesh-contingency/console.url)</span>
Listening for direct messages (Ctrl+C to quit)...</code></pre>
        </div>
      </div>
    </section>

    <section id="app" class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">The phone app</p>
          <h2>Nothing leaves the phone but over the radio</h2>
          <p>
            The app talks to its user’s own radio over Bluetooth, and the radio carries each request to the
            node as a direct message, exactly as a typed command. It adds no new way into the node.
          </p>
          <ul class="checks">
            <li>Every request is an ordinary direct message, so the node checks the sender’s full key, permissions, rate limits and confirmations as it does for any radio.</li>
            <li>Release builds have no internet permission. Android asks only for Nearby devices (location only on Android 11 and older, which needed it to scan).</li>
            <li>The passphrase is typed for each <code>inbox</code> and <code>setpass</code> and never stored, and opened messages aren’t kept on the phone.</li>
            <li>It sends the node only user commands: no remote admin. Its Radio tab changes the user’s own radio, never the node’s.</li>
            <li>Chats are kept on the phone only, until cleared; what’s sent to the node isn’t kept with them.</li>
          </ul>
        </div>
        <figure class="phone">
          <img [src]="mailboxShot.src" [alt]="mailboxShot.alt" width="780" height="1688" loading="lazy" />
          <figcaption>Mailbox · demo radio, made-up data</figcaption>
        </figure>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Safeguards</p>
          <h2>Hardened for a shared channel</h2>
        </header>
        <ul class="safeguards">
          @for (s of safeguards; track s.title) {
            <li>
              <h3>{{ s.title }}</h3>
              <p>{{ s.body }}</p>
            </li>
          }
        </ul>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">Sealed messages</p>
          <h2>Private, even from the node’s owner</h2>
          <p>
            A user who sets a passphrase gets every new message to them sealed. The node stores only who
            sent it and when; nobody can read it without the passphrase, and nobody has to handle keys.
          </p>
          <ul class="checks">
            <li>The passphrase becomes a key pair (scrypt, then X25519). Only the public half is saved.</li>
            <li>The passphrase and private half are never stored: <code>inbox &lt;passphrase&gt;</code> rebuilds the key, opens the messages and forgets it again.</li>
            <li>Private commands never echo the message, passphrase or reply to the node’s console or log.</li>
            <li>The web console shows who has messages waiting, never what they say.</li>
            <li>The phone app asks for the passphrase each time, and warns before a new one would lose sealed messages.</li>
          </ul>
          <p class="fine">
            A forgotten passphrase can’t be recovered, and messages sealed with it are lost. Sealing protects
            what’s stored; the radio still hands the node plain text as each message arrives.
          </p>
        </div>
        <app-chat-demo [exchanges]="sealedDemo" title="Sealed inbox" />
      </div>
    </section>
  `,
})
export class SecurityPage {
  protected readonly safeguards = SAFEGUARDS;
  protected readonly mailboxShot = APP_TOUR.flatMap((t) => t.shots).find((s) => s.page === 'Mailbox')!;
  protected readonly sealedDemo = FEATURES.find((f) => f.icon === 'lock')!.demo;
}
