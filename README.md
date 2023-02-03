# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


```yaml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - name: Install Dependencies
      run: npm install --legacy-peer-deps
    - name: Build
      run: npm run build
    - name: Deploy to Server
      uses: cross-the-world/ssh-scp-ssh-pipelines@latest
      env:
        WELCOME: "ssh scp ssh pipelines"
        LASTSSH: "Doing something after copying"
      with:
        host: ${{ secrets.SERVER_IP }}
        user: ${{ secrets.SERVER_USERNAME }}
        pass: ${{ secrets.SERVER_PASSWORD }}
        connect_timeout: 10s
        first_ssh: |
          cd /data/nginx/html
          rm -rf ./index.html ./index.html.gz ./css ./js
        scp: |
          ./dist/* => /data/nginx/html
        last_ssh: |
          ls
```