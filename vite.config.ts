import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const isGitHubActions =
  process.env.GITHUB_ACTIONS ===
  'true'

const githubRepository =
  process.env.GITHUB_REPOSITORY

const githubPagesBase =
  isGitHubActions &&
  githubRepository
    ? `/${githubRepository.split('/')[1]}/`
    : '/'

export default defineConfig({
  base: githubPagesBase,

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})