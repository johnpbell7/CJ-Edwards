import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages deployment from johnpbell7/CJ-Edwards
// If deploying to a user/project site, base should be '/CJ-Edwards/'
// If using a custom domain or a user.github.io repo, set to '/'
export default defineConfig({
  plugins: [react()],
  base: '/CJ-Edwards/',
})
