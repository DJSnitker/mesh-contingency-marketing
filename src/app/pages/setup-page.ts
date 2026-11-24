import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GUIDES, INSTALL_URL, WIKI_URL } from '../content';
import { Icon } from '../icon';

@Component({
  selector: 'app-setup-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  template: `
    <header class="page-hero">
      <div class="wrap split">
        <div>
          <p class="kicker">Run your own node</p>
          <h1>Set up <span>a node</span></h1>
          <p class="lede">
            A Linux computer, a MeshCore radio on its USB port, and about 15 minutes. One command installs
            everything as your normal account, and another checks it. Weather comes from the National
            Weather Service, with no API keys.
          </p>
          <div class="cta">
            <a class="btn" [href]="wiki + '/Set-Up-a-Node'" target="_blank" rel="noopener">Set Up a Node in the wiki <app-icon name="arrow" /></a>
            <a class="btn btn-ghost" [href]="wiki + '/Troubleshooting'" target="_blank" rel="noopener">Troubleshooting</a>
          </div>
        </div>
        <div class="needs">
          <h2 class="small">You’ll need</h2>
          <ul class="checks">
            <li>A Linux computer with systemd, on all the time, with the internet (Debian, Ubuntu, Raspberry Pi OS, Fedora, Arch…)</li>
            <li>git and Python 3.11 or newer; the installer says how to get them</li>
            <li>A MeshCore radio with the USB companion firmware and the Public channel, for the node</li>
            <li>Your own radio with the MeshCore app, to be the admin’s</li>
          </ul>
        </div>
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <ol class="setup-list">
          <li id="install">
            <div>
              <span class="n">1</span>
              <h3>Install it</h3>
              <p>
                Run it as the user the node will run as, <strong>not with sudo</strong>. It asks two
                questions, your counties and your radio’s public key (Enter skips it), then puts the latest
                release in <code>~/mesh-contingency</code>, writes <code>config.toml</code> with your answers,
                and sets up a systemd user service that starts the node at boot.
              </p>
              <p>It ends with a numbered list of what’s left, such as joining the radio’s group.</p>
            </div>
            <div class="terminal">
              <div class="t-bar"><i></i><i></i><i></i><span>install</span></div>
<pre><code>curl -fsSL {{ installUrl }} | bash

Counties for weather alerts, e.g. Taylor, TX; Jones, TX: <span class="s">Taylor, TX; Jones, TX</span>
Your radio's public key, to be its admin (Enter to skip): <span class="s">a1b2c3...</span>

<span class="c"># answer without being asked:</span>
curl -fsSL .../install.sh | bash -s -- \
  --counties <span class="s">"Taylor, TX; Jones, TX"</span> --admin-key KEY</code></pre>
            </div>
          </li>
          <li id="radio">
            <div>
              <span class="n">2</span>
              <h3>Let your account use the radio</h3>
              <p>
                The radio is a serial device only one group may open, usually <code>dialout</code>
                (<code>uucp</code> on Arch). With it plugged in, the installer tries the port itself and says
                what’s in the way. A new group only applies to new logins, so log out and back in.
              </p>
            </div>
            <div class="terminal">
              <div class="t-bar"><i></i><i></i><i></i><span>once, with the computer's admin</span></div>
<pre><code><span class="c"># the installer prints the ones you need:</span>
sudo usermod -aG dialout "$USER"     <span class="c"># then log out and in</span>
sudo loginctl enable-linger "$USER"  <span class="c"># if it can't itself</span>
sudo apt-get install git python3 python3-venv</code></pre>
            </div>
          </li>
          <li id="check">
            <div>
              <span class="n">3</span>
              <h3>Check it</h3>
              <p>
                It reads <code>config.toml</code> as the bot does, and before starting anything stops on no
                radio, a port you can’t open, a mistake in the config, or no counties. Then it starts the
                service and waits for the bot to listen, and stops if the radio has no Public channel or the
                alert watcher didn’t start.
              </p>
            </div>
            <div class="terminal">
              <div class="t-bar"><i></i><i></i><i></i><span>check</span></div>
<pre><code>~/mesh-contingency/install.sh --check

<span class="s">Running, with no warnings.</span>
The node is listening. Next: send it help from an
admin radio, and test a reboot.</code></pre>
            </div>
          </li>
          <li id="meet">
            <div>
              <span class="n">4</span>
              <h3>Meet it from your radio</h3>
              <p>
                Two radios can only message each other once each has heard the other’s advert. Advert from
                your radio, have the node advert, then send it <code>help</code>. Send <code>testalert</code>
                last: the test message and the counties watched should show on Public. Set
                <code>[advert] every_hours = 12</code> to have it advert by itself.
              </p>
            </div>
            <div class="terminal">
              <div class="t-bar"><i></i><i></i><i></i><span>advert now</span></div>
<pre><code>systemctl --user kill --kill-whom=main -s USR1 mesh-contingency

<span class="c"># from your radio, by direct message</span>
help
<span class="s">→ commands: alert, help, testalert. Send help &lt;command&gt; for usage</span>
testalert
<span class="s">→ testalert: posted to Public; next weekly test Wed 5:00PM CST</span></code></pre>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section id="day-to-day" class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">Day to day</p>
          <h2>Update, watch, remove</h2>
          <ul class="checks">
            <li><strong>Update</strong> by running the install command again. It moves to the newest release, reinstalls and restarts the service, and never asks questions or touches <code>config.toml</code> or saved data.</li>
            <li><strong>The log</strong> has everything the bot does, with names and command names but never anyone’s text.</li>
            <li><strong>Remove it</strong> by disabling the service and deleting the node folder.</li>
          </ul>
        </div>
        <div class="terminal">
          <div class="t-bar"><i></i><i></i><i></i><span>day to day</span></div>
<pre><code><span class="c"># the log, live</span>
journalctl --user -u mesh-contingency -f

<span class="c"># after changing config.toml</span>
systemctl --user restart mesh-contingency

<span class="c"># remove it</span>
systemctl --user disable --now mesh-contingency
rm ~/.config/systemd/user/mesh-contingency.service
systemctl --user daemon-reload
rm -rf ~/mesh-contingency   <span class="c"># copy config.toml first</span></code></pre>
        </div>
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
  protected readonly wiki = WIKI_URL;
  protected readonly guides = GUIDES;
  protected readonly installUrl = INSTALL_URL;
}
