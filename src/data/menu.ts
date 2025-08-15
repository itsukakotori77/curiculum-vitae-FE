interface INavMenu {
  url: string
  name: string 
  aliases?: string
}

export const navMenu: INavMenu[] = [
  {
    url: '/',
    name: 'Home',
    aliases: 'home'
  },
  {
    url: '/about',
    name: 'About',
    aliases: 'home'
  },
  {
    url: '/faq',
    name: 'FAQ',
    aliases: 'faq'
  },
  {
    url: '/none',
    name: 'None',
    aliases: 'home'
  },
  {
    url: '/none',
    name: 'None',
    aliases: 'home'
  },
]