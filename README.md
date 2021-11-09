# 开始

- 安装依赖 yarn
- 本地 yarn serve(dev) 或 yarn serve stage(测试)

# 打包

- bulid-stage 测试环境
- build 生产环境

# 分支

- master 主网
- stage-prd 测试分支

# 注意

.env 文件修改一定要慎重

- .env 所有环境公用变量
- .env.development 本地开发环境变量
- .env.production 生产环境打包（一定要慎重修改！！！）
- .env-stagedev 本地开发使用， 测试环境数据
- .env-stageprod 测试环境使用，生产数据和生产环境变量打包

# todo

- build 后 Loading chunk {n} failed

```js
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    window.location.reload();
    // router.replace(router.history.pending.fullPath);
  } else {
    console.log(error);
  }
});
```

- lodash build 后报错

```js
// config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
// t is not a function 怀疑是和 vue-i18n 冲突
```
