import {
  ArchiveIcon,
  BanIcon,
  FlagIcon,
  InboxIcon,
  PencilAltIcon,
  UserCircleIcon
} from '@heroicons/react/outline';

export const USER = {
  name: 'Whitney Francis',
  email: 'whitneyfrancis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
};
export const NAVIGATION = [
  {
    name: 'Inboxes',
    href: '#',
    children: [
      { name: 'Technical Support', href: '#' },
      { name: 'Sales', href: '#' },
      { name: 'General', href: '#' }
    ]
  },
  { name: 'Reporting', href: '#', children: [] },
  { name: 'Settings', href: '#', children: [] }
];
export const SIDE_BAR_NAVIGATION = [
  { name: 'Open', href: '#', icon: InboxIcon, current: true },
  { name: 'Archive', href: '#', icon: ArchiveIcon, current: false },
  { name: 'Customers', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Flagged', href: '#', icon: FlagIcon, current: false },
  { name: 'Spam', href: '#', icon: BanIcon, current: false },
  { name: 'Drafts', href: '#', icon: PencilAltIcon, current: false }
];
export const USER_NAVIGATION = [
  { name: 'Your Profile', href: '#' },
  { name: 'Sign out', href: '#' }
];

// export const COLUMNS_INFOS = [
//   { columnId: 1, title: 'À faire', description: 'Les cartes à faire' },
//   { columnId: 2, title: 'En cours', description: 'Les cartes en cours' },
//   { columnId: 3, title: 'En test', description: 'Les cartes en tests' },
//   { columnId: 4, title: 'Terminé', description: 'Les cartes en terminées' }
// ];

export const COLUMNS_TICKETS = [
  {
    columnId: 1,
    title: 'À faire',
    ticket: [
      { name: 'Premier ticket', description: 'Ceci est le premier ticket' },
      { name: 'Deuxieme Ticket', description: 'Ceci est le deuxieme ticket' }
    ]
  },
  {
    columnId: 2,
    title: 'En cours',
    ticket: [
      { name: 'Troisième ticket', description: 'Ceci est le troisièmeticket' }
    ]
  },
  {
    columnId: 3,
    title: 'En test',
    ticket: [
      { name: 'Quatrieme ticket', description: 'Ceci est le Quatrieme ticket' }
    ]
  },
  {
    columnId: 4,
    title: 'Terminé',
    ticket: [
      { name: '7', description: 'test 1' },
      { name: '9', description: 'test 12' },
      { name: '11', description: 'test 231' },
      { name: '12', description: 'test 1342' },
      { name: '12', description: 'test 12453' }
    ]
  }
];
