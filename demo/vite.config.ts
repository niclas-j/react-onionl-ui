import { defineConfig, mergeConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { fileURLToPath, URL } from 'node:url'
import base from '../vite.config'

export default mergeConfig(base, defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [UnoCSS({ configFile: fileURLToPath(new URL('../uno.config.ts', import.meta.url)) })],
}))
