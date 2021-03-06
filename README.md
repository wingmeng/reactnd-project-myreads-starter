# MyReads 图书跟踪应用

## 应用简介

MyReads 是一款图书跟踪应用，你可以用它搜索、预览来自全球各地图书馆和出版商的千百万册图书，并挑选你喜欢的图书加入到自己的阅读计划中

## 应用安装及部署

- 克隆或下载本项目
- 使用 `npm install` 安装所有项目依赖项
- 使用 `npm start` 启动开发服务器
- 使用 `npm run build` 打包发布项目

> 如你安装了 Yarn，可使用 `yarn` 来代替上述代码中的 `npm`

## 开始使用

  应用共包含两个栏目：

  1. **阅读计划：** 包含“Currently Reading（正在阅读）”、“Want to Read（想要阅读）”和“Read（已读）”三个书架以及对应的图书，每本图书右下角有一个控件，你可以根据实际需要变更图书的所在书架，或从阅读计划里移除图书。
  2. **图书搜索：** 通过点击 **阅读计划** 页面右下角的“+”号图标可进入本栏目。你可通过键入关键词来搜索图书，并可将搜索结果里的图书加入阅读计划相关分类。

  > 重要提示：图书搜索功能仅限于搜索一组特定的字词，本项目支持的搜索关键词请参照 [SEARCH_TERMS.md](SEARCH_TERMS.md)。
