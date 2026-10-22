// Site copy and data, taken from the mesh-contingency README and wiki.

export const REPO_URL = 'https://github.com/DJSnitker/mesh-contingency';
export const WIKI_URL = `${REPO_URL}/wiki`;
export const MESHCORE_URL = 'https://github.com/meshcore-dev/MeshCore';
export const CONTACT_EMAIL = 'information@meshcontingency.com';

export type Level = 'anyone' | 'users' | 'admins';

export interface Command {
  name: string;
  usage: string;
  level: Level;
  description: string;
}

export const COMMANDS: Command[] = [
  { name: 'addgroup', usage: 'addgroup <address>', level: 'users', description: 'Add an address to your emailall group; alone, list it' },
  { name: 'advert', usage: 'advert [flood]', level: 'admins', description: 'Make the radio advertise itself' },
  { name: 'alert', usage: 'alert <message>', level: 'admins', description: 'Post a message to the alert channel, #contingency-wx' },
  { name: 'alertmap', usage: 'alertmap [county, ST]', level: 'admins', description: 'Look up the NWS codes of the watched counties again' },
  { name: 'approve', usage: 'approve [name or key]', level: 'admins', description: 'Approve a join request; alone, list them' },
  { name: 'checkins', usage: 'checkins [page <n>]', level: 'admins', description: "Roll call: everyone's check-in, or missing" },
  { name: 'cleargroup', usage: 'cleargroup', level: 'users', description: 'Empty your emailall group' },
  { name: 'clearinbox', usage: 'clearinbox [all]', level: 'users', description: "Delete the messages you've read, or all of them" },
  { name: 'clearstatus', usage: 'clearstatus', level: 'admins', description: 'Delete every check-in' },
  { name: 'comm', usage: 'comm <message>', level: 'admins', description: 'Post a message to the communications channel, #contingency-comm' },
  { name: 'contacts', usage: 'contacts [name or key] [page]', level: 'admins', description: "List the radio's contacts" },
  { name: 'deny', usage: 'deny <name or key>', level: 'admins', description: 'Turn down a join request' },
  { name: 'email', usage: 'email <address> <message>', level: 'users', description: 'Email any address' },
  { name: 'emailall', usage: 'emailall <message>', level: 'users', description: 'Email your group' },
  { name: 'health', usage: 'health', level: 'admins', description: 'How the node is doing: radio, battery, users, messages, errors' },
  { name: 'help', usage: 'help [command]', level: 'anyone', description: 'List your commands, or how to use one' },
  { name: 'history', usage: 'history [page]', level: 'admins', description: 'What admins have done, newest first' },
  { name: 'inbox', usage: 'inbox [passphrase] [page]', level: 'users', description: 'Read your messages' },
  { name: 'join', usage: 'join', level: 'anyone', description: "Ask to become a user, under your radio's name" },
  { name: 'leave', usage: 'leave', level: 'users', description: 'Stop being a user' },
  { name: 'msg', usage: 'msg <name> <message>', level: 'users', description: 'Leave a message for another user' },
  { name: 'ok', usage: 'ok [status]', level: 'anyone', description: "Check in: tell others you're ok" },
  { name: 'qm', usage: 'qm <message>', level: 'users', description: 'Quick message: email your preset contact' },
  { name: 'reload', usage: 'reload', level: 'admins', description: 'Re-read the users file now' },
  { name: 'remove', usage: 'remove <name or key>', level: 'admins', description: 'Remove a user and their messages' },
  { name: 'resetpass', usage: 'resetpass <name or key>', level: 'admins', description: "Clear a user's forgotten passphrase" },
  { name: 'roster', usage: 'roster', level: 'admins', description: 'Who has messaged the node since it started' },
  { name: 'setpass', usage: 'setpass <passphrase>', level: 'users', description: 'Seal your messages with a passphrase' },
  { name: 'setqm', usage: 'setqm <address>', level: 'users', description: 'Set your qm address; alone, show it' },
  { name: 'status', usage: 'status <name or key>', level: 'anyone', description: "See someone's last check-in" },
  { name: 'testalert', usage: 'testalert', level: 'admins', description: 'Post the test message to the alert channel now' },
  { name: 'users', usage: 'users [page]', level: 'admins', description: 'List the users and what each has set' },
  { name: 'verse', usage: 'verse [book chapter:verse[-verse]]', level: 'anyone', description: 'A Bible verse, or the verse of the day' },
  { name: 'whoami', usage: 'whoami', level: 'users', description: 'What the node knows about you' },
  { name: 'whois', usage: 'whois <name or key>', level: 'admins', description: 'What the node knows about a user' },
  { name: 'wx', usage: 'wx <zipcode>', level: 'anyone', description: 'Weather and alerts for a US zipcode' },
];

export interface Feature {
  icon: string;
  title: string;
  body: string;
  sample: string;
}

export const FEATURES: Feature[] = [
  {
    icon: 'weather',
    title: 'Weather & alerts',
    body: 'Current conditions and active alerts for any US zipcode, straight from the National Weather Service. The node can post new alerts for the counties you watch to a public channel by itself, with a weekly test so people know it works.',
    sample: 'wx 79601',
  },
  {
    icon: 'check',
    title: 'Check-ins',
    body: "Tell everyone you're ok, with a short status. Anyone can look up anyone's last check-in by name, and admins get a roll call of who's checked in and who's missing.",
    sample: 'ok at the shelter, all 4 fine',
  },
  {
    icon: 'inbox',
    title: 'Messages that wait',
    body: "Leave a message for another user. It waits on the node until they read it, even if their radio is off when you send.",
    sample: 'msg Alex Base water is out on the east side',
  },
  {
    icon: 'lock',
    title: 'Sealed with a passphrase',
    body: "Set a passphrase and new messages to you are sealed. Nobody can read them without it, the node's owner included.",
    sample: 'setpass blue-canoe-42x',
  },
  {
    icon: 'mail',
    title: 'Email off the mesh',
    body: "Reach family who are off the mesh: one preset contact, a group of up to 10, or any address. If an email can't go out, the reply says why, so you know to send it again.",
    sample: 'qm made it home safe',
  },
  {
    icon: 'book',
    title: 'Scripture, offline',
    body: 'The whole Berean Standard Bible is bundled with the node, so any verse, or the verse of the day, works with no internet at all.',
    sample: 'verse ps 23:1-3',
  },
];

export interface Exchange {
  from: 'me' | 'node';
  text: string;
}

export const DEMO: Exchange[] = [
  { from: 'me', text: 'help' },
  { from: 'node', text: 'commands: help, wx, verse, ok, status, join. Send help <command> for usage' },
  { from: 'me', text: 'wx 79601' },
  { from: 'node', text: '79601 Mostly Cloudy, 20% precip 6h | 82F E14mph G18' },
  { from: 'me', text: 'ok at the shelter on 5th st, all 4 of us fine' },
  { from: 'node', text: 'ok: saved for Sam T-Deck' },
  { from: 'me', text: 'status alex' },
  { from: 'node', text: 'Alex Base: heading north on 83 (25m ago)' },
  { from: 'me', text: 'qm made it home safe, phone is dead' },
  { from: 'node', text: 'qm: sent' },
];

export const SEALED_DEMO: Exchange[] = [
  { from: 'me', text: 'setpass blue-canoe-42x' },
  { from: 'node', text: 'setpass: passphrase set; new messages to you will be sealed.' },
  { from: 'me', text: 'inbox' },
  { from: 'node', text: 'inbox: 1 message(s) from Alex Base 5m ago. Send inbox <passphrase> to read.' },
  { from: 'me', text: 'inbox blue-canoe-42x' },
  { from: 'node', text: 'Alex Base 5m ago: on my way, 20 minutes out' },
];

export interface Safeguard {
  title: string;
  body: string;
}

export const SAFEGUARDS: Safeguard[] = [
  {
    title: 'Checked by full key',
    body: "A message carries only a 12-character key prefix, so the node checks the sender's full 64-character key against the users file. A radio that copies a prefix never gets that person's rights, and admins are warned about the impostor.",
  },
  {
    title: 'Permissions you set',
    body: 'Every command is public, user, admin or disabled, set in one config table. A newly installed command stays disabled until you allow it.',
  },
  {
    title: 'Rate limits',
    body: 'Per-command, per-sender limits and daily email caps keep anyone from tying up the node or its email account, and the limit itself never makes the radio transmit.',
  },
  {
    title: 'Confirm before it’s gone',
    body: 'remove, resetpass and leave first say what they would do and wait for the same command again within 5 minutes.',
  },
  {
    title: 'Backups & history',
    body: 'The users file is backed up before every change, and admin actions are recorded with who did them and when.',
  },
  {
    title: 'Fits the airwaves',
    body: 'Replies longer than one 133-character message are split between words into numbered parts, so they read in order even when the mesh delivers them out of order.',
  },
];

export interface Guide {
  icon: string;
  title: string;
  body: string;
  url: string;
}

export const GUIDES: Guide[] = [
  {
    icon: 'radio',
    title: 'User Guide',
    body: 'Getting connected, joining, checking in, leaving messages, keeping them private, sending email.',
    url: `${WIKI_URL}/User-Guide`,
  },
  {
    icon: 'shield',
    title: 'Admin Guide',
    body: "Adding and managing users, checking the node's health, history and backups, adverts, weather alerts, news and roll calls, fixing problems.",
    url: `${WIKI_URL}/Admin-Guide`,
  },
  {
    icon: 'list',
    title: 'Commands (A–Z)',
    body: 'Every command with its usage, who can use it and examples.',
    url: `${WIKI_URL}/Commands`,
  },
  {
    icon: 'terminal',
    title: 'Run as a service',
    body: 'Step-by-step setup so the node starts at boot, restarts itself and keeps a log.',
    url: `${WIKI_URL}/Running-as-a-systemd-Service-on-Linux`,
  },
];
