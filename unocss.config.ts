import { defineConfig, presetUno, presetTypography, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), 
    presetTypography(), 
    presetIcons({
      collections: {
        // Example: npm install -D @iconify-json/heroicons
        heroicons: () => import('@iconify-json/heroicons/icons.json').then((i) => i.default),
      },
    }),
  ],

  // Custom rules
  rules: [
    // Example custom rule
    ['custom-shadow', { 'box-shadow': '0 0 10px rgba(0,0,0,0.1)' }],
  ],

  // Shortcuts for common patterns
  shortcuts: {
    btn: 'px-4 py-2 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    'btn-primary': 'btn bg-blue-600 hover:bg-blue-700',
    card: 'bg-white rounded-lg shadow-md p-6',
  },

  // Theme customization
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
  },

  // Content sources for purging
  content: {
    filesystem: [
      'app/**/*.{js,ts,jsx,tsx}',
      'pages/**/*.{js,ts,jsx,tsx}',
      'components/**/*.{js,ts,jsx,tsx}',
      'src/**/*.{js,ts,jsx,tsx}',
    ],
  },

  // Extract classes from these file types
  extractors: [
    (content: any) => {
      return content.match(/[A-Za-z0-9_-]+/g) || []
    },
  ],
})
