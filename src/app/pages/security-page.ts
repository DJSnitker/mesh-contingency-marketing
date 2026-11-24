import { ChangeDetectionStrategy, Component } from '@angular/core';
import { INSTALL_URL, SAFEGUARDS } from '../content';

@Component({
  selector: 'app-security-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-hero">
      <div class="wrap">
        <p class="kicker">Built for a shared channel</p>
        <h1>Built to be <span>trusted</span></h1>
        <p class="lede">
          A node that posts to a channel everyone reads has to be sure who may make it speak. Mesh
          Contingency answers its admins and nobody else, takes its admins only from a file on its own
          computer, and keeps nobody’s words in its log.
        </p>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Safeguards</p>
          <h2>Who can make it speak</h2>
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

    <section id="computer" class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">On the node’s computer</p>
          <h2>Your account, not root</h2>
          <p>
            The node, its files and its service belong to the user it runs as. The installer never runs
            sudo and refuses to run as root; when a one-time step needs the computer’s admin, it prints the
            command for you to run.
          </p>
          <ul class="checks">
            <li>Keep <code>config.toml</code> writable only by you (<code>chmod 600</code>): whoever can change it chooses the admins. The bot warns if it isn’t.</li>
            <li>To read the installer before it runs, download it first, read it, then run it with <code>bash</code>.</li>
            <li>An update never touches <code>config.toml</code> or the saved data.</li>
            <li>Never put real keys in code, tests or issues.</li>
          </ul>
        </div>
        <div class="terminal" aria-label="Reading the installer before running it">
          <div class="t-bar"><i></i><i></i><i></i><span>read it first</span></div>
<pre><code>curl -fsSLO {{ installUrl }}
less install.sh
bash install.sh

<span class="c"># keep the config private</span>
chmod 600 ~/mesh-contingency/config.toml</code></pre>
        </div>
      </div>
    </section>

    <section id="public" class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">On the air</p>
          <h2>Public means public</h2>
          <p>
            Everything the node posts goes to a channel: Public, which every MeshCore radio has with the
            same key, or a hashtag channel whose key comes from its name. Anyone in range reads Public, and
            anyone who knows a hashtag channel’s name can join it. An admin’s <code>alert</code> goes out as
            typed, as the node, to all of them.
          </p>
        </header>
      </div>
    </section>
  `,
})
export class SecurityPage {
  protected readonly safeguards = SAFEGUARDS;
  protected readonly installUrl = INSTALL_URL;
}
