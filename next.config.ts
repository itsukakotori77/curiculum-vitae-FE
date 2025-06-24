import type { NextConfig } from 'next'
import UnoCSS from 'unocss/webpack'
import unocssConfig from './unocss.config'

const nextConfig: NextConfig = {
  // webpack(config) {
  //   config.plugins.push(UnoCSS(unocssConfig))
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     'uno.css': '@/assets/styles/globals.css',
  //   }
  //   return config
  // }
}

export default nextConfig
