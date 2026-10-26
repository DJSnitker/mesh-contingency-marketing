import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_TOUR, GUIDES, REPO_URL, WIKI_URL } from '../content';
import { Icon } from '../icon';

@Component({
  selector: 'app-setup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, RouterLink],
  template: `
    <header class="page-hero">
      <div class="wrap split">
        <div>
          <p class="kicker">Run your own node</p>
          <h1>Set up <span>a node</span></h1>
          <p class="lede">
            All it takes is a computer that stays on and a MeshCore companion radio on USB serial. The
            Bible is bundled, so <code>verse</code> works offline; weather uses the National Weather
            Service with no API keys.
          </p>
          <div class="cta">
            <a class="btn" [href]="repo + '#setup'" target="_blank" rel="noopener">Full setup instructions <app-icon name="arrow" /></a>
            <a class="btn btn-ghost" [href]="wiki + '/Running-as-a-systemd-Service-on-Linux'" target="_blank" rel="noopener">Run as a service</a>
          </div>
        </div>
        <div class="needs">
          <h2 class="small">You’ll need</h2>
          <ul class="checks">
            <li>Python 3.11 or newer</li>
            <li>A MeshCore companion radio on USB serial</li>
            <li>The <code>mail</code> command, for email</li>
            <li>Internet on the node for <code>wx</code>, weather alerts and email</li>
            <li>For the console: Node.js 22.22+ or 24.15+, only to build it</li>
          </ul>
        </div>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <ol class="setup-list">
          <li>
            <div>
              <span class="n">1</span>
              <h3>Install the bot</h3>
              <p>
                Install it in a virtual environment, copy the example config and users files, and keep
                them private. Then choose who may run each command, and which counties to watch for NWS
                alerts.
              </p>
            </div>
            <div class="terminal">
              <div class="t-bar"><i></i><i></i><i></i><span>install</span></div>
<pre><code>python3 -m venv .venv
.venv/bin/pip install -e .
cp config.example.toml config.toml
cp users.example.toml users.toml
chmod 600 config.toml users.toml

<span class="c"># config.toml: who can run what</span>
<span class="k">[commands]</span>
wx      = {{ '{' }} permission = <span class="s">"public"</span> {{ '}' }}
area    = {{ '{' }} permission = <span class="s">"public"</span> {{ '}' }}  <span class="c"># the app's Weather tab</span>
msg     = {{ '{' }} permission = <span class="s">"user"</span> {{ '}' }}
approve = {{ '{' }} permission = <span class="s">"admin"</span> {{ '}' }}

<span class="c"># post new NWS alerts for these counties</span>
<span class="k">[alerts]</span>
counties = [<span class="s">"Taylor, TX"</span>, <span class="s">"Jones, TX"</span>]</code></pre>
            </div>
          </li>
          <li id="console">
            <div>
              <span class="n">2</span>
              <h3>Turn on the console</h3>
              <p>
                Install the console’s extra and build its app, once per update. Node.js is only needed for
                the build; the bot doesn’t need it to run. Then turn it on and restart the bot, which prints
                the console’s link.
              </p>
            </div>
            <div class="terminal">
              <div class="t-bar"><i></i><i></i><i></i><span>console</span></div>
<pre><code>.venv/bin/pip install -e <span class="s">".[console]"</span>
cd console &amp;&amp; npm ci &amp;&amp; npm run build &amp;&amp; cd ..

<span class="c"># config.toml</span>
<span class="k">[console]</span>
enabled = true

<span class="c"># restart the bot</span>
systemctl --user restart mesh-contingency</code></pre>
            </div>
          </li>
          <li>
            <div>
              <span class="n">3</span>
              <h3>Open it</h3>
              <p>
                On the node’s computer, one command checks the bot answers and opens the console in your
                browser. If it can’t, it says why: the console is off, the bot isn’t running, or the link
                is old.
              </p>
            </div>
            <div class="terminal">
              <div class="t-bar"><i></i><i></i><i></i><span>open</span></div>
<pre><code>.venv/bin/mesh-contingency-console

<span class="c"># or open the link yourself</span>
cat console.url</code></pre>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">Then, your people</p>
          <h2>Hand them the app</h2>
          <p>
            Your node needs nothing more for the app: it sends the same commands people type. Each person
            installs it on an Android phone or a Windows, Mac or Linux computer, connects their own MeshCore
            radio over Bluetooth or USB, picks your node and presses Join; you approve them from the console.
            Turn on <code>area</code> for its Weather tab’s county cards.
          </p>
          <div class="cta">
            <a class="btn" routerLink="/app" fragment="get">Get the app <app-icon name="arrow" /></a>
            <a class="btn btn-ghost" routerLink="/app"><app-icon name="phone" /> Tour the app</a>
          </div>
        </div>
        <figure class="phone">
          <img [src]="nodeShot.src" [alt]="nodeShot.alt" width="780" height="1688" loading="lazy" />
          <figcaption>Node · demo radio, made-up data</figcaption>
        </figure>
      </div>
    </section>

    <section class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">Documentation</p>
          <h2>The manual lives in the wiki</h2>
        </header>
        <ul class="guides">
          @for (g of guides; track g.title) {
            <li>
              <a [href]="g.url" target="_blank" rel="noopener">
                <span class="f-icon"><app-icon [name]="g.icon" /></span>
                <h3>{{ g.title }} <app-icon name="arrow" /></h3>
                <p>{{ g.body }}</p>
              </a>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
})
export class SetupPage {
  protected readonly repo = REPO_URL;
  protected readonly wiki = WIKI_URL;
  protected readonly guides = GUIDES;
  protected readonly nodeShot = APP_TOUR[0].shots[0];
}
