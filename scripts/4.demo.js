const element = {
  type: 'h1',
  props: {
    title: '老袁6666',
    children: 'Hello',
  },
};

//ReactDOM.render(element, container);

const container = document.getElementById('root');
const node = document.createElement(element.type);
node['title'] = element.props.title;
const text = document.createTextNode('');
text.nodeValue = element.props.children;

node.appendChild(text);
container.appendChild(node);
