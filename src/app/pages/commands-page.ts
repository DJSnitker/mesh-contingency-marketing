import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChatDemo } from '../chat-demo';
import { ADMIN_DEMO, COMMANDS, REPO_URL, WIKI_URL } from '../content';
import { Icon } from '../icon';

@Component({
  selector: 'app-commands-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatDemo, Icon],
  template: `
    <header class="page-hero">
      <div class="wrap split">
        <div>
          <p class="kicker">Admin commands</p>
          <h1>Three commands, <span>for the node’s admins</span></h1>
          <p class="lede">
            The node answers direct messages from its admins, sent from the MeshCore app on their own
            radios like any other message. Anyone else gets <code>unrecognized user or function</code>,
            whatever they send.
          </p>
          <div class="cta">
            <a class="btn" [href]="wiki + '/Admin-Commands'" target="_blank" rel="noopener">Admin Commands in the wiki <app-icon name="arrow" /></a>
          </div>
        </div>
        <app-chat-demo [exchanges]="demo" title="Hilltop Node" />
      </div>
    </header>

    <section class="section alt">
      <div class="wrap">
        <ul class="commands">
          @for (c of commands; track c.name) {
            <li [id]="c.name">
              <div>
                <code class="usage">{{ c.usage }}</code>
                <p>{{ c.description }}</p>
              </div>
              <div class="exchange" [attr.aria-label]="'An example of ' + c.name">
                @for (m of c.demo; track $index) {
                  <code [class]="m.from">{{ m.from === 'node' ? '→ ' : '' }}{{ m.text }}</code>
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </section>

    <section id="admins" class="section">
      <div class="wrap split">
        <div>
          <p class="kicker">Adding an admin</p>
          <h2>A radio’s full key, in the config</h2>
          <ol class="numbered">
            <li><strong>Find the key.</strong> In the MeshCore app on the admin’s radio, share the contact to see it: 64 hex digits. The short 12-character prefix isn’t accepted, since another radio could copy it.</li>
            <li><strong>Add it</strong> to <code>[admins]</code> in <code>config.toml</code>. The installer’s second question writes the first one.</li>
            <li><strong>Restart</strong> the bot.</li>
            <li><strong>Advert from that radio</strong>, so the node has it as a contact.</li>
          </ol>
          <p class="fine">
            Admins can only be changed in this file, never over the mesh, so a lost radio can’t make more.
          </p>
        </div>
        <div class="terminal">
          <div class="t-bar"><i></i><i></i><i></i><span>config.toml</span></div>
<pre><code><span class="k">[admins]</span>
keys = [<span class="s">"&lt;first admin's key&gt;"</span>, <span class="s">"&lt;second admin's key&gt;"</span>]

<span class="c"># then</span>
systemctl --user restart mesh-contingency</code></pre>
        </div>
      </div>
    </section>

    <section id="permissions" class="section alt">
      <div class="wrap split">
        <div>
          <p class="kicker">Who may run what</p>
          <h2>Admin, public or disabled</h2>
          <p>
            Each command has one permission. Making <code>help</code> public lets anyone see what the node
            has; making <code>alert</code> public lets anyone post to Public through the node, so don’t.
            How often one radio may run commands is limited per level in <code>[limits]</code>
            (<code>public_rate = "10/hour"</code> and <code>admin_rate = "none"</code> by default), or per
            command with <code>rate = "5/hour"</code>.
          </p>
        </div>
        <div class="terminal">
          <div class="t-bar"><i></i><i></i><i></i><span>config.toml</span></div>
<pre><code><span class="k">[commands]</span>
help      = {{ '{' }} permission = <span class="s">"admin"</span> {{ '}' }}
alert     = {{ '{' }} permission = <span class="s">"admin"</span> {{ '}' }}
testalert = {{ '{' }} permission = <span class="s">"admin"</span> {{ '}' }}</code></pre>
        </div>
      </div>
    </section>

    <section id="your-own" class="section">
      <div class="wrap">
        <div class="head">
          <p class="kicker">Commands of your own</p>
          <h2>Built on mesh-commands</h2>
          <p>
            The commands run on <code>mesh-commands</code>, a small library in the repo with no imports from
            Mesh Contingency. Write a command against it, then name it in <code>config.toml</code> with
            <code>handler = "module:attr"</code>, or register it under the
            <code>mesh_contingency.commands</code> entry point group.
          </p>
          <div class="cta">
            <a class="btn btn-ghost" [href]="library" target="_blank" rel="noopener">The library’s README <app-icon name="arrow" /></a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CommandsPage {
  protected readonly wiki = WIKI_URL;
  protected readonly library = `${REPO_URL}/blob/main/packages/mesh-commands/README.md`;
  protected readonly commands = COMMANDS;
  protected readonly demo = ADMIN_DEMO;
}
