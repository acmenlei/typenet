# typenet

<div style="font-size: 1.5rem;">
  <a href="./README.md">中文</a> |
  <a href="./README.en.md">English</a>
</div>

## 介绍

实现 web 打字机效果，支持链式调用，使用简单方便，详情你可以查看[在线演示](http://acmenlei.github.io/typenet/docs).

## 使用

### 下载

#### npm

```shell
npm install typenet
```

#### pnpm

```shell
pnpm install typenet
```

#### yarn

```shell
yarn add typenet
```

### 在项目中使用

#### 基本使用

```ts
import Typenet from "typenet"

new Typenet("#app", [options])
  .sleep(300)
  .type("I am a web ", [options])
  .sleep(300)
  .type("typing", { style: "color: red;" })
  .type(" plugin.")
  .start()
```

### options 参数介绍

| property name | type   | default value | meaning                                                 |
| ------------- | ------ | ------------- | ------------------------------------------------------- |
| speed         | number | 100           | 单位为毫秒，用于控制文本的速度，如打字速度、移动速度等. |
| style         | string | none          | 编写格式与 DOM 元素中的 style 写法保持一致              |

### API 介绍

在`构造函数(Typenet)`中配置的`options`将被视为公共的，若调用`API`时不传入`options`那么将使用构造函数中的`options`. 最后请调用`start`方法启动整个流程. 目前支持 `remove`、`type`、`sleep`、`start`、`move`、`line` 等方法的链式调用，持续维护...

#### type

输出文字，`type(text: string, [options])`

```ts
new Typenet("#app", [options]).type("i am typenet!").start()
```

#### remove

删除文字内容，`remove(characters: number, [options])`

```ts
new Typenet("#app", [options])
  .type("i am typenet!")
  .remove(1) // 删除一个字符 最终得到 "i am typenet"
  .start()
```

#### move

移动光标所在位置，`move(characters: number, [options])`，`characters`可为正数（向右移动）和负数（向左移动）.

```ts
new Typenet("#app", [options]).type("i am typenet!").move(5).start()
```

#### sleep

停止输出文字，`sleep(time: number)`，参数为毫秒.

```ts
new Typenet("#app", [options])
  .sleep(2000)
  .type("i am typenet!") // 将等待两秒后输出
  .start()
```

#### line

换行，`line()`.

```ts
new Typenet("#app", [options])
  .sleep(2000)
  .type("i am typenet!") // 将等待两秒后输出
  .line()
  .type("thank you!") // 将换行继续输出此输出
  .start()
```

## 演示 Demo

todo...

## 常见问题

todo...

## 参与贡献

贡献之前请先阅读[贡献指南](./CONTRIBUTING.md)

## 赞助

如果你觉得这个项目对你有帮助，并且情况允许的话，可以给我一点点支持，总之非常感谢支持～

<div style="display: flex; gap: 20px;">
	<div style="text-align: center">
		<p>WeChat</p>
		<img style="width: 165px; height: 165px" src="./docs/wechat.jpg" alt="微信" />
	</div>
	<div style="text-align: center">
		<p>Alipay</p>
		<img style="width: 165px; height: 165px" src="./docs/alipay.jpg" alt="支付宝" />
	</div>
</div>

## License

MIT © [coderlei](./license)
