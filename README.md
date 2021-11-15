# 开始

- 安装依赖 yarn
- 本地 yarn serve(dev) 或 yarn serve stage(测试)

# 打包

- bulid-stage 测试环境
- build 生产环境

# 分支

- master 主网
- stage-prd 测试分支
- farms 挖矿

# 注意

.env 文件修改一定要慎重

- .env 所有环境公用变量
- .env.development 本地开发环境变量
- .env.production 生产环境打包（一定要慎重修改！！！）
- .env-stagedev 本地开发使用， 测试环境数据
- .env-stageprod 测试环境使用，生产数据和生产环境变量打包
- 链上交互会存在区块高度不一致、丢区块等问题。排查问题时，优先查看是否区块请求是否正常。

# TODO

- CI/CD
- 迁移

# 记错事项

- 页面白屏 控制台报错 unpected token : <

比对请求文件，发现报错的机器请求的 js 文件并不是最新的 build 文件。
js 本身已带 hash 保持唯一性，因为是 cdn(couldflare)缓存导致。

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
// https://zhuanlan.zhihu.com/p/349260482
// config.plugin("loadshReplace").use(new LodashModuleReplacementPlugin());
// 使用lodash-webpack-plugin会出问题
```
