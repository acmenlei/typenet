/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// 睡眠
function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
// 创建文本节点
function createTextNode(text) {
    return document.createTextNode(text);
}
// 创建元素节点并设置文本内容
function createTextElement(text, style) {
    const node = document.createElement('span');
    node.textContent = text;
    node.style.cssText = style;
    return node;
}
// 换行
function createLineFeed() {
    return document.createElement('br');
}

const INSERT = 'INSERT', REMOVE = 'REMOVE', MOVE = 'MOVE';
function handingText(container, node, speed, type) {
    return new Promise((resolve) => {
        setTimeout(() => {
            switch (type) {
                case INSERT:
                    insert(node, container);
                    break;
                case REMOVE:
                    container.removeChild(node);
                    break;
                case MOVE:
                    move(node, container);
                    break;
            }
            resolve(1);
        }, speed);
    });
}
// 创建光标
function createCursor(typeInstance) {
    var _a;
    const cursorNode = document.createElement('div');
    cursorNode.textContent = '|';
    cursorNode.className = 'flicker';
    (_a = typeInstance.typeContainer) === null || _a === void 0 ? void 0 : _a.appendChild(cursorNode);
}
// 插入操作
function insert(node, container) {
    const cursor = container.querySelector('.flicker');
    container.insertBefore(node, cursor);
}
// 移动光标
function move(node, container) {
    const cursor = container.querySelector('.flicker');
    container.insertBefore(cursor, node);
}
// 创建打字容器
function createTypeContainer(typeInstance) {
    var _a;
    const container = typeInstance.typeContainer = document.createElement('div');
    container.className = 'type-container';
    container.style.cssText = typeInstance.options.style || '';
    (_a = typeInstance.root) === null || _a === void 0 ? void 0 : _a.appendChild(typeInstance.typeContainer);
}
// 获取当前文本
function getCurrentChildNodes(root) {
    const nodes = Array.from(root.childNodes), childNodes = [];
    for (const node of nodes) {
        if (node.nodeType === 3 || (node.nodeType == 1 && node.className != 'flicker')) {
            childNodes.push(node);
        }
    }
    return childNodes;
}

const defaultTypeEffectOptions = { speed: 100 };
class TypeEffect {
    constructor(el, options = defaultTypeEffectOptions) {
        this.el = el;
        this.options = options;
        this.typeContainer = document.body; // 打字区域 初始化为body
        this.callbacks = []; // 处理链式调用callbacks
        this.cursorPosition = 0;
        this.root = document.querySelector(el);
        if (!this.root) {
            console.error('please give the correct container.');
            return;
        }
    }
    type(text, options) {
        this.callbacks.push(() => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0, n = text.length; i < n; i++) {
                const textNode = (options === null || options === void 0 ? void 0 : options.style) ? createTextElement(text[i], options === null || options === void 0 ? void 0 : options.style) : createTextNode(text[i]);
                // 使用延迟时间
                const speed = (options === null || options === void 0 ? void 0 : options.speed) || this.options.speed;
                yield handingText(this.typeContainer, textNode, speed, INSERT);
                this.cursorPosition++;
            }
        }));
        return this;
    }
    remove(characters = 1, options) {
        // 获取到当前的容器元素 执行删除
        this.callbacks.push(() => __awaiter(this, void 0, void 0, function* () {
            // 获取当前所有子节点
            const childNodes = getCurrentChildNodes(this.typeContainer);
            // 能删除的节点为光标左侧的节点
            let actualCharactersLength = Math.min(characters, this.cursorPosition);
            // 防止越界 取用户与实际字符数量的最小值
            while (actualCharactersLength--) {
                const lastChildNode = childNodes[--this.cursorPosition];
                const speed = (options === null || options === void 0 ? void 0 : options.speed) || this.options.speed;
                yield handingText(this.typeContainer, lastChildNode, speed, REMOVE);
            }
        }));
        return this;
    }
    move(characters = 1, options) {
        // 获取到当前的容器元素 执行删除
        this.callbacks.push(() => __awaiter(this, void 0, void 0, function* () {
            const childNodes = getCurrentChildNodes(this.typeContainer), direction = characters > 0 ? 'forward' : 'backward';
            const dict = {
                // 还剩下多少个字符可以往前 (往前移动同时不能超过字符右端点)
                'forward': {
                    actualCharactersLength: Math.min(characters, childNodes.length - this.cursorPosition),
                    add: 1
                },
                // 还剩下多少个字符可以往后 (往后移动同时不能超过字符左端点)
                'backward': {
                    actualCharactersLength: Math.min(-characters, this.cursorPosition),
                    add: -1
                }
            };
            while (dict[direction].actualCharactersLength--) {
                const siblingNode = childNodes[this.cursorPosition += dict[direction].add];
                const speed = (options === null || options === void 0 ? void 0 : options.speed) || this.options.speed;
                yield handingText(this.typeContainer, siblingNode, speed, MOVE);
            }
        }));
        return this;
    }
    sleep(time) {
        this.callbacks.push(() => __awaiter(this, void 0, void 0, function* () { return yield sleep(time); }));
        return this;
    }
    line() {
        this.callbacks.push(() => __awaiter(this, void 0, void 0, function* () {
            const br = createLineFeed();
            this.typeContainer.insertBefore(br, this.typeContainer.childNodes[this.cursorPosition++]);
        }));
        return this;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            createTypeContainer(this);
            createCursor(this);
            for (const cb of this.callbacks)
                yield cb.apply(this); // 处理内容callbacks
        });
    }
}

export { TypeEffect as default, defaultTypeEffectOptions };
