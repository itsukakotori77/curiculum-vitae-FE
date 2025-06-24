import {
  defineConfig,
  presetUno,
  presetTypography,
  presetIcons,
  transformerVariantGroup,
  transformerCompileClass,
  presetWind4,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetIcons({
      collections: {
        heroicons: () => import('@iconify-json/heroicons/icons.json').then((i) => i.default),
      },
    }),
    presetWind4(),
  ],
  rules: [],
  transformers: [
    transformerVariantGroup(),
    transformerCompileClass({
      classPrefix: 'c-',
      alwaysHash: true,
      keepUnknown: true,
      trigger: ':uno:',
      // trigger: /(["'`])(?<name>[a-zA-Z0-9-_:]+)?:\s([^\\1]*?)\1/g,
    }),
  ],
  content: {
    filesystem: [
      'app/**/*.{js,ts,jsx,tsx}',
      'pages/**/*.{js,ts,jsx,tsx}',
      'components/**/*.{js,ts,jsx,tsx}',
      'src/**/*.{js,ts,jsx,tsx}',
    ],
  },
  extractors: [
    (code: any) =>
      [...code.matchAll(/class(Name)?=["'`]([^"']+)["'`]/g)].flatMap((m) => m[2].split(/\s+/)),
  ],
})
