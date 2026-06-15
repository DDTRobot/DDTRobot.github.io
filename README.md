# DDTRobot.github.io

DDTRobot 开源社区与文档站点，基于 [Docusaurus 3](https://docusaurus.io/) + TypeScript。

讨论与评论由 [GitHub Discussions](https://github.com/DDTRobot/community/discussions) 承载，通过 [giscus](https://giscus.app) 嵌入到文档页底部。

## 本地开发

```powershell
npm install
npm start            # http://localhost:3000/
```

`npm start` 不会渲染英文 locale。如需预览英文站，使用：

```powershell
npm start -- --locale en
```

## 构建

```powershell
npm run build        # 产物在 build/
npm run serve        # 本地预览构建产物
```

## 目录结构

```
docs/                文档（Markdown / MDX）
src/
  components/Giscus  giscus 评论组件，跟随站点主题切换 light/dark_dimmed
  pages/index.tsx    首页落地
  pages/community.tsx 社区入口页（跳转到 Discussions 各分类）
  theme/             swizzle 覆盖：在文档页底部注入 giscus
i18n/                多语言翻译（zh-Hans 默认 + en）
.github/workflows/   GitHub Actions：push 到 main 自动部署
```

## 部署

每次 push 到 `main` 分支，`.github/workflows/deploy.yml` 会自动构建并发布到 GitHub Pages。

**首次启用前**需在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。

## 评论配置

评论数据写入 [DDTRobot/community](https://github.com/DDTRobot/community) 的 Discussions `Comments` 分类。giscus 配置位于 [src/components/Giscus/index.tsx](src/components/Giscus/index.tsx)，如需更换分类或改语言，修改这里的 `categoryId`、`category`、`lang` 即可。
