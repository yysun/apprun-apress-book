declare var global;
export default ({ layout, vdom }) => global.ssr ? layout(vdom) : vdom;