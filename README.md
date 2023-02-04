# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)


```yaml
name: violet_blog CI
on:
  push:
    branches: [ master ] #监听master分支的push事件
  pull_request:
    branches: [ master ]
jobs:
  build:
    runs-on: ubuntu-latest #指定运行环境为最新的Ubuntu版本
    strategy:
      matrix:
        node-version: [16.14.0] #指定node版本
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }} #使用action安装node环境
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm install #安装项目依赖
    - run: npm run build #build项目
    - name: ssh scp ssh pipelines #使用市场找到的action来将项目build的产物传到我的服务器
      uses: cross-the-world/ssh-scp-ssh-pipelines@latest
      env:
        WELCOME: "ssh scp ssh pipelines"
        LASTSSH: "Doing something after copying"
      with:
        host: ${{ secrets.LDD_SERVER_IP }} # 服务器的ip
        user: ${{ secrets.LDD_SERVER_NAME }} # 服务器的账号
        pass: ${{ secrets.LDD_SERVER_PASSWORD }} # 服务器的密码
        connect_timeout: 10s
        first_ssh: | #这部分是在服务器上，传输文件前执行的命令，关闭并删除运行中的旧版本
          pm2 delete all
          cd /project/ldd-rms-backend
          rm -rf dist
        scp: | #将build生成的文件从GitHub服务器的相应目录，传到我服务器的相应目录
          ./dist => /project/ldd-rms-backend
          ./package.json => /project/ldd-rms-backend
          ./yarn.lock => /project/ldd-rms-backend
        last_ssh: | #这部分是在服务器上，传输文件后执行的命令，新版本重新安装依赖并运行
          cd /project/ldd-rms-backend
          yarn
          pm2 start ./dist/main.js
```