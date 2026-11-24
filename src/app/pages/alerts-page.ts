import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatDemo } from '../chat-demo';
import { CHANNEL_DEMO, POST_PARTS, WIKI_URL } from '../content';
import { Icon } from '../icon';

@Component({
  selector: 'app-alerts-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatDemo, Icon, RouterLink],
  template: `
    <header class="page-hero">
      <div class="wrap split">
        <div>
          <p class="kicker">Weather alerts</p>
          <h1>Every new alert, <span>posted once</span></h1>
          <p class="lede">
            Every 10 minutes the node asks the National Weather Service about your counties and posts each
            new alert to MeshCore’s Public channel. Anyone in range with a MeshCore radio sees it, with no
            internet and no phone signal on their end, and nothing to join or install.
          </p>
          <div class="cta">
            <a class="btn" [href]="wiki + '/Weather-Alerts'" target="_blank" rel="noopener">Weather Alerts in the wiki <app-icon name="arrow" /></a>
            <a class="btn btn-ghost" routerLink="/setup">Set up a node</a>
          </div>
        </div>
        <app-chat-demo [exchanges]="channel" title="Public" subtitle="channel · every radio in range" />
      </div>
    </header>

    <section id="post" class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">What a post looks like</p>
          <h2>One line, made to fit</h2>
          <p>
            Details such as “moving east at 30 mph” don’t fit in a mesh message; they’re at weather.gov. When
            the NWS updates an alert (a warning extended, say), that’s a new alert, and it’s posted too.
          </p>
        </header>
        <div class="post-line" aria-label="An alert as it shows on the Public channel">
          <code>Hilltop Node: Taylor, TX ALERT: Severe Thunderstorm Warning | until Tue 6:00PM | Taylor; Jones</code>
        </div>
        <table class="spec">
          <thead>
            <tr><th scope="col">Part</th><th scope="col">What it is</th></tr>
          </thead>
          <tbody>
            @for (p of parts; track p.part) {
              <tr><td><code>{{ p.part }}</code></td><td>{{ p.meaning }}</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>

    <section id="counties" class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">Choosing counties</p>
          <h2>Your counties, by name</h2>
          <p>
            The installer’s first question writes this list; change it in <code>config.toml</code> later
            and restart the bot.
          </p>
          <ul class="checks">
            <li>Each county is a name and a state: <code>Taylor, TX</code>. <code>Taylor County, TX</code> works too, and a Louisiana parish is <code>Orleans Parish, LA</code>.</li>
            <li>At startup the bot looks each one up and says what it’s watching. One it can’t look up is logged, and tried again each round: check the spelling.</li>
            <li>An alert several of your counties share is posted once, named by the first county it covers.</li>
            <li>What has been posted is kept in <code>alerts.json</code>, so a restart repeats nothing. An empty list turns the alerts off.</li>
          </ul>
        </div>
        <div class="terminal">
          <div class="t-bar"><i></i><i></i><i></i><span>config.toml</span></div>
<pre><code><span class="k">[alerts]</span>
counties = [<span class="s">"Taylor, TX"</span>, <span class="s">"Jones, TX"</span>]
every_minutes = 10   <span class="c"># how often to check; at least 5</span>

<span class="c"># at startup, the log says:</span>
<span class="c"># Watching NWS alerts for 2 counties</span>
<span class="c"># (Taylor, TX; Jones, TX) every 10 min to Public.</span></code></pre>
        </div>
      </div>
    </section>

    <section id="filter" class="section alt">
      <div class="wrap split">
        <div>
          <p class="kicker">Posting only some alerts</p>
          <h2>A filter, if you want one</h2>
          <p>
            With no filter, every alert for your counties is posted, advisories and statements included.
            To post fewer, filter by the NWS’s own severity, by event name, or both.
          </p>
          <ul class="checks">
            <li><code>severity</code> takes Extreme, Severe, Moderate, Minor or Unknown. Tornado and severe thunderstorm warnings are usually Severe or Extreme; most advisories are Moderate or Minor.</li>
            <li><code>events</code> takes event names as the NWS writes them, in any case.</li>
            <li>An alert must pass every filter you set.</li>
            <li>A filtered-out alert is still remembered, so loosening the filter later doesn’t post old ones.</li>
          </ul>
        </div>
        <div class="terminal">
          <div class="t-bar"><i></i><i></i><i></i><span>config.toml</span></div>
<pre><code><span class="k">[alerts]</span>
counties = [<span class="s">"Taylor, TX"</span>, <span class="s">"Jones, TX"</span>]
severity = [<span class="s">"Extreme"</span>, <span class="s">"Severe"</span>]
<span class="c"># events = ["Tornado Warning",</span>
<span class="c">#           "Severe Thunderstorm Warning",</span>
<span class="c">#           "Flash Flood Warning"]</span></code></pre>
        </div>
      </div>
    </section>

    <section id="test" class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">The weekly test</p>
          <h2>So people know it works</h2>
          <p>
            Once a week the node posts a test message, then the counties it watches. An admin can post the
            same test any time with <a routerLink="/commands" fragment="testalert"><code>testalert</code></a>.
          </p>
          <ul class="checks">
            <li>It stays at the same local time across daylight saving.</li>
            <li>If the bot isn’t running at that time, that week’s test is skipped.</li>
            <li>A message of your own must fit in one channel message with the node’s name; one that’s too long stops the bot at startup, saying how much room there is.</li>
          </ul>
        </div>
        <div class="terminal">
          <div class="t-bar"><i></i><i></i><i></i><span>config.toml</span></div>
<pre><code><span class="k">[alert_test]</span>
weekly = <span class="s">"Wednesday 17:00"</span>      <span class="c"># or "Wed 5:00PM"</span>
timezone = <span class="s">"America/Chicago"</span>    <span class="c"># defaults to the computer's</span>
<span class="c"># message = "TEST: this is a test of the weather</span>
<span class="c">#   alerts on this channel. No action needed."</span></code></pre>
        </div>
      </div>
    </section>

    <section id="channel" class="section alt">
      <div class="wrap">
        <header class="head">
          <p class="kicker">The channel</p>
          <h2>Public, or one you pick</h2>
          <p>
            The alerts, <code>alert</code>, <code>testalert</code> and the weekly test all go to the same
            channel. The bot finds it by its key, in whatever slot it’s in on the node’s radio.
          </p>
        </header>
        <ul class="safeguards">
          <li>
            <h3>Public, the default</h3>
            <p>
              Every MeshCore radio starts with it, with the same key, so anyone in range reads what the
              node posts. Public is never added or changed; a radio without it posts nothing, and the bot
              says so at startup.
            </p>
          </li>
          <li>
            <h3>A hashtag channel</h3>
            <p>
              Set <code>channel = "#wx-test"</code> under <code>[alerts]</code> to try the node out without
              posting to everyone, or for a group that wants its own. Join the same channel on your own
              radio to see the posts. One the node’s radio doesn’t have is added to its first empty slot.
            </p>
          </li>
        </ul>
        <p class="fine">
          Anyone in range reads what’s posted to Public, and anyone who knows a hashtag channel’s name can
          join it. Post nothing there you wouldn’t say to everyone.
        </p>
      </div>
    </section>
  `,
})
export class AlertsPage {
  protected readonly wiki = WIKI_URL;
  protected readonly channel = CHANNEL_DEMO;
  protected readonly parts = POST_PARTS;
}
