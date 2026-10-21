import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ChatDemo } from './chat-demo';
import { CommandExplorer } from './command-explorer';
import {
  CONTACT_EMAIL,
  DEMO,
  FEATURES,
  GUIDES,
  MESHCORE_URL,
  REPO_URL,
  SAFEGUARDS,
  SEALED_DEMO,
  WIKI_URL,
} from './content';
import { Icon } from './icon';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatDemo, CommandExplorer, Icon],
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly repo = REPO_URL;
  protected readonly wiki = WIKI_URL;
  protected readonly meshcore = MESHCORE_URL;
  protected readonly email = CONTACT_EMAIL;
  protected readonly demo = DEMO;
  protected readonly sealedDemo = SEALED_DEMO;
  protected readonly features = FEATURES;
  protected readonly safeguards = SAFEGUARDS;
  protected readonly guides = GUIDES;
  protected readonly year = new Date().getFullYear();

  protected readonly nav = [
    { href: '#features', label: 'Features' },
    { href: '#how', label: 'How it works' },
    { href: '#privacy', label: 'Privacy' },
    { href: '#commands', label: 'Commands' },
    { href: '#run', label: 'Run a node' },
  ];

  protected readonly menuOpen = signal(false);
}
