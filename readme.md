# React SSR 

## features:

- 基于 next.js 框架实现 ssr
- 一键生成离线包资源
- 使用 plop 根据模板自动生成代码

## 项目目录结构

```
|- node_modules·····················公共三方依赖包
|- packages·························存放离线包的文件夹
|- plop-templates···················plop 脚手架模板文件
|- projects·························h5项目文件夹
|- scripts··························npm命令脚本文件夹
    |- lib···························命令脚本依赖的工具库
        |- aliyun.js················ailiyun oss 上传工具
    |- offline_package.js···········离线包打包脚本
|- utils····························h5项目依赖的公共工具库
|- .gitignore
|- package.json
|- plopfile.js······················plop 脚手架配置文件
|- readme.md                
```

## 创建项目

```
npm run new
# or
yarn new
```

## 打包

```
npm run package -- --project=xxx
# or
yarn package -- --project=xxx
```

打包完成后，.zip 文件会出现在 /packages/{projectName}/offline-package.zip

## 附录

离线包方案:

> https://github.com/mcuking/blog/issues/63