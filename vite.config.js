
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),react()
  ],
  base: "/Currency_Conventer/", // WICHTIG für GitHub Pages (falls du es nutzt)
})
