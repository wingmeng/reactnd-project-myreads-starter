# MyReads 项目

## 立即开始

- 使用 `npm install` 安装所有项目依赖项
- 使用 `npm start` 启动开发服务器

> 如你安装了 Yarn，可使用 `yarn` 来代替上述代码中的 `npm`

## 文件结构

```bash
├── README.md # 该文件。
├── SEARCH_TERMS.md # 可用于搜索字词的白名单简短集合
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
└── src
    ├── App.css # APP 风格样式文件
    ├── App.js # app 主文件
    ├── App.test.js # 测试文件
    ├── BooksAPI.js # 后端 JavaScript API (by Udacity)
    ├── booksItem.js # 生成书籍列表项
    ├── listBooks.js # 分类展示书籍列表
    ├── searchBooks.js # 书籍搜索
    ├── icons # 应用程序的图片
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # 通用风格
    └── index.js # 入口文件
```

## 重要提示

后端 API 使用一组固定的缓存搜索结果，仅限于一组特定的搜索字词，可以在[SEARCH_TERMS.md](SEARCH_TERMS.md)中找到。 这个术语列表是与后端一起使用的_only_术语，所以如果你对“Basket Weaving”或“Bubble Wrap”的搜索没有任何结果返回，请不用惊讶。

## 构建 React 应用程序

该项目由 [Create React App](https://github.com/facebookincubator/create-react-app) 引导创建
