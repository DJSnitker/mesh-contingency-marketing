// Site copy and data, taken from the mesh-contingency README and wiki.

export const REPO_URL = 'https://github.com/DJSnitker/mesh-contingency';
export const WIKI_URL = `${REPO_URL}/wiki`;
export const MESHCORE_URL = 'https://github.com/meshcore-dev/MeshCore';
export const CONTACT_EMAIL = 'information@meshcontingency.com';
export const RELEASES_URL = `${REPO_URL}/releases/latest`;

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
  { name: 'area', usage: 'area [county, ST]', level: 'anyone', description: "A watched county's latest weather report; alone, list the counties" },
  { name: 'approve', usage: 'approve [name or key]', level: 'admins', description: 'Approve a join request; alone, list them' },
  { name: 'backup', usage: 'backup', level: 'admins', description: "Back up the bot's data now" },
  { name: 'checkins', usage: 'checkins [page <n>]', level: 'admins', description: "Roll call: everyone's check-in, or missing" },
  { name: 'cleargroup', usage: 'cleargroup', level: 'users', description: 'Empty your emailall group' },
  { name: 'clearinbox', usage: 'clearinbox [all]', level: 'users', description: "Delete the messages you've read, or all of them" },
  { name: 'clearstatus', usage: 'clearstatus', level: 'admins', description: 'Delete every check-in' },
  { name: 'comm', usage: 'comm <message>', level: 'admins', description: 'Post a message to the communications channel, #contingency-comm' },
  { name: 'contact', usage: 'contact remove|path <name or key>', level: 'admins', description: 'Remove a contact from the radio (it asks first), or reset the path to it' },
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
  { name: 'radio', usage: 'radio', level: 'admins', description: "Show the radio's settings; change them from the web console only" },
  { name: 'reload', usage: 'reload', level: 'admins', description: 'Re-read the users file now' },
  { name: 'remove', usage: 'remove <name or key>', level: 'admins', description: 'Remove a user and their messages' },
  { name: 'resetpass', usage: 'resetpass <name or key>', level: 'admins', description: "Clear a user's forgotten passphrase" },
  { name: 'roster', usage: 'roster', level: 'admins', description: 'Who has messaged the node since it started' },
  { name: 'setemail', usage: 'setemail <name or key> qm [address] group [address ...]', level: 'admins', description: "Set a user's qm address and emailall group; a part with no address clears it" },
  { name: 'setpass', usage: 'setpass <passphrase>', level: 'users', description: 'Seal your messages with a passphrase' },
  { name: 'setqm', usage: 'setqm <address>', level: 'users', description: 'Set your qm address; alone, show it' },
  { name: 'status', usage: 'status <name or key>', level: 'anyone', description: "See someone's last check-in" },
  { name: 'testalert', usage: 'testalert', level: 'admins', description: 'Post the test message to the alert channel now' },
  { name: 'users', usage: 'users [page]', level: 'admins', description: 'List the users and what each has set' },
  { name: 'verse', usage: 'verse [book chapter:verse[-verse]]', level: 'anyone', description: 'A Bible verse, or the verse of the day' },
  { name: 'whoami', usage: 'whoami', level: 'users', description: 'What the node knows about you' },
  { name: 'whois', usage: 'whois <name or key>', level: 'admins', description: 'What the node knows about a user' },
  { name: 'wx', usage: 'wx <zipcode | county, ST>', level: 'anyone', description: 'Weather and alerts for a US zipcode or county' },
];

// The commands the app has screens for: it sends the node only these.
export const APP_COMMANDS = new Set([
  'addgroup', 'area', 'cleargroup', 'clearinbox', 'email', 'emailall', 'inbox', 'join', 'msg',
  'ok', 'qm', 'setpass', 'setqm', 'status', 'verse', 'whoami', 'wx',
]);

export interface Exchange {
  from: 'me' | 'node';
  text: string;
}

export type Frame = 'browser' | 'phone' | 'window';

export interface Shot {
  page: string;
  src: string;
  alt: string;
  // What it's shown in, when not the tour's own frame.
  frame?: Frame;
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
    body: "The Dashboard shows users, join requests, check-ins and messages waiting, the weather alerts out now, the node watch, the last backup, health, and a live log of what the bot does. The menu is laid out like the app's tabs, and in a window as narrow as a phone it becomes the app's tab bar.",
    shots: [
      { page: 'Dashboard', src: 'console/dashboard.png', alt: "The console's Dashboard: users, join requests, check-ins and messages tiles, then alerts, watch, backup and health, and the live log" },
      { page: 'In a narrow window', src: 'console/dashboard-phone.png', alt: 'The Dashboard in a phone-width window, with the tab bar along the bottom', frame: 'phone' },
    ],
  },
  {
    id: 'people',
    icon: 'users',
    label: 'Look after people',
    title: 'Your users, their check-ins, their mail',
    body: "Approve or deny join requests, look anyone up with Whois, set someone's qm address and email group for them, reset a forgotten passphrase or remove a user. See who has checked in and who hasn't, look up anyone's last check-in, and clear the roll call after an event. Mailbox shows who has messages waiting, from whom, read or sealed, never what they say, and leaves a message in anyone's inbox.",
    shots: [
      { page: 'Users', src: 'console/users.png', alt: 'The Users page: a join request with Approve and Deny, and each user with Whois, Edit emails, Reset passphrase and Remove' },
      { page: 'Check-ins', src: 'console/checkins.png', alt: "The Check-ins page: who has checked in, newest first, who hasn't, and a look-up" },
      { page: 'Mailbox', src: 'console/mailbox.png', alt: 'The Mailbox page: who has messages waiting and from whom, without their text, and Leave a message' },
    ],
  },
  {
    id: 'reach',
    icon: 'send',
    label: 'Channels & contacts',
    title: 'Post to the mesh, tend the radio’s contacts',
    body: "Contacts opens each of the radio's channels as a thread, with an unread count, and a box to post to it as the node: #contingency-wx, #contingency-comm or any other. Its Contacts tab lists every node the radio knows, with a filter, to reset a path or remove one the radio no longer needs.",
    shots: [
      { page: 'Channels', src: 'console/channels.png', alt: "The Contacts page's Channels tab: each channel with its last message and unread count" },
      { page: 'A channel', src: 'console/channel.png', alt: 'A channel thread with messages from the mesh and a box to post to it as the node' },
      { page: 'Contacts', src: 'console/contacts.png', alt: "The radio's contacts, each with its type, path and when it was last heard, with Reset path and Remove" },
    ],
  },
  {
    id: 'weather',
    icon: 'weather',
    label: 'Weather & verse',
    title: 'Every county you watch, and scripture',
    body: 'A card for each county you watch: the latest NWS reading, the next forecast periods and any alert, updated every 15 minutes and saying how old it is when the internet is down. Star your own to see them first; the rest wait under Show more. The weather for anywhere else, a test of the alert channel, and the Bible: the verse of the day, or any verse.',
    shots: [
      { page: 'Weather', src: 'console/weather.png', alt: 'The Weather page: a card for each watched county with current conditions, the forecast and any alert' },
      { page: 'Bible', src: 'console/bible.png', alt: 'The Bible page: the verse of the day and a box to look one up' },
    ],
  },
  {
    id: 'radio',
    icon: 'radio',
    label: 'Run the radio',
    title: 'The radio itself, over USB',
    body: "The Radio page shows the radio's name, frequency (with the MeshCore presets that match), TX power, position, clock and firmware, with a form to change each, or reboot it. A new frequency is set apart, and waits for you to type the node's name. Advertise the node nearby or across the mesh, and back up its data now.",
    shots: [{ page: 'Radio', src: 'console/radio.png', alt: "The Radio page: Advertise, Backup, and the radio's settings with a form to change each" }],
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

// The app's tabs, grouped by what a user is doing. Screenshots are from its
// demo build, on a pretend radio.
export const APP_TOUR: TourStop[] = [
  {
    id: 'connect',
    icon: 'radio',
    label: 'Connect',
    title: 'Your radio, then the node',
    body: "Connect the app to your own MeshCore radio over Bluetooth, or on a computer over a USB cable too: it shows the radio's name, battery and firmware, sets its clock from yours, and reconnects when the app opens. Pick the node from the radio's contacts, check whether you're a user, and Join with one press.",
    shots: [
      { page: 'Node', src: 'app/node.png', alt: "The app's Node tab: your radio's name, how it's connected, battery and firmware, and the node, with Check and Change node" },
      { page: 'On a computer', src: 'app/desktop-node.png', alt: "The desktop app's Node tab: Find my radio over Bluetooth, or Connect over USB", frame: 'window' },
    ],
  },
  {
    id: 'checkin',
    icon: 'check',
    label: 'Check in',
    title: 'One press to say you’re ok',
    body: "I'm ok, need help, need medical, sheltering in place, evacuating, no power, or your own words, confirmed before it goes. Look up anyone's last check-in, or your own.",
    shots: [{ page: 'Check-ins', src: 'app/checkins.png', alt: "The app's Check-ins tab: six quick check-ins, your own words, and a look-up" }],
  },
  {
    id: 'mail',
    icon: 'inbox',
    label: 'Mail',
    title: 'Your inbox and email, in your pocket',
    body: 'Open your inbox (with your passphrase, if you set one, never kept), page through it, clear what you’ve read, and leave a message for another user. Email your preset contact, your group or any address, confirmed first, since an email can’t be taken back.',
    shots: [
      { page: 'Mailbox', src: 'app/mailbox.png', alt: "The app's Mailbox tab: open your inbox, clear it, and leave a message for a user" },
      { page: 'Email', src: 'app/email.png', alt: "The app's Email screen: send to your preset contact, your group or an address, and your addresses" },
    ],
  },
  {
    id: 'chat',
    icon: 'chat',
    label: 'Chat',
    title: 'Talk to anyone on the mesh',
    body: "Direct messages with your radio's contacts, each marked delivered or not, and its channels, #contingency-wx and #contingency-comm among them, with unread counts. The history stays on your phone or computer until you clear it.",
    shots: [
      { page: 'Chats', src: 'app/chat.png', alt: "The app's Chat tab: chats with people, newest first, with an unread count" },
      { page: 'A chat', src: 'app/dm.png', alt: 'A direct message chat, each message marked delivered' },
      { page: 'Channels', src: 'app/channels.png', alt: "The Channels tab: #contingency-wx with the node's alert, Public and #contingency-comm" },
    ],
  },
  {
    id: 'weather',
    icon: 'weather',
    label: 'Weather & verse',
    title: 'Weather for your county, scripture offline',
    body: "A card for each county the node watches, from the reports it keeps every 15 minutes: star your own and they load whenever you open Weather. Any other zipcode or county too. The Bible tab has the verse of the day, asked once a day, and any verse you look up.",
    shots: [
      { page: 'Weather', src: 'app/weather.png', alt: "The app's Weather tab: starred county cards with conditions, wind, age and tonight's forecast, one with a Wind Advisory" },
      { page: 'On a computer', src: 'app/desktop-weather.png', alt: "The desktop app's Weather tab: two starred county cards side by side", frame: 'window' },
      { page: 'Another place', src: 'app/wx.png', alt: 'The weather and alerts for a zipcode, with a Flash Flood Warning' },
      { page: 'Bible', src: 'app/bible.png', alt: "The app's Bible tab: the verse of the day and a verse looked up" },
    ],
  },
  {
    id: 'radio',
    icon: 'sliders',
    label: 'Your radio',
    title: 'Your own radio’s settings',
    body: "Your radio's name, frequency, TX power, position, clock and battery; send an advert nearby or across the mesh; change its settings, or its frequency by MeshCore preset, which asks first and says how to go back. Remove a contact or reset the path to one.",
    shots: [{ page: 'Radio', src: 'app/radio.png', alt: "The app's Radio tab: your radio's name, frequency, TX power, position, clock, battery and firmware, and adverts" }],
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
  { page: 'Mailbox', button: 'Leave message', command: 'msg (Tom Becker) Water at the fire station until 4pm', reply: 'msg: saved for Tom Becker (3 in their inbox)' },
  { page: 'Check-ins', button: 'Clear check-ins', command: 'clearstatus', reply: 'clearstatus: cleared 4 statuses' },
  { page: 'Radio', button: 'Back up now', command: 'backup', reply: 'backup: 12 file(s) saved in ~/MeshContingencyBackups/20261022-091340; newest 7 kept' },
  { page: 'Weather', button: 'Post alert test', command: 'testalert', reply: 'testalert: posted to #contingency-wx; next weekly test Wed 5:00PM CDT' },
];

// App buttons and the commands they send the node, with the bot's replies.
export const APP_EQUIVALENTS: Equivalent[] = [
  { page: 'Node', button: 'Join', command: 'join', reply: 'join: request sent to the admins as Dana' },
  { page: 'Check-ins', button: 'Need help', command: 'ok need help', reply: 'ok: saved for Dana' },
  { page: 'Mailbox', button: 'Open inbox', command: 'inbox', reply: 'Erin just now: see you at the shelter' },
  { page: 'Email', button: 'My preset contact', command: 'qm on my way to the shelter', reply: 'qm: sent' },
  { page: 'Weather', button: 'Jones, TX ★', command: 'area Jones, TX', reply: 'Jones, TX ALERT: Wind Advisory | 70F, Windy | S25mph G40 | 5m ago' },
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
    body: 'Current conditions and active alerts for any US zipcode or county, straight from the National Weather Service. The node posts new alerts for the counties you watch to #contingency-wx by itself, with a weekly test so people know it works.',
    demo: [
      { from: 'me', text: 'help wx' },
      { from: 'node', text: 'wx <zipcode | county, ST> - Weather, precipitation and alerts for a US zipcode or county' },
      { from: 'me', text: 'wx Taylor, TX' },
      { from: 'node', text: 'Taylor, TX Clear, 0% precip 6h | 81F S11mph' },
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
    body: "Admins get a direct message when something goes wrong with the node (a low battery, the radio restarting, email failing) and when it's over. Its data is backed up every day, the radio's clock is set at each start, and admin actions are recorded with who did them and when. Its log keeps who ran which command, never what anyone wrote.",
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
    body: 'remove, resetpass, leave, contact remove, and a radio reboot or new frequency first say what they would do and wait for the same command again within 5 minutes. In the console, they wait for Confirm; the app asks before a check-in, an email or a new passphrase goes out.',
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
    body: "The web console, the radio's settings and contacts, adding and managing users, health and problem notices, backups, weather alerts, news and roll calls.",
    url: `${WIKI_URL}/Admin-Guide`,
  },
  {
    icon: 'radio',
    title: 'User Guide',
    body: 'Getting connected, joining, checking in, leaving messages, keeping them private, sending email.',
    url: `${WIKI_URL}/User-Guide`,
  },
  {
    icon: 'phone',
    title: 'App Guide',
    body: 'The app for phones and computers: installing it, connecting your radio, and every screen.',
    url: `${WIKI_URL}/App-Guide`,
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
  | { kind: 'app'; label: string; title: string; shot: Shot }
  | { kind: 'desktop'; label: string; title: string; shot: Shot }
  | { kind: 'radio'; label: string; title: string; device: string; demo: Exchange[] };

const demoOf = (icon: string) => FEATURES.find((f) => f.icon === icon)!.demo;
const shotOf = (page: string) => TOUR.flatMap((t) => t.shots).find((s) => s.page === page)!;
const appShotOf = (page: string) => APP_TOUR.flatMap((t) => t.shots).find((s) => s.page === page)!;

// The hero carousel: the operator's console, the app on a phone and a
// computer, and a radio user's screen, in turn.
export const HERO_SLIDES: Slide[] = [
  { kind: 'console', label: 'Web console', title: 'The whole node at a glance', shot: shotOf('Dashboard') },
  { kind: 'app', label: 'Phone app', title: 'Check in with one press', shot: appShotOf('Check-ins') },
  { kind: 'radio', label: 'On the radio', title: 'Weather with no internet on your end', device: 'Contingency node', demo: demoOf('weather') },
  { kind: 'console', label: 'Web console', title: 'Approve people as they join', shot: shotOf('Users') },
  { kind: 'desktop', label: 'Desktop app', title: 'Your radio on a USB cable', shot: { page: 'Node', src: 'app/desktop-node.png', alt: "The desktop app's Node tab: Find my radio over Bluetooth, or Connect over USB" } },
  { kind: 'radio', label: 'On the radio', title: 'Messages only you can open', device: 'Sealed inbox', demo: demoOf('lock') },
  { kind: 'console', label: 'Web console', title: 'Post to every channel as the node', shot: shotOf('A channel') },
  { kind: 'app', label: 'Phone app', title: 'Chat with anyone on the mesh', shot: appShotOf('A chat') },
  { kind: 'radio', label: 'On the radio', title: 'Email family off the mesh', device: 'Contingency node', demo: demoOf('mail') },
  { kind: 'desktop', label: 'Desktop app', title: 'Weather for your county, at your desk', shot: { page: 'Weather', src: 'app/desktop-weather.png', alt: "The desktop app's Weather tab: two starred county cards side by side" } },
];
