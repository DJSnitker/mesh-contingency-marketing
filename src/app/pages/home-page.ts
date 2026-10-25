import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COMMANDS, GUIDES, MESHCORE_URL } from '../content';
import { HeroCarousel } from '../hero-carousel';
import { Icon } from '../icon';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeroCarousel, Icon, RouterLink],
  templateUrl: './home-page.html',
})
export class HomePage {
  protected readonly meshcore = MESHCORE_URL;
  protected readonly commandCount = COMMANDS.length;
  protected readonly guides = GUIDES;

  // The two ways in: the console for whoever runs the node, the app for everyone else.
  protected readonly sides = [
    {
      link: '/console',
      icon: 'monitor',
      kicker: 'For you, running it',
      title: 'The web console',
      body: 'Everything an admin does, on one screen on the node’s computer: users, check-ins, alerts, the radio’s settings and contacts, and a live log.',
    },
    {
      link: '/app',
      icon: 'phone',
      kicker: 'For your people, using it',
      title: 'The phone app',
      body: 'Join, check in, the mailbox, email, chat, weather and scripture, from screens on their phone, over Bluetooth to their own radio.',
    },
  ];

  protected readonly paths = [
    {
      link: '/people',
      icon: 'radio',
      kicker: 'For everyone on the mesh',
      title: 'What your people get',
      body: 'Weather, check-ins, messages that wait, sealed inboxes and email, from any MeshCore radio, with no internet on their end.',
    },
    {
      link: '/security',
      icon: 'shield',
      kicker: 'Built for bad days',
      title: 'Security',
      body: 'A console only the node’s computer can reach, an app with no internet permission, senders checked by full key, rate limits and sealed messages.',
    },
    {
      link: '/setup',
      icon: 'terminal',
      kicker: 'Run your own node',
      title: 'Set up a node',
      body: 'A computer that stays on and a MeshCore companion radio on USB. Install the bot, turn on the console, and hand your people the app.',
    },
  ];
}
