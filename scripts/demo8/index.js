import { createTextElement, createElement } from './createElement';
window.DReact = {
  createElement,
  render,
};
//metamask
function createTextElement() {}
function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}
let nextUnitOfWork = null;
function workLoop(deadline) {
  //是否应该停止循环
  let shouldYield = false;
  //如果存在下一个工作单元 且 没有更高优先级的其他工作 执行循环
  //如果存在上述的情况 直接打断渲染
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    //如果截止时间到了 停止工作循环 更高优先级的任务来了
    shouldYield = deadline.timeRemaining() < 1;
  }
  requestIdleCallback(workLoop);
}
//告知浏览器的 空闲时间应该执行workLoop
requestIdleCallback(workLoop);
//承载了下一个工作单元
function performUnitOfWork(nextUnitOfWork) {}
/** @jsx DReact.createElement */
const element = (
  <div id="foo">
    <a href="http://www.baidu.com">bar</a>
    <p>
      <b>我是加粗文本</b>
    </p>
  </div>
);

const container = document.getElementById('root');
DReact.render(element, container);
