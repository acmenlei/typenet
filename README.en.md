# typenet

<div style="font-size: 1.5rem;">
  <a href="./README.md">中文</a> |
  <a href="./README.en.md">English</a>
</div>

## Introduction

web typewriter effect, support chain call, easy to use. You can check out the [online demo](http://acmenlei.github.io/typenet/docs) for details.

## Use

### Download

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

### Used in the project

#### Basic use

```ts
import Typenet from "typenet"

new Typenet("#app", [options])
  .sleep(300)
  .type("I am a web ", [options])
  .sleep(300)
  .type("typing", { style: "color: red; " })
  .type(" plugin.")
  .start()
```

### options Describes the parameters

| property name | type   | default value | meaning                                                                                                      |
| ------------- | ------ | ------------- | ------------------------------------------------------------------------------------------------------------ |
| speed         | number |               | units for 100 milliseconds, is used to control the speed of text, such as typing speed, movement speed, etc. |
| style         | string | none          | writing format and style of DOM elements consistent writing                                                  |

### API introduction

options configured in the constructor (Typenet) will be considered public, and options in the constructor will be used if the API is called without options. Finally, call the 'start' method to start the whole process. Currently support 'remove', 'type', 'sleep', 'start', 'move', 'line' and other methods of chain call, continuous maintenance...

#### type

Print the text, 'type(text: string, [options])'

```ts
new Typenet("#app", [options]).type("i am typenet! ").start()
```

#### remove

remove(characters: number, [options]) '

```ts
new Typenet("#app", [options])
  .type("i am typenet! ")
  .remove(1) // Remove a character and get "i am typenet"
  .start()
```

#### move

move(characters: number, [options]), 'move(characters: number, [options])', 'characters' can be positive (move to the right) and negative (move to the left).

```ts
new Typenet("#app", [options]).type("i am typenet! ").move(5).start()
```

#### sleep

To stop printing text, 'sleep(time: number)' takes milliseconds.

```ts
new Typenet("#app", [options])
  .sleep(2000)
  .type("i am typenet! ") // will wait two seconds before output
  .start()
```

#### line

line feed, 'line()'.

```ts
new Typenet("#app", [options])
  .sleep(2000)
  .type("i am typenet! ") // will wait two seconds before output
  .line()
  .type("thank you! ") // Continues this output with a newline
  .start()
```

## Demo

todo...

## Frequently Asked Questions

todo...

## Get involved and contribute

Please read the [CONTRIBUTING Guide](./CONTRIBUTING.md) before contributing.

## Sponsorship

If you think this project is helpful to you and circumstances permit, you can give me a little support. In short, thank you very much for your support ~

<div style="display: flex; gap: 20px;" >
<div style="text-align: center">
<p>WeChat</p>
<img style="width: 165px; height: 165px" src="./docs/wechat.jpg "alt=" wechat" />
</div>
<div style="text-align: center">
<p>Alipay</p>
<img style="width: 165px; height: 165px" src="./docs/alipay.jpg "alt=" alipay" />
</div>
</div>

## License

MIT © [coderlei](./license)
