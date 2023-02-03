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
    - name: Deploy to Server ${{ secrets.SERVER_IP }}
      uses: cross-the-world/ssh-scp-ssh-pipelines@latest
      env:
        WELCOME: "ssh scp ssh pipelines"
        LASTSSH: "Doing something after copying"
      with:
        host: ${{ secrets.SERVER_IP }} # 服务器的ip
        user: ${{ secrets.SERVER_USERNAME }} # 服务器的账号
        pass: ${{ secrets.SERVER_PASSWORD }} # 服务器的密码
        connect_timeout: 10s
        first_ssh: | #这部分是在服务器上，传输文件前执行的命令，关闭并删除运行中的旧版本
          cd /data/nginx/html
          rm -rf ./index.html ./index.html.gz ./css ./js
        scp: | #将build生成的文件从GitHub服务器的相应目录，传到我服务器的相应目录
          ./dist => /data/nginx/html
        last_ssh: | #这部分是在服务器上，传输文件后执行的命令，新版本重新安装依赖并运行
          ls
          cd ./js
          ls
          cd ../css
          ls
```