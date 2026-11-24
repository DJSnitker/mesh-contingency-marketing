import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChatDemo } from '../chat-demo';
import { CHANNEL_DEMO, GUIDES, MESHCORE_URL } from '../content';
import { Icon } from '../icon';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChatDemo, Icon, RouterLink],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly meshcore = MESHCORE_URL;
  protected readonly guides = GUIDES;
  protected readonly channel = CHANNEL_DEMO;

  protected readonly paths = [
    {
      link: '/alerts',
      icon: 'weather',
      kicker: 'What gets posted',
      title: 'The alerts',
      body: 'What a post looks like, which counties, a filter by severity or event, a weekly test, and Public or a test channel.',
    },
    {
      link: '/commands',
      icon: 'chat',
      kicker: 'For the node’s admins',
      title: 'Admin commands',
      body: 'alert, testalert and help, by direct message from your own radio, and how to make a radio an admin.',
    },
    {
      link: '/security',
      icon: 'shield',
      kicker: 'Built for a shared channel',
      title: 'Security',
      body: 'Admins by full key and only from the file, silence to everyone else, rate limits, and a log that keeps no text.',
    },
    {
      link: '/setup',
      icon: 'terminal',
      kicker: 'Run your own node',
      title: 'Set up a node',
      body: 'A Linux computer and a MeshCore radio on USB. One command installs it, without sudo, and another checks it.',
    },
  ];
}
