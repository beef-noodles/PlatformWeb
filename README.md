# Summit Web FrameWork

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Node版本

|序号|名称|说明|
|:--:|--|--|
|1|Node|^10|

## 获取

```shell
$ git clone -b summitWeb git@github.com:beef-noodles/PlatformWeb.git
...
```

## 安装依赖

```shell
# use npm
$ cd PlatformWeb && npm install
# use yarn
$ cd PlatformWeb && yarn install
```

## 启动

```shell
$ yarn dev
...
```

## 生产

```shell
$ yarn build
...
```

## 图标库

**[react-icon](https://react-icons.netlify.com/#/)**： 已集成[Font Awesome](ttps://fontawesome.com/ ), [Ionicons](https://ionicons.com/), [Material Design icons](http://google.github.io/material-design-icons/ ), [Typicons](http://s-ings.com/typicons/), [Github Octicons icons](https://octicons.github.com/ ),[Feather](https://feathericons.com/ )

## 别名引用

> 为节省组件目录搜索，已将**src**目录下的文件夹做了映射

### 之前

```typescript
// ./src/test/index.tsx
import AjaxTest from '../../components/Ajax'
```

### 之后

```typescript
// ./src/test/index.tsx
import AjaxTest from '@components/Ajax'
```

## 新特性

**[react-draggable](https://www.npmjs.com/package/react-draggable)**: 可拖动的React容器组件
**[classnames](https://www.npmjs.com/package/classnames)**: 方便在组件中控制样式, 使用[1](https://www.cnblogs.com/kugeliu/p/7339160.html), [2](https://www.npmjs.com/package/classnames)

## 支持环境

* IE>9
* Edge>=15
* Chrome>=57
* FireFox>=55