// Site copy and data, taken from the mesh-contingency README and wiki (1.0).

export const REPO_URL = 'https://github.com/DJSnitker/mesh-contingency';
export const WIKI_URL = `${REPO_URL}/wiki`;
export const MESHCORE_URL = 'https://github.com/meshcore-dev/MeshCore';
export const CONTACT_EMAIL = 'information@meshcontingency.com';
export const INSTALL_URL = 'https://raw.githubusercontent.com/DJSnitker/mesh-contingency/main/install.sh';

export interface Exchange {
  from: 'me' | 'node';
  text: string;
}

// The Public channel as a radio in range sees it: what the node posts by itself.
export const CHANNEL_DEMO: Exchange[] = [
  { from: 'node', text: 'Hilltop Node: Taylor, TX ALERT: Severe Thunderstorm Warning | until Tue 6:00PM | Taylor; Jones' },
  { from: 'node', text: 'Hilltop Node: Jones, TX ALERT: Flash Flood Warning | until Tue 9:15PM | Jones; Shackelford' },
  { from: 'node', text: 'Hilltop Node: TEST: this is a test of the weather alerts on this channel. No action needed.' },
  { from: 'node', text: 'Hilltop Node: Counties watched for alerts: Taylor, Jones' },
];

// An admin's direct messages with the node, from the wiki's Admin Commands page.
export const ADMIN_DEMO: Exchange[] = [
  { from: 'me', text: 'help' },
  { from: 'node', text: 'commands: alert, help, testalert. Send help <command> for usage' },
  { from: 'me', text: 'testalert' },
  { from: 'node', text: 'testalert: posted to Public; next weekly test Wed 5:00PM CST' },
  { from: 'me', text: 'alert Shelter open at First Baptist, 5th and Main' },
  { from: 'node', text: 'alert: posted to Public' },
];

export interface Command {
  name: string;
  usage: string;
  description: string;
  demo: Exchange[];
}

export const COMMANDS: Command[] = [
  {
    name: 'alert',
    usage: 'alert <message>',
    description: 'Posts the message, as typed, to the alert channel (Public unless you pick another). It must fit in one channel message: 133 characters, less the node’s name and “: ”. Too long, and nothing is posted.',
    demo: [
      { from: 'me', text: 'alert Shelter open at First Baptist, 5th and Main' },
      { from: 'node', text: 'alert: posted to Public' },
    ],
  },
  {
    name: 'testalert',
    usage: 'testalert',
    description: 'Posts the weekly test message and the counties watched, now. Use it after setting up the node, or after moving its antenna.',
    demo: [
      { from: 'me', text: 'testalert' },
      { from: 'node', text: 'testalert: posted to Public; next weekly test Wed 5:00PM CST' },
    ],
  },
  {
    name: 'help',
    usage: 'help [command]',
    description: 'Lists the commands you may use, or shows how to use one.',
    demo: [
      { from: 'me', text: 'help alert' },
      { from: 'node', text: 'alert <message> - Post a message to the Public channel' },
    ],
  },
];

export interface PostPart {
  part: string;
  meaning: string;
}

// What each part of an alert post is, from the wiki's Weather Alerts page.
export const POST_PARTS: PostPart[] = [
  { part: 'Hilltop Node:', meaning: 'The node’s radio name, added by MeshCore to every channel message.' },
  { part: 'Taylor, TX', meaning: 'The first of your counties the alert covers.' },
  { part: 'Severe Thunderstorm Warning', meaning: 'The NWS event.' },
  { part: 'until Tue 6:00PM', meaning: 'When it ends (or expires), in the node’s time zone.' },
  { part: 'Taylor; Jones', meaning: 'The areas the NWS lists, cut short to fit.' },
];

export interface Safeguard {
  title: string;
  body: string;
}

export const SAFEGUARDS: Safeguard[] = [
  {
    title: 'Checked by full key',
    body: 'A message carries only a 12-character key prefix, so the node checks the sender’s full 64-character key against its admins. Two contacts sharing an admin’s prefix get no rights.',
  },
  {
    title: 'Admins only from the file',
    body: 'Admins are set in config.toml on the node’s computer and nowhere else, never over the mesh, so a lost radio can’t make more. The bot warns if the file isn’t private to you.',
  },
  {
    title: 'Quiet to strangers',
    body: 'Anyone who isn’t an admin gets “unrecognized user or function”, whatever they send. The bot replies only to radios in its radio’s contacts, and in manual-add mode it adds only the admins’ radios.',
  },
  {
    title: 'Permissions and rate limits',
    body: 'Each command is admin, public or disabled, in one table. How often one radio may run commands is limited per level or per command, so nobody can tie up the node.',
  },
  {
    title: 'A log that keeps no text',
    body: 'Everything the bot does is in its journal, with names and command names but never what anyone wrote.',
  },
  {
    title: 'Never posts twice',
    body: 'What has been posted is kept in alerts.json, so a restart repeats nothing, and an alert several counties share is posted once. A filtered-out alert is remembered too, so loosening the filter doesn’t post old ones.',
  },
];

export interface Guide {
  icon: string;
  title: string;
  body: string;
  url: string;
}

// The wiki's pages for 1.0.
export const GUIDES: Guide[] = [
  {
    icon: 'terminal',
    title: 'Set Up a Node',
    body: 'Installing with one command, checking it, making yourself an admin, running it as a service, updating and removing it.',
    url: `${WIKI_URL}/Set-Up-a-Node`,
  },
  {
    icon: 'weather',
    title: 'Weather Alerts',
    body: 'Choosing counties, the severity and event filter, the weekly test, what a post looks like, and posting to a test channel.',
    url: `${WIKI_URL}/Weather-Alerts`,
  },
  {
    icon: 'shield',
    title: 'Admin Commands',
    body: 'alert, testalert and help, adding admins, and who may run what.',
    url: `${WIKI_URL}/Admin-Commands`,
  },
  {
    icon: 'sliders',
    title: 'Troubleshooting',
    body: 'What the installer and the log say, and what to do about it.',
    url: `${WIKI_URL}/Troubleshooting`,
  },
];

// Desktop wallpapers, served from resources/wallpapers (see its README).
export const WALLPAPERS = [
  {
    file: 'mesh-contingency-wallpaper-3840x1080',
    size: '3840 × 1080',
    fits: 'Two 1080p monitors, or a 32:9 ultrawide',
    note: 'The logo sits whole on the left screen; the mesh and its route fill the right.',
    svg: true,
  },
  {
    file: 'mesh-contingency-wallpaper-5120x1440',
    size: '5120 × 1440',
    fits: 'Two 1440p monitors, or a 32:9 super-ultrawide',
    note: 'The same design, drawn larger for sharper, bigger screens.',
    svg: false,
  },
  {
    file: 'mesh-contingency-wallpaper-1920x1080',
    size: '1920 × 1080',
    fits: 'One 16:9 screen',
    note: 'Logo in the middle, with a message’s route crossing below it.',
    svg: true,
    single: true,
  },
];
