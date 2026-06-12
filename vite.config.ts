import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const isGitHubActions =
  process.env.GITHUB_ACTIONS ===
  'true'

const isNativeBuild =
  process.env.VITE_BUILD_TARGET ===
  'native'

const githubRepository =
  process.env.GITHUB_REPOSITORY

const githubPagesBase =
  isGitHubActions &&
  githubRepository
    ? `/${githubRepository.split('/')[1]}/`
    : '/'

const appBase =
  isNativeBuild
    ? './'
    : githubPagesBase

export default defineConfig({
  base: appBase,

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})