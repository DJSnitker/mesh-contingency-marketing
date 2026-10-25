import { Routes } from '@angular/router';
import { AppPage } from './pages/app-page';
import { CommandsPage } from './pages/commands-page';
import { ConsolePage } from './pages/console-page';
import { HomePage } from './pages/home-page';
import { PeoplePage } from './pages/people-page';
import { SecurityPage } from './pages/security-page';
import { SetupPage } from './pages/setup-page';

// Each page's description is used for the meta and link-preview tags.
export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Mesh Contingency: a contingency link over MeshCore',
    data: {
      description: 'Weather, check-ins, private messages and email over a MeshCore mesh radio, a web console that puts the whole node on one screen, and a phone app for everyone on the mesh.',
    },
  },
  {
    path: 'console',
    component: ConsolePage,
    title: 'The web console · Mesh Contingency',
    data: {
      description: "Run a Mesh Contingency node from a browser on its own computer: users, check-ins, alerts, the node's health and the radio, on one screen.",
    },
  },
  {
    path: 'app',
    component: AppPage,
    title: 'The phone app · Mesh Contingency',
    data: {
      description: 'Join, check in, read the mailbox, email, chat and get the weather from your phone, over Bluetooth to your own MeshCore radio, with no internet.',
    },
  },
  {
    path: 'people',
    component: PeoplePage,
    title: 'For your people · Mesh Contingency',
    data: {
      description: 'What anyone with a MeshCore radio can do with your node: weather, check-ins, messages that wait, sealed inboxes, email and scripture.',
    },
  },
  {
    path: 'commands',
    component: CommandsPage,
    title: 'Commands · Mesh Contingency',
    data: { description: 'Every Mesh Contingency command, who can run it and what it does.' },
  },
  {
    path: 'security',
    component: SecurityPage,
    title: 'Security · Mesh Contingency',
    data: {
      description: 'How Mesh Contingency keeps the node, its console and people’s messages safe on a shared, noisy channel.',
    },
  },
  {
    path: 'setup',
    component: SetupPage,
    title: 'Set up a node · Mesh Contingency',
    data: {
      description: 'Put a Mesh Contingency node on your mesh: a computer that stays on, a MeshCore companion radio, and three steps to the web console.',
    },
  },
  { path: '**', redirectTo: '' },
];
