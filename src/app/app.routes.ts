import { Routes } from '@angular/router';
import { AlertsPage } from './pages/alerts-page';
import { CommandsPage } from './pages/commands-page';
import { HomePage } from './pages/home-page';
import { SecurityPage } from './pages/security-page';
import { SetupPage } from './pages/setup-page';
import { WallpapersPage } from './pages/wallpapers-page';

// Each page's description is used for the meta and link-preview tags.
export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    title: 'Mesh Contingency: weather alerts over MeshCore',
    data: {
      description: 'National Weather Service alerts for your counties, posted to MeshCore’s Public channel as they’re issued, by a small bot on a Linux computer with a MeshCore radio.',
    },
  },
  {
    path: 'alerts',
    component: AlertsPage,
    title: 'Weather alerts · Mesh Contingency',
    data: {
      description: 'What a Mesh Contingency alert looks like on the mesh, and how to choose the counties, filter by severity or event, set the weekly test and pick the channel.',
    },
  },
  {
    path: 'commands',
    component: CommandsPage,
    title: 'Admin commands · Mesh Contingency',
    data: {
      description: 'alert, testalert and help: what a Mesh Contingency node’s admins can send it from their own radios, and how to add an admin.',
    },
  },
  {
    path: 'security',
    component: SecurityPage,
    title: 'Security · Mesh Contingency',
    data: {
      description: 'How a Mesh Contingency node decides who its admins are, answers no one else, and keeps its log free of what anyone wrote.',
    },
  },
  {
    path: 'setup',
    component: SetupPage,
    title: 'Set up a node · Mesh Contingency',
    data: {
      description: 'Put a Mesh Contingency node on your mesh: a Linux computer, a MeshCore radio on USB, and one command that installs it without sudo.',
    },
  },
  {
    path: 'wallpapers',
    component: WallpapersPage,
    title: 'Wallpapers · Mesh Contingency',
    data: {
      description: 'Mesh Contingency desktop wallpapers for dual monitors, ultrawides and single screens, free to download.',
    },
  },
  // Pages from before 1.0, kept so old links still land somewhere useful.
  { path: 'people', redirectTo: 'alerts' },
  { path: 'console', redirectTo: '' },
  { path: 'app', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
