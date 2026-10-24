# DUSKBIT 设计资料交接包

本包为 **2026-10-23** 整理的 Claude Code 设计上下文。目标是让 CC 掌握最新约束，同时发挥设计判断，而不是复刻现有 HTML。

## 给 Claude Code 的使用方式

把本文件夹放在当前 React 官网项目附近或项目目录的临时参考位置，在该 React 项目的 Claude Code 会话中输入：

> 请阅读交接目录的 `CLAUDE_CODE_PROMPT.md`、`DESIGN_CONTEXT.md`、`ASSET_INDEX.md`，结合我当前 React 仓库实际代码，先提出设计方案、不要马上改代码。

具体完整任务写在 `CLAUDE_CODE_PROMPT.md`。

## 快速定位

- **直接任务说明**：`CLAUDE_CODE_PROMPT.md`
- **全量品牌 + 官网决策 + 最新动画变更 + 产品背景**：`DESIGN_CONTEXT.md`
- **原始素材索引与未收录说明**：`ASSET_INDEX.md`
- **最新风格参考**：`source_assets/duskbit-personal-swiss.html`
- **当前 Logo 构造器**：`source_assets/duskbit-logo-construction.html`
- **Logo 矢量抽取**：`derived_reference/`
- **旧版风格/图形探索**：`source_assets/` 其他文件

## 最重要的最新变化

**最终开场方向已经从“括号向两侧退场，橙方块放大盖屏”更改为“以橙色方点为中心，中括号非线性旋转扩大并交错穿越，再通过蒙版显露页面”。**

**页面视觉已确定走个性化瑞士风：不要奶油色；要视觉表达，不要靠文字自我描述；导航仅产品和关于；React SPA、深浅色；要表现 Feedra 前身。**

## 不包含的内容

- 真实 React SPA 工程代码、部署配置和 Git 历史（未接入此交接会话）。
- 11 张无法导出原始字节的较早期探索图（在 `ASSET_INDEX.md` 记录）。

全部能合法访问到原始字节的 28 份设计素材均原样放在 `source_assets/`，外加 2 份从最近 HTML 当前图形原样衍生的透明 SVG。
