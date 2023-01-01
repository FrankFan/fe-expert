#!/usr/bin/bash

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 上传到服务器
scp -r dist root@103.210.237.111:/data/fe-h5
