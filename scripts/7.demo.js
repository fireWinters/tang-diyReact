function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        //考虑children特殊的类型 TEXT_ELEMENT
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}
function render(element, container) {
  // const node = document.createElement(element.type);
  const dom =
    element.type == 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);
  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => {
    render(child, container);
  });
  container.appendChild(dom);
}
window.DReact = {
  createElement,
  render,
};
/* @jsx DReact.createElement */
const jsx = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById('root');
DReact.render(element, container);
