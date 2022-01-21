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
      { name: 'Premier ticket', description: '' },
      {
        name: 'Deuxieme Ticket',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis.'
      }
    ]
  },
  {
    columnId: 2,
    title: 'En cours',
    ticket: [
      {
        name: 'Troisième ticket',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis.'
      }
    ]
  },
  {
    columnId: 3,
    title: 'En test',
    ticket: [
      {
        name: 'Quatrieme ticket',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis.'
      }
    ]
  },
  {
    columnId: 4,
    title: 'Terminé',
    ticket: [
      {
        name: '7',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis. '
      },
      {
        name: '9',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis.'
      },
      {
        name: '11',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis.'
      },
      {
        name: '12',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis.'
      },
      {
        name: '12',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eros tellus, tincidunt ut ex quis, dapibus lobortis metus. Aliquam id odio venenatis, efficitur erat eu, tincidunt sapien. Nulla efficitur, massa et varius eleifend, purus justo cursus risus, sed malesuada eros augue semper augue. Nulla et mi sagittis, pretium lacus quis.'
      }
    ]
  }
];
