export interface MessageModel {
  user: number
  type: 'in' | 'out'
  text: string
  time: string
  template?: boolean
}

export interface UserInfoModel {
  initials?: { label: string; state: 'warning' | 'danger' | 'primary' | 'success' | 'info' }
  avatar?: string
  email: string
  position: string
  online: boolean,
  first_name: string
}

const defaultUserInfos: Array<UserInfoModel> = [
  {
    first_name: 'Archeota AI',
    avatar: 'avatars/blank.png',
    email: 'support@archeota.com',
    position: 'Asistente Virtual',
    online: true,
  },
  {
    first_name: 'Ethan Wilder',
    avatar: 'avatars/blank.png',
    email: 'ethan@loop.com.au',
    position: 'Accountant',
    online: true,
  },
]


export interface AlertModel {
  title: string
  description: string
  time: string
  icon: string
  state: 'primary' | 'danger' | 'warning' | 'success' | 'info'
}

const defaultAlerts: Array<AlertModel> = [
  {
    title: 'Project Alice',
    description: 'Phase 1 development',
    time: '1 hr',
    icon: 'icons/duotune/technology/teh008.svg',
    state: 'primary',
  },
  {
    title: 'HR Confidential',
    description: 'Confidential staff documents',
    time: '2 hrs',
    icon: 'icons/duotune/general/gen044.svg',
    state: 'danger',
  },
  {
    title: 'Company HR',
    description: 'Corporeate staff profiles',
    time: '5 hrs',
    icon: 'icons/duotune/finance/fin006.svg',
    state: 'warning',
  },
  {
    title: 'Project Redux',
    description: 'New frontend admin theme',
    time: '2 days',
    icon: 'icons/duotune/files/fil023.svg',
    state: 'success',
  },
  {
    title: 'Project Breafing',
    description: 'Product launch status update',
    time: '21 Jan',
    icon: 'icons/duotune/maps/map001.svg',
    state: 'primary',
  },
  {
    title: 'Banner Assets',
    description: 'Collection of banner images',
    time: '21 Jan',
    icon: 'icons/duotune/general/gen006.svg',
    state: 'info',
  },
  {
    title: 'Icon Assets',
    description: 'Collection of SVG icons',
    time: '20 March',
    icon: 'icons/duotune/art/art002.svg',
    state: 'warning',
  },
]
export interface LogModel {
  code: string
  state: 'success' | 'danger' | 'warning'
  message: string
  time: string
}

const defaultLogs: Array<LogModel> = [
  { code: '200 OK', state: 'success', message: 'New order', time: 'Just now' },
  { code: '500 ERR', state: 'danger', message: 'New customer', time: '2 hrs' },
  { code: '200 OK', state: 'success', message: 'Payment process', time: '5 hrs' },
  { code: '300 WRN', state: 'warning', message: 'Search query', time: '2 days' },
  { code: '200 OK', state: 'success', message: 'API connection', time: '1 week' },
  { code: '200 OK', state: 'success', message: 'Database restore', time: 'Mar 5' },
  { code: '300 WRN', state: 'warning', message: 'System update', time: 'May 15' },
  { code: '300 WRN', state: 'warning', message: 'Server OS update', time: 'Apr 3' },
  { code: '300 WRN', state: 'warning', message: 'API rollback', time: 'Jun 30' },
  { code: '500 ERR', state: 'danger', message: 'Refund process', time: 'Jul 10' },
  { code: '500 ERR', state: 'danger', message: 'Withdrawal process', time: 'Sep 10' },
  { code: '500 ERR', state: 'danger', message: 'Mail tasks', time: 'Dec 10' },
]

export { defaultUserInfos, defaultAlerts, defaultLogs }
