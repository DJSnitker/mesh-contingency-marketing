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
  { name: 'backup', usage: 'backup', level: 'admins', description: "Back up the bot's data now" },
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

export interface Exchange {
  from: 'me' | 'node';
  text: string;
}

export interface Shot {
  page: string;
  src: string;
  alt: string;
}

export interface TourStop {
  id: string;
  icon: string;
  label: string;
  title: string;
  body: string;
  shots: Shot[];
}

// The web console's pages, grouped by what an operator is doing.
export const TOUR: TourStop[] = [
  {
    id: 'see',
    icon: 'gauge',
    label: 'See the node',
    title: 'The whole node at a glance',
    body: "The Dashboard shows users, join requests, check-ins and messages waiting, the weather alerts out now, the node watch, the last backup, health, and a live log of what the bot prints. Area Weather has a card for each county you watch: the latest NWS reading, the next three forecast periods and any alert, updated every 15 minutes and saying how old it is when the internet is down.",
    shots: [
      { page: 'Dashboard', src: 'console/dashboard.png', alt: "The console's Dashboard: users, join requests, check-ins and messages tiles, then alerts, watch, backup and health, and the live log" },
      { page: 'Area Weather', src: 'console/weather.png', alt: 'The Area Weather page: a card for each watched county with current conditions, the forecast and any alert' },
    ],
  },
  {
    id: 'people',
    icon: 'users',
    label: 'Look after people',
    title: 'Your users, their check-ins, their mail',
    body: "Approve or deny join requests, look anyone up with Whois, reset a forgotten passphrase or remove a user. See who has checked in and who hasn't, and clear the roll call after an event. See who has messages waiting, from whom, read or sealed, never what they say.",
    shots: [
      { page: 'Users', src: 'console/users.png', alt: 'The Users page: a join request with Approve and Deny, and each user with Whois, Reset passphrase and Remove' },
      { page: 'Check-ins', src: 'console/checkins.png', alt: "The Check-ins page: who has checked in, newest first, and who hasn't" },
      { page: 'Inbox', src: 'console/inbox.png', alt: 'The Inbox page: who has messages waiting and from whom, without their text' },
    ],
  },
  {
    id: 'reach',
    icon: 'send',
    label: 'Reach everyone',
    title: 'Post, message and run the radio',
    body: "Post to #contingency-wx or #contingency-comm, with a count of the room left in one message, or leave a message in someone's inbox. Advert or flood advert, back up now, and see the radio's contacts and channels: reset a contact's path, or remove one the radio no longer needs.",
    shots: [
      { page: 'Send', src: 'console/send.png', alt: "The Send page: post to a channel, or leave a message in a user's inbox" },
      { page: 'Radio', src: 'console/radio.png', alt: "The Radio page: Advert, Flood advert, Back up now, and the radio's contacts with Reset path and Remove" },
    ],
  },
  {
    id: 'record',
    icon: 'clock',
    label: 'Keep a record',
    title: 'Every action, and who did it',
    body: "History lists what admins have done, newest first, with who and when, and a filter: a name, approved, alert. Whatever is done from the console shows as by console, next to what admins did over the radio.",
    shots: [{ page: 'History', src: 'console/history.png', alt: 'The History page: admin actions, newest first, with a filter' }],
  },
];

export interface Equivalent {
  page: string;
  button: string;
  command: string;
  reply: string;
}

// Console buttons and the radio commands they run, with replies from the wiki.
export const EQUIVALENTS: Equivalent[] = [
  { page: 'Users', button: 'Approve', command: 'approve (Sam Rivera)', reply: 'approve: Sam Rivera added to users.toml' },
  { page: 'Send', button: 'Post to #contingency-comm', command: 'comm Water at the fire station until 4pm', reply: 'comm: posted to #contingency-comm' },
  { page: 'Check-ins', button: 'Clear check-ins', command: 'clearstatus', reply: 'clearstatus: cleared 4 statuses' },
  { page: 'Radio', button: 'Back up now', command: 'backup', reply: 'backup: 12 file(s) saved in ~/MeshContingencyBackups/20261022-091340; newest 7 kept' },
  { page: 'Area Weather', button: 'Post alert test', command: 'testalert', reply: 'testalert: posted to #contingency-wx; next weekly test Wed 5:00PM CDT' },
];

export interface Feature {
  icon: string;
  title: string;
  body: string;
  demo: Exchange[];
}

export const FEATURES: Feature[] = [
  {
    icon: 'weather',
    title: 'Weather & alerts',
    body: 'Current conditions and active alerts for any US zipcode, straight from the National Weather Service. The node posts new alerts for the counties you watch to #contingency-wx by itself, with a weekly test so people know it works.',
    demo: [
      { from: 'me', text: 'help wx' },
      { from: 'node', text: 'wx <zipcode> - Weather, precipitation and alerts for a US zipcode' },
      { from: 'me', text: 'wx 79601' },
      { from: 'node', text: '79601 Mostly Cloudy, 20% precip 6h | 82F E14mph G18' },
    ],
  },
  {
    icon: 'check',
    title: 'Check-ins',
    body: "Tell everyone you're ok, with a short status. Anyone can look up anyone's last check-in by name, and admins get a roll call of who's checked in and who's missing.",
    demo: [
      { from: 'me', text: 'ok at the shelter on 5th st, all 4 of us fine' },
      { from: 'node', text: 'ok: saved for Sam T-Deck' },
      { from: 'me', text: 'status alex' },
      { from: 'node', text: 'Alex Base: heading north on 83 (25m ago)' },
    ],
  },
  {
    icon: 'inbox',
    title: 'Messages that wait',
    body: 'Leave a message for another user. It waits on the node until they read it, even if their radio is off when you send.',
    demo: [
      { from: 'me', text: 'msg Alex Base water is out on the east side' },
      { from: 'node', text: 'msg: saved for Alex Base (1 in their inbox)' },
      { from: 'me', text: 'inbox' },
      { from: 'node', text: 'Alex Base 5m ago: on my way, 20 minutes out' },
    ],
  },
  {
    icon: 'lock',
    title: 'Sealed with a passphrase',
    body: "Set a passphrase and new messages to you are sealed. Nobody can read them without it, the node's owner included.",
    demo: [
      { from: 'me', text: 'setpass blue-canoe-42x' },
      { from: 'node', text: 'setpass: passphrase set; new messages to you will be sealed.' },
      { from: 'me', text: 'inbox' },
      { from: 'node', text: 'inbox: 1 message(s) from Alex Base 5m ago. Send inbox <passphrase> to read.' },
      { from: 'me', text: 'inbox blue-canoe-42x' },
      { from: 'node', text: 'Alex Base 5m ago: on my way, 20 minutes out' },
    ],
  },
  {
    icon: 'mail',
    title: 'Email off the mesh',
    body: "Reach family who are off the mesh: one preset contact, a group of up to 10, or any address. If an email can't go out, the reply says why, so you know to send it again.",
    demo: [
      { from: 'me', text: 'qm made it home safe, phone is dead' },
      { from: 'node', text: 'qm: sent' },
      { from: 'me', text: 'email friend@example.com power is back on here' },
      { from: 'node', text: 'email: not sent, no internet at the node; try again later' },
    ],
  },
  {
    icon: 'book',
    title: 'Scripture, offline',
    body: 'The whole Berean Standard Bible is bundled with the node, so any verse, or the verse of the day, works with no internet at all.',
    demo: [
      { from: 'me', text: 'verse john 3:16' },
      { from: 'node', text: '(1/2) John 3:16 For God so loved the world that He gave His one and only Son, that everyone who believes in Him shall not perish but' },
      { from: 'node', text: '(2/2) have eternal life.' },
    ],
  },
];

export interface Safeguard {
  title: string;
  body: string;
}

export const SAFEGUARDS: Safeguard[] = [
  {
    title: 'Looks after itself',
    body: "Admins get a direct message when something goes wrong with the node (a low battery, the radio restarting, email failing) and when it's over. Its data is backed up every day, and admin actions are recorded with who did them and when.",
  },
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
    body: 'remove, resetpass and leave first say what they would do and wait for the same command again within 5 minutes. In the console, they wait for Confirm.',
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
    icon: 'shield',
    title: 'Admin Guide',
    body: 'The web console, adding and managing users, health and problem notices, backups, adverts, weather alerts, news and roll calls.',
    url: `${WIKI_URL}/Admin-Guide`,
  },
  {
    icon: 'radio',
    title: 'User Guide',
    body: 'Getting connected, joining, checking in, leaving messages, keeping them private, sending email.',
    url: `${WIKI_URL}/User-Guide`,
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

export type Slide =
  | { kind: 'console'; label: string; title: string; shot: Shot }
  | { kind: 'radio'; label: string; title: string; device: string; demo: Exchange[] };

const demoOf = (icon: string) => FEATURES.find((f) => f.icon === icon)!.demo;
const shotOf = (page: string) => TOUR.flatMap((t) => t.shots).find((s) => s.page === page)!;

// The hero carousel: the operator's console and a radio user's screen, in turn.
export const HERO_SLIDES: Slide[] = [
  { kind: 'console', label: 'Web console', title: 'The whole node at a glance', shot: shotOf('Dashboard') },
  { kind: 'radio', label: 'On the radio', title: 'Check in from anywhere on the mesh', device: 'Contingency node', demo: demoOf('check') },
  { kind: 'console', label: 'Web console', title: 'Approve people as they join', shot: shotOf('Users') },
  { kind: 'radio', label: 'On the radio', title: 'Weather with no internet on your end', device: 'Contingency node', demo: demoOf('weather') },
  { kind: 'console', label: 'Web console', title: 'Post news to everyone at once', shot: shotOf('Send') },
  { kind: 'radio', label: 'On the radio', title: 'Messages only you can open', device: 'Sealed inbox', demo: demoOf('lock') },
  { kind: 'console', label: 'Web console', title: 'Weather for every county you watch', shot: shotOf('Area Weather') },
  { kind: 'radio', label: 'On the radio', title: 'Email family off the mesh', device: 'Contingency node', demo: demoOf('mail') },
];
