import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//base points to the name of the repository
export default defineConfig({
  base: "/3d-portfolio",
  plugins: [react()],
})
