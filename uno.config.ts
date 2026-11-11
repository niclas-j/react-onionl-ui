import { defineConfig } from 'unocss'
import { onionlUIPreset } from './preset'

export default defineConfig({
  presets: [onionlUIPreset()],
  content: { pipeline: { include: [/\.(tsx?|html)($|\?)/] } },
})
