/* @jsx DReact.createElement */
const jsx = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

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
window.DReact = {
  createElement,
};
