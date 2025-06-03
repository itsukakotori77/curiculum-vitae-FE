import type { NextConfig } from "next";
import { transformerCompileClass, transformerVariantGroup } from "unocss";
import UnoCSS from 'unocss/webpack'

const nextConfig: NextConfig = {
  webpack(config) {
    config.plugins.push(
      UnoCSS({
        transformers: [
          transformerCompileClass(),
          transformerVariantGroup(),
        ],
      }),
    )
    config.resolve.alias = {
      ...config.resolve.alias,
      'uno.css': '@/assets/styles/uno.css',
    }
    return config
  },
};

export default nextConfig;
